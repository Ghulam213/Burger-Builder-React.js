import * as actionTypes from './actionTypes';
import axiosAuthInstance from '../../axios-auth';
import { config } from '../../projectConfig';

export const setAuthLoading = () => {
    return {
        type: actionTypes.SET_AUTH_LOADING
    }
}

export const setAuthError = (error) => {
    return {
        type: actionTypes.SET_AUTH_ERROR,
        error: error
    }
}

export const setAuthData = (token, userId) => {
    return {
        type: actionTypes.SET_AUTH_DATA,
        idToken: token,
        userId: userId
    }
}

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expireDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const setLogoutTimeout = (expiresTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expiresTime * 1000)
    }
}

export const SignUp = (email, password) => {
    return dispatch => {
        dispatch(setAuthLoading())
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axiosAuthInstance.post('accounts:signUp?key='+config.webApiKey, data)
            .then(response => {
                dispatch(setAuthData(response.data.idToken, response.data.localId))
            })
            .catch(error => {
                dispatch(setAuthError(error.response))
            });
    }
}

export const SignIn = (email, password) => {
    return dispatch => {
        dispatch(setAuthLoading())
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axiosAuthInstance.post('accounts:signInWithPassword?key='+config.webApiKey, data)
            .then(response => {
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expireDate', new Date(new Date().getTime() + response.data.expiresIn * 1000))
                localStorage.setItem('userId', response.data.localId)
                dispatch(setAuthData(response.data.idToken, response.data.localId))
                dispatch(setLogoutTimeout(response.data.expiresIn))
            })
            .catch(error => {
                dispatch(setAuthError(error.response))
            });
    }
}

export const checkLocalAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token)
            dispatch(authLogout())
        else {
            const expireDate = new Date(localStorage.getItem('expireDate'))
            if (expireDate > new Date()){
                dispatch(setAuthData(token, localStorage.getItem('userId')))
                dispatch(setLogoutTimeout( (expireDate.getTime() - new Date().getTime()) / 1000) )
            } else
            dispatch(authLogout())
        }
    }
}