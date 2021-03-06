import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import classes from './OrderSummary.css';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientList = Object.keys(props.ingredients).map(igKey => (
        <div className = {classes.OrderList} key = {igKey} >
            <span className = {classes.OrderList}>{igKey}</span>
            <p>{props.prices[igKey].toFixed(2)}$</p>
            <p>{props.ingredients[igKey]}</p>
        </div>
    ))
    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p className = {classes.P}>Your Delicious Burger with following Ingredients:</p>
            <div className = {classes.OrderSummary} >
                <div className = {classes.OrderTitle} >
                    <div>Ingredients</div>
                    <div>Price</div>
                    <div>Amount</div>
                </div>
                {ingredientList}
                <p className = {classes.P}>Current Price: <strong>{props.totalPrice.toFixed(2)}$</strong></p>
            </div>
            <p className = {classes.P}>Your Delicious Burger is one touch away!!</p>
            <Button btnType = "Danger" clicked = {props.cancelAction} >CANCEL</Button>
            <Button btnType = "Success" clicked = {props.continueAction}>CONTINUE</Button>
        </Auxiliary>
    );
};

export default orderSummary;