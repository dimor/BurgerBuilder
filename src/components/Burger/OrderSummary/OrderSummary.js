import React from 'react';
import Button from '../../UI/Button/Button';



const orderSummary = (props) => {

    let ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}> {igKey} {props.ingredients[igKey]} </span>
            </li>
        })
    return (
        <React.Fragment>
            <h3>Your Order </h3>
            <p> a delicious burger with the following ingredients:</p>
            <ul>
                    {ingredientSummary}
            </ul>
            <p> Continue to Checkout ?</p>
            <p><strong>Total Price: {props.price.toFixed(2)} $</strong></p>
            <Button clicked={props.purchaseCancelled} btnType={'Danger'}>Cancel</Button> 
            <Button clicked={props.purchaseCuntinued} btnType={'Success'}> CONTINUE </Button>
        </React.Fragment>

    );
}


export default orderSummary;