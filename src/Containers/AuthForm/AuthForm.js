import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import FormField from '../../Components/UI/FormField/FormField';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import classes from './AuthForm.css';
import * as authActions from '../../store/actions/auth';
import { validateForm, validateField } from '../../shared/utility';

class AuthForm extends Component {

    state = {
        authForm : {
            email: {
                label: 'Email:',
                elementType: 'input',
                elementConfig: {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Email Address',
                    value: ''
                },
                valid: true,
                validityMessage: 'This value is required and must be a valid email!',
                validatingRules: {
                    required: true,
                    isEmail: true
                }
            },

            password: {
                label: 'Password:',
                elementType: 'input',
                elementConfig: {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Password',
                    value: ''
                },
                valid: true,
                validityMessage: 'This value is required and minimum length must be 6!',
                validatingRules: {
                    required: true,
                    minLength: 6
                }
            }
        },

        isSignUp: false,
    }

    toggleAuthMode = () => {
        console.log('toogle')
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp,
            }
        })
    }

    submitFormHandler = (event) => {
        event.preventDefault()
        const email = this.state.authForm['email'].elementConfig.value
        const password = this.state.authForm['password'].elementConfig.value
        if (this.state.isSignUp)
            this.props.onSignUp(email, password)
        else
            this.props.onSignIn(email, password)

    }

    formValueChangeHandler = (event, fieldIdentifier) => {
        const form = {
            ...this.state.authForm,
            [fieldIdentifier] : {
                ...this.state.authForm[fieldIdentifier],
                elementConfig : {
                    ...this.state.authForm[fieldIdentifier].elementConfig,
                    value: event.target.value
                },
                valid: validateField(event.target.value, this.state.authForm[fieldIdentifier].validatingRules)
            }
        }
        this.setState({
            authForm: form,
            isFormValid: validateForm(form),
        })
    }

    render() {

        let authRedirect = null;

        if (this.props.isAuthenticated)
            authRedirect = <Redirect to={this.props.directedFromBurgerModal ? "/checkout" : "/"} />

        let form = <Spinner />

        if (!this.props.loading)
            form = (
                <form >
                    {Object.keys(this.state.authForm).map(el => (
                        <FormField
                            key={el} 
                            label={this.state.authForm[el].label}
                            elementType={this.state.authForm[el].elementType}
                            elementConfig={this.state.authForm[el].elementConfig}
                            options={this.state.authForm[el].options}
                            required={this.state.authForm[el].validatingRules.required}
                            invalid={!this.state.authForm[el].valid}
                            invalidMessage={this.state.authForm[el].validityMessage}
                            valueChanged={(event) => this.formValueChangeHandler(event, el)}
                        />
                    ))}
                    <Button 
                        btnType = "Success"
                        clicked = {this.submitFormHandler}
                        disabled={!this.state.isFormValid}
                    >{this.state.isSignUp ? "Sign Up" : "Sign In"}</Button>                
                </form>
            )

        return (
            <div className={classes.AuthForm}>
                {authRedirect}
                <h1>{this.state.isSignUp ? "Sign Up" : "Sign In"}</h1>
                <hr />
                <p className={classes.Error}>{this.props.error ? this.props.error.data.error.message : null}</p>
                {form}
                <hr />
                <p>{this.state.isSignUp ? 'Have an account?!': 'Don\'t have an account?!' }</p>
                <Button 
                    btnType = "Success" 
                    clicked={this.toggleAuthMode} 
                >Switch to {this.state.isSignUp ? "Sign In" : "Sign Up"}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        directedFromBurgerModal: state.burgerBuilder.building,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp : (email, password) => dispatch(authActions.SignUp(email, password)),
        onSignIn : (email, password) => dispatch(authActions.SignIn(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);