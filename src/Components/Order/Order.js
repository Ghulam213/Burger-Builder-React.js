import React from 'react';
import classes from './Order.css';


const order = (props) => {
    const orderIngredients = Object.keys(props.ingredients).map(ing => (
        <span className={classes.Ingredients} key={ing}>{ing}: ({props.ingredients[ing]})</span>
    ))

    return (
        <div className={classes.Order}>
            <h2>Order</h2>
            <p>Ingredients: {orderIngredients}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;