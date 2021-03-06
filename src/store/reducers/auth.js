import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH_DATA:
            return {
                token: action.idToken,
                userId: action.userId,
                loading: false,
                error: null
            }
        case actionTypes.SET_AUTH_LOADING:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SET_AUTH_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        default:
            return state;
    }
}

export default reducer;