import React, { Component } from 'react';
import { connect } from 'react-redux';
import axiosOrderInstance from '../../../axios-order';

import classes from './ContactData.css';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Button from "../../../Components/UI/Button/Button";
import FormField from '../../../Components/UI/FormField/FormField';
import { validateForm, validateField } from '../../../shared/utility';


class ContactData extends Component {

    state = {
        orderForm : {
            name: {
                label: 'Name:',
                elementType: 'input',
                elementConfig: {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Your Name',
                    value: ''
                },
                valid: true,
                validityMessage: 'This value is required!',
                validatingRules: {
                    required: true,
                }            
            },

            email: {
                label: 'Email:',
                elementType: 'input',
                elementConfig: {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Your Email',
                    value: ''
                },
                valid: true,
                validityMessage: 'This value is required!',
                validatingRules: {
                    required: true,
                }
            },

            house: {
                label: 'House #:',
                elementType: 'input',
                elementConfig: {
                    name: 'house',
                    type: 'text',
                    placeholder: 'Your House no',
                    value: ''
                },
                valid: true,
                validityMessage: 'This value is required!',
                validatingRules: {
                    required: true,
                }
            },

            street: {
                label: 'Street:',
                elementType: 'input',
                elementConfig: {
                    name: 'street',
                    type: 'text',
                    placeholder: 'Your Street',
                    value: ''
                },
                valid: true,
                validityMessage: 'This value is required!',
                validatingRules: {
                    required: true,
                }
            },

            zipcode: {
                label: 'Zip Code:',
                elementType: 'input',
                elementConfig: {
                    name: 'zipcode',
                    type: 'text',
                    placeholder: 'Your Zip Code',
                    value: ''
                },
                valid: true,
                validityMessage: 'This value is required and the code must be 5 digits long!',
                validatingRules: {
                    required: true,
                    maxLength: 5,
                    minLength: 5,
                }
            },
            
            deliveryMethod: {
                label: 'Delivery Method:',
                elementType: 'select',
                elementConfig: {
                    name: 'deliveryMethod',
                    value: 'fastest'
                },
                options: {
                    'Fastest': 'fastest',
                    'Normal': 'normal',
                    'Cheapest': 'cheapest'
                },
                valid: true,
                validityMessage: '',
                validatingRules: {}
            }
        },
        isFormValid: false,
        loading: false,
    }

    submitOrderHandler = (event) => {
        event.preventDefault()
        this.setState({loading : true})

        const formData = {};
        for (let key in this.state.orderForm)
            formData[key] = this.state.orderForm[key].elementConfig.value;

        const order = {
            ingredients : this.props.ings,
            price : this.props.ttlPrice,
            customer : {
                name : formData.name,
                address : {
                    houseNo: formData.house,
                    street : formData.street,
                    zipCode : formData.zipcode,
                },
                email : formData.email, 
            },
            userId: this.props.userId,
            deliveryMeethod : formData.deliveryMethod
        }

        axiosOrderInstance.post("/orders.json?auth=" + this.props.authToken, order)
            .then(response => {
                this.setState({
                    loading : false,
                })
                this.props.history.push("/")
            })
            .catch(error => {
                this.setState({
                    loading : false,
                })
            });
        
    }

    formValueChangeHandler = (event, fieldIdentifier) => {
        const form = {...this.state.orderForm};
        const formElement = {...form[fieldIdentifier]}
        const formElementConfig = {...formElement.elementConfig}
        formElementConfig.value = event.target.value;
        formElement.elementConfig = formElementConfig;
        formElement.valid = validateField(event.target.value, formElement.validatingRules)
        form[fieldIdentifier] = formElement;
        this.setState({
            orderForm: form,
            isFormValid: validateForm(form),
        })
    }

    render() {
        let form = (
            <form>
                {Object.keys(this.state.orderForm).map(el => (
                    <FormField
                        key={el} 
                        label={this.state.orderForm[el].label}
                        elementType={this.state.orderForm[el].elementType}
                        elementConfig={this.state.orderForm[el].elementConfig}
                        options={this.state.orderForm[el].options}
                        required={this.state.orderForm[el].validatingRules.required}
                        invalid={!this.state.orderForm[el].valid}
                        invalidMessage={this.state.orderForm[el].validityMessage}
                        valueChanged={(event) => this.formValueChangeHandler(event, el)}
                    />
                ))}
                <Button 
                    btnType = "Success" 
                    clicked={this.submitOrderHandler} 
                    disabled={!this.state.isFormValid}
                >Order</Button>                
            </form>
        )
        
        if (this.state.loading)
            form = <Spinner />

        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        ttlPrice: state.burgerBuilder.totalPrice,
        authToken: state.auth.token,
        userId: state.auth.userId 
    }
}


export default connect(mapStateToProps)(ContactData);