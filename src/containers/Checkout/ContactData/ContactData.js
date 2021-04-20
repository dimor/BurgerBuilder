import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../withErrorHander/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = props => {

    const [stateForm, setForm] = useState(
        {
            orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipcode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zipcode'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: 'fastest', displayValue: 'Fastets' },
                            { value: 'cheapest', displayValue: 'Cheapest' }
                        ]
                    },
                    value: 'fastest',
                    validation: {},
                    valid: true
                },

            }
        }
    );

    const [formIsValid,setFormIsValid] = useState(false);


    const orderHandler = (event) => {

        //prevent the default form behavior when submit (open new page)
        event.preventDefault();

        // loop throu all the keys and set object with pairs of key:value (name:dima,street:streetname...)
        const formData = {};

        for (let formElementIdentifier in stateForm.orderForm) {
            formData[formElementIdentifier] = stateForm.orderForm[formElementIdentifier].value
        }

        // configure post obeject and post to server 
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }

        props.onOrderBurger(order, props.token);

    }




    const inputChangedHandler = (event, inputIdentifier) => {



        const updatedFormElement = updateObject(stateForm.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, stateForm.orderForm[inputIdentifier].validation),
            touched: true
        })


        const updatedOrderForm = updateObject(stateForm.orderForm, {
            [inputIdentifier]: updatedFormElement
        })



        //set the form valid true ; loop throu keys and check if valid, if one of them is unvalid the fromIsvalid is going to false.
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        //udpate the state
        // this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
        setForm({ orderForm: updatedOrderForm})
        setFormIsValid(formIsValid)
    }



    const formElementArray = [];

    for (let key in stateForm.orderForm) {

        formElementArray.push({
            id: key,
            config: stateForm.orderForm[key]
        })

    }



    let form = (
        <form onSubmit={orderHandler}>
            {formElementArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                    valueType={formElement.id}
                    change={(event) => inputChangedHandler(event, formElement.id)} />))}
            <Button disabled={!formIsValid} inputtype="input" btnType="Success">ORDER</Button>
        </form>);

    if (props.loading) {

        form = <Spinner />
    }


    return (
        <div className={classes.ContactData}>
            <h4> Enter your Contact Data</h4>
            {form}
        </div>


    );


}









const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDisaptchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};



export default connect(mapStateToProps, mapDisaptchToProps)(withErrorHandler(ContactData, axios));