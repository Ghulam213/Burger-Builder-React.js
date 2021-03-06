import React from 'react';
import burgerLogoSrc from "../../assets/images/burger-logo.png";
import classes from './Logo.css'

const logo = () => (
    <div className = {classes.Logo}>
        <img src = {burgerLogoSrc} alt = "logo"/>
    </div>
);

export default logo;