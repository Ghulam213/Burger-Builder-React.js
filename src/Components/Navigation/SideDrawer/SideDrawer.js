import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {

    var classList = [classes.SideDrawer];
    props.open ? classList.push(classes.Open) : classList.push(classes.Close) 

    return (
        <Auxiliary>
            <BackDrop show={props.open} clicked = {props.closed}/>
            <div className = {classList.join(' ')}>
                <div className = {classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuthenticated} />
                </nav>
            </div>
        </Auxiliary>
    );
};


export default sideDrawer;