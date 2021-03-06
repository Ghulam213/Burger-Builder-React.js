import * as actionTypes from './actionTypes';
import axiosOrderInstance from '../../axios-order';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingType: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingType: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const setError = () => {
    return {
        type: actionTypes.SET_ERROR
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axiosOrderInstance.get("/ingredients.json")
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(setError())
            });
    }
}

export const setIngredientsPrice = (ingredientsPrice) => {
    return {
        type: actionTypes.SET_INGREDIENTS_PRICE,
        ingredientsPrice: ingredientsPrice
    }
}

export const fetchIngredientsPrice = () => {
    return dispatch => {
        axiosOrderInstance.get("/ingredients_price.json")
            .then(response => {
                dispatch(setIngredientsPrice(response.data))
            })
            .catch(error => {
                dispatch(setError())
            });
    }
}