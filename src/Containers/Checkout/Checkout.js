import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    cancelCheckoutHandler = () => {
        this.props.history.goBack()
    }

    continueCheckoutHandler = () => {
        this.props.history.replace("/checkout/contact-data")
    }


    render() {

        var content = <Redirect to='/' />

        if (this.props.ings)
            content = (
                <div>
                    <CheckoutSummary 
                        ingredients = {this.props.ings}
                        checkoutCanceled = {this.cancelCheckoutHandler}
                        checkoutContinued = {this.continueCheckoutHandler}
                    />
                    <Route 
                        path={this.props.match.url + "/contact-data"} 
                        component={ContactData}
                    />
                </div>
            )

        return content;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients, 
    }
}


export default connect(mapStateToProps)(Checkout);