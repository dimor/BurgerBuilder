import React, { useEffect, useState ,useCallback} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHander/withErrorHandler'
import { useDispatch,useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';




export const BurgerBuilder = props => {


    const dispatch = useDispatch();

    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()),[dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    const ings = useSelector(state=>state.burgerBuilder.ingredients);
    const price = useSelector(state=>state.burgerBuilder.totalPrice); 
    const error = useSelector(state=>state.burgerBuilder.error);
    const isAuthenticated = useSelector(state=>state.auth.token!==null);

    const [purchasing, setPurchasing] = useState(false);

    const {history} = props;


    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])



    const updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients).map(InKey => {
            return ingredients[InKey]
        }).reduce((sum, el) => {
            return sum = sum + el;
        }, 0);

        return sum > 0;

    }

    const purchaseHandler = () => {

        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout')
            history.push("/auth")
        }


    }

    const purchasingCancelHandler = () => {

        setPurchasing(false);

    }

    const purchaseContinueHander = () => {
        onInitPurchase();
        history.push('/checkout')
    }



    const disabledInfo = {
        ...ings
    };


    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0; // true or false
    }


    let orderSummary = null;

    let burger = error ? <p style={{ textAlign: 'center', fontSize: '2rem' }}>Ingredients cant be loaded</p> : <Spinner />

    if (ings) {
        burger = <React.Fragment>
            <Burger ingredients={ings} />
            <BuildControls
                ingredientAdded={onIngredientAdded}
                ingredientRemoved={onIngredientRemoved}
                disabled={disabledInfo}
                price={price}
                purchasable={updatePurchaseState(ings)}
                ordered={purchaseHandler}
                isAuth={isAuthenticated}
            /></React.Fragment>

        orderSummary = <OrderSummary
            price={price}
            purchaseCancelled={purchasingCancelHandler}
            purchaseCuntinued={purchaseContinueHander}
            ingredients={ings} />

    }


    return (

        <React.Fragment>
            <Modal
                show={purchasing}
                cancelHandler={purchasingCancelHandler}>
                {orderSummary}
            </Modal>

            {burger}

        </React.Fragment>


    );

}


export default withErrorHandler(BurgerBuilder, axios);