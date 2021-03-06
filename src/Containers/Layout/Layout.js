import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    updateShowDrawerState = () => {
        this.setState(prevState => {
            return {showSideDrawer : !prevState.showSideDrawer}
        })
    }

    render () {
        return (
            <Aux>
                <Toolbar 
                    isAuthenticated= {this.props.isAuthenticated} 
                    toggleDrawer = {this.updateShowDrawerState}
                />
                <SideDrawer 
                    isAuthenticated= {this.props.isAuthenticated} 
                    open = {this.state.showSideDrawer} 
                    closed={this.updateShowDrawerState} 
                />
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);