import React, { Component } from 'react';
import { connect } from 'react-redux';
import axiosOrderInstance from '../../axios-order';

import Order from '../../Components/Order/Order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
        error: false,
    }

    componentDidMount = () => {
        const queryParams = `?auth=${this.props.authToken}&orderBy="userId"&equalTo="${this.props.userId}"`
        axiosOrderInstance.get("/orders.json" + queryParams)
        .then(response => {
            const fetchedOrders = [];
            for (let key in response.data)
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })
            this.setState({
                orders: fetchedOrders,
                loading: false,
            })
        })
        .catch(error => {
            this.setState({
                error: true,
            })
        })
    }

    render() {
        
        // let mainContent = Object.keys(this.state.orders).map(orderKey => (
        //         <Order key={orderKey} ingredients={this.state.orders[orderKey].ingredients} price={this.state.orders[orderKey].price} />
        //     )
        // );

        var mainContent = (
            this.state.orders.map(order => (
                <Order key={order.id} ingredients={order.ingredients} price={order.price} />
            ))
        );

        if (this.state.loading)
            mainContent = this.state.error ? <h4>Sorry! Orders could not be loaded from the backend!!</h4> : <Spinner />
        return (
            <div>
                {mainContent}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(withErrorHandler(Orders, axiosOrderInstance));