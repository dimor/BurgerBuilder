
import React from 'react';
import classes from './Input.module.css';


const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.valueType}!</p>;
    }


    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig} value={props.value} onChange={props.change}/>;
            break;
        case ('textarea'):
            inputElement =
                <textarea className={inputClasses.join(' ')}
                    {...props.elementConfig} value={props.value} onChange={props.change}/>;
            break;
        case ('select'):
            inputElement =
                <select className={inputClasses.join(' ')}
                    {...props.elementConfig} value={props.value} onChange={props.change}>
                    {props.elementConfig.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                    ))}
                </select>;
            break;
        default:
            inputElement =
                <input className={inputClasses.join(' ')}
                    {...props.elementConfig} value={props.value}  onChange={props.change} />;
    }


    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>)
};


export default input;