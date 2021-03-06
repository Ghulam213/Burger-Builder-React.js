import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControl.css';

const buildControl = props => {
    return (
        <div className = {classes.BuildControl} >
            <div className = {classes.Label} >{props.igLabel}</div>
            <div >{props.price.toFixed(2)}$</div>
            <button className = {classes.Less} onClick = {props.removeClicked} disabled = {props.shouldDisable}>-</button>
            <div >{props.count}</div>
            <button className = {classes.More} onClick = {props.addClicked} >+</button>
        </div>
    );
};

buildControl.propTypes = {
    igLabel : PropTypes.string.isRequired,
};

export default buildControl;