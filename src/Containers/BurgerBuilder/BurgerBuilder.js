import React , { Component } from 'react';
import { connect } from 'react-redux';

import * as burgerBuilderActions from '../../store/actions/burgerBuilder';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axiosOrderInstance from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


export class BurgerBuilder extends Component {

    state = {
        orderClicked: false,
        loading : false,
        //ingredientsForBurgerBuild : ["bacon", "bacon", "cheese", "meat", "cheese", "meat", "salad"],
    }

    componentDidMount () {
        this.props.onFetchIngredientsPrice()
        this.props.onFetchIngredients()
    }

    // componentDidMount () {
    //     axiosOrderInstance.get("/ingredients.json")
    //         .then(response => {
    //             this.setState({ingredients : response.data})
    //         })
    //         .catch(error => {
    //             this.setState({error : true})
    //         })
    // }

    /*
        for redux aysnc code can also be handled this way for this paticular situation.

        componentDidMount () {
        //     axiosOrderInstance.get("/ingredients.json")
        //         .then(response => {
        //             this.props.onSetIngredients(response.data)
        //         })
        //         .catch(error => {
        //             this.props.onSetError()
        //         })
        // }
    */

    updatePurchaseState = (ingredients) => {
        var totalIngredients = 0
        for (let key in ingredients)
            totalIngredients += ingredients[key]
        return totalIngredients > 0
    }

    updateOrderClickedState = () => {
        const isOrderClicked = this.state.orderClicked
        this.setState({orderClicked: !isOrderClicked})
    }

    continuePurchaseHandler = () => {
        if (!this.props.isAuthenticated)
            this.props.history.push("/sign-in")
        else
            this.props.history.push("/checkout")
    }

    // addIngredientHandler = (type) => {
    //     const ingredientsList = { ...this.state.ingredients };
    //     ingredientsList[type]++;
    //     var price = this.state.totalPrice;
    //     price += INGREDIENTS_PRICE[type]
    //     this.setState({
    //         ingredients: ingredientsList,
    //         totalPrice: price,
    //     });
    //     this.updatePurchaseState(ingredientsList);
    // }

    // removeIngredientHandler = (type) => {
    //     const ingredientsList = { ...this.state.ingredients };
    //     if (ingredientsList[type] <= 0)
    //         return;
    //     ingredientsList[type]--;
    //     var price = this.state.totalPrice;
    //     price -= INGREDIENTS_PRICE[type]
    //     this.setState({
    //         ingredients: ingredientsList,
    //         totalPrice: price,
    //     });
    //     this.updatePurchaseState(ingredientsList);
    // }

    render () {
        const disableInfo = {...this.props.ings};
        for (let key in disableInfo)
            disableInfo[key] = (disableInfo[key] <= 0)

        var mainContent = this.props.error ? <h4>Sorry! Ingredients could not be loaded from the backend!!</h4> : <Spinner />
        var modalContent = null

        if (this.props.ings && this.props.INGREDIENTS_PRICE) {
            mainContent = (
                <Aux >
                    <Burger ingredients = {this.props.ings} />
                    <BuildControls 
                        addClick = {this.props.onAddIngredients} 
                        removeClick = {this.props.onRemoveIngredients}
                        disableDic = {disableInfo}
                        price = {this.props.ttlPrice}
                        ingredientCount = {this.props.ings}
                        prices = {this.props.INGREDIENTS_PRICE}
                        purchasable = {this.updatePurchaseState(this.props.ings)}
                        orderAction = {this.updateOrderClickedState}
                    />
                </Aux>
            )

            modalContent = (
                <OrderSummary 
                    ingredients = {this.props.ings} 
                    prices = {this.props.INGREDIENTS_PRICE}
                    totalPrice = {this.props.ttlPrice}
                    cancelAction = {this.updateOrderClickedState}
                    continueAction = {this.continuePurchaseHandler}    
                />
            )
        }

        return (
            <Aux>
                <Modal show = {this.state.orderClicked} modalClose = {this.updateOrderClickedState}>
                    {modalContent}
                </Modal>
                {mainContent}
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        ttlPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        INGREDIENTS_PRICE: state.burgerBuilder.INGREDIENTS_PRICE,
        isAuthenticated: state.auth.token !== null, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients: (ingtype) => dispatch(burgerBuilderActions.addIngredient(ingtype)),
        onRemoveIngredients: (ingtype) => dispatch(burgerBuilderActions.removeIngredient(ingtype)),
        onFetchIngredients: () => dispatch(burgerBuilderActions.fetchIngredients()),
        onFetchIngredientsPrice: () => dispatch(burgerBuilderActions.fetchIngredientsPrice()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrderInstance));