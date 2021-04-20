import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';
import Logo from '../../components/Logo/Logo'

const Auth = props => {

    const [isSignup, setIsSignup] = useState(true);
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const { onSetAuthRedirectPath, building, authRedirectPath } = props;

    useEffect(() => {
        if (!building && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [onSetAuthRedirectPath, building, authRedirectPath]);






    const inputChangedHandler = (event, controlName) => {

        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        })


        setControls(updatedControls);

    }

    const swtichAuthModeHandler = () => {
        setIsSignup((preState) => {
            return !preState
        })
    };



    const formElementArray = [];

    for (let key in controls) {

        formElementArray.push({
            id: key,
            config: controls[key]
        })

    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value,
            controls.password.value,
            isSignup)

    }



    let form = formElementArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            valueType={formElement.id}
            change={(event) => inputChangedHandler(event, formElement.id)} />))


    if (props.loading) {
        form = <Spinner />
    }


    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }

    let authRedirect = null

    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }



    return (
        <div className={classes.Auth}>
            <Logo height="100px" animate />
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success"> SUBMIT </Button>

            </form>
            <Button clicked={swtichAuthModeHandler}
                btnType="Danger"> SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'} </Button>
        </div>

    );
}




const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);