import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './Containers/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from "./Containers/Checkout/Checkout";
import Orders from './Containers/Orders/Orders';
import AuthForm from './Containers/AuthForm/AuthForm';
import Logout from './Containers/AuthForm/Logout/Logout';
import * as authActions from './store/actions/auth';


class App extends Component {
  componentDidMount () {
    this.props.onAutoSignIn()
  }
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/sign-in" component={AuthForm} />
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(authActions.checkLocalAuthState())    
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
