import React from 'react';

import classes from "./CheckoutSummary.css";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Hope it tastes well!!</h1>
            <div className={classes.Burger}>
                <Burger ingredients = {props.ingredients}/>
            </div>
            <Button btnType = "Danger" clicked={props.checkoutCanceled}>CANCEL</Button>
            <Button btnType = "Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;