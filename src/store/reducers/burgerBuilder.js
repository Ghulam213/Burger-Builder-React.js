import * as actionTypes from '../actions/actionTypes';

/*
    this is not in state as it is constant and can hardly ever change.
    if the price is recived from an http request, then it might be in
    state.

    const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 1,
    cheese: 0.7,
    meat: 1.5,
}
*/

const initialState = {

    INGREDIENTS_PRICE: null,
    ingredients : null,
    totalPrice: 3,
    error: false,
    building: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingType] : state.ingredients[action.ingType] + 1
                },
                totalPrice: state.totalPrice + state.INGREDIENTS_PRICE[action.ingType],
                building: true,
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingType] : state.ingredients[action.ingType] - 1
                },
                totalPrice: state.totalPrice - state.INGREDIENTS_PRICE[action.ingType],
                building: true,
            }
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                building: false,
                totalPrice: 3
            }
        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: !state.error
            }
        case actionTypes.SET_INGREDIENTS_PRICE:
            return {
                ...state,
                INGREDIENTS_PRICE: action.ingredientsPrice,
                error: false,
                building: false,
                totalPrice: 3
            }
        default:
            return state;
    }
}

export default reducer;