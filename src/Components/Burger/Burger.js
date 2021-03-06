import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';


const burger = (props) => {

    const ingredientArray = Object.keys(props.ingredients)
    .map(type => {
        return [...Array(props.ingredients[type])].map((_, i) =>
            <BurgerIngredient key = {type + i} type = {type} />
        )
    })
    .reduce((arr, el) =>
        arr.concat(el)
    , []);

    // const ingredientArray = (
    //     props.ingredients.map((igtype , i) => 
    //         <BurgerIngredient key= {igtype + i} type = {igtype} />   
    //     )
    // );

    return (
        <div className = {classes.Burger}>
            <BurgerIngredient type= "bread-top" />
                {ingredientArray.length ? ingredientArray : <p>Please Start Adding Ingredients</p>}
            <BurgerIngredient type= "bread-bottom" />
        </div>
    );
};

export default burger;