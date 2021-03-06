import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: "Salad", type: "salad"},
    { label: "Bacon", type: "bacon"},
    { label: "Cheese", type: "cheese"},
    { label: "Meat", type: "meat"},

];

const buildControls = props => {
    return (
        <div className = {classes.BuildControls} >
            <p className = {classes.Price}>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
            <div className = {classes.BuildTitle} >
                <div >Ingredients</div>
                <div >Price</div>
                <div >Remove</div>
                <div >Count</div>
                <div >Add</div>
            </div>
            {controls.map(control => (
                <BuildControl key = {control.label} igLabel = {control.label} 
                    addClicked = {() => props.addClick(control.type)}
                    removeClicked = {() => props.removeClick(control.type)}
                    shouldDisable = {props.disableDic[control.type]}
                    count = {props.ingredientCount[control.type]}
                    price = {props.prices[control.type]}
                />
            ))}
            <button className = {classes.OrderButton} disabled = {!props.purchasable} onClick = {props.orderAction}>ORDER NOW</button>
        </div>
    );
};

// burgerControls.propTypes = {
    
// };

export default buildControls;