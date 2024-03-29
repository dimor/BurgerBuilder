
import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions/index';

export function* purchaseBurgerSaga(action) {

    const { orderData, token } = action;
    try {
        yield put(actions.purchaseBurgerStart());
        const response = yield axios.post('/orders.json?auth=' + token, orderData)
        yield put(actions.purchaseBurgerSuccess(response.data.name, orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error))
    }

}


export function* fetchOrdersSaga(action) {

    const { userId, token } = action;
    yield put(actions.fetchOrdersStart());
    const queryParams = `?auth=${token}'&orderBy="userId"&equalTo="${userId}"`

    try {
        const res = yield axios.get('/orders.json' + queryParams)
        const fetchedOrders = [];
        for (let key in res.data) {
            fetchedOrders.push({
                ...res.data[key],
                id: key
            });
        }

        yield put(actions.fetchOrdersSuccess(fetchedOrders))
    } catch (error) {
        yield put(actions.fetchOrdersFail(error))
    }











}