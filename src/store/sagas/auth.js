import { put } from 'redux-saga/effects';
import * as actions from '../actions/index'
import { delay } from 'redux-saga/effects'
import axios from 'axios';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate')
    yield localStorage.removeItem('userId')
    yield put(actions.logoutSucceed())
}


export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(action.logout());
}

export function* authSaga(action) {

    const { email, password, isSignup } = action;


    yield put(actions.authStart());

    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    };

    const API_KEY = 'AIzaSyBb5RyVME27vefF4ex7pSTg-Zidt41Tp0I';

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`

    if (!isSignup) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    }


    try {
        const response = yield axios.post(url, authData)
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken)
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userId', response.data.localId)
        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        yield put(actions.authFail(error.response.data.error))
    }

}


export function* authCheckStateSaga(action) {


    const token = yield localStorage.getItem('token')

    if (!token) {
        yield put(actions.logout())
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));

        if (expirationDate > new Date()) {
            const userId = yield localStorage.getItem('userId')
            yield put(actions.authSuccess(token, userId))
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        } else {
            yield put(actions.logout())
        }

    }
};

