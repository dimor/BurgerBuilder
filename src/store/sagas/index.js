import { logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder'
import {purchaseBurgerSaga,fetchOrdersSaga} from './orders'
import * as actionTypes from '../actions/actionTypes'
import { takeEvery } from 'redux-saga/effects'



export function* watchAuth() {
    yield takeEvery(actionTypes.SAGA_AUTH_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.SAGA_CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.SAGA_AUTH, authSaga);
    yield takeEvery(actionTypes.SAGA_AUTH_CHECK_STATE, authCheckStateSaga);
}


export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.SAGA_INIT_INGREDIENTS, initIngredientsSaga);
}


export function* watchOrders() {
    yield takeEvery(actionTypes.SAGA_PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.SAGA_FETCH_ORDERS, fetchOrdersSaga);
}


 