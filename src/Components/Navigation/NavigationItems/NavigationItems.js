import React from 'react';
import classes from './NavigationItems.css';
import NavItem from './NavItem/NavItem';

const navigationItems = (props) => (
    <ul className = {classes.NavigationItems}>
        <NavItem link ="/" exact>Burger Builder</NavItem>
        { props.isAuthenticated ? <NavItem link = "/orders" >My Orders</NavItem> : null }
        { props.isAuthenticated ? 
            <NavItem link = "/logout" >Log out</NavItem> :
            <NavItem link = "/sign-in" >Sign In</NavItem>
        }
    </ul>
);

export default navigationItems;