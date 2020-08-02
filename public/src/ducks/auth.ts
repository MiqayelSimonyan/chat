import { AxiosResponse } from 'axios';
import { put, call, takeEvery, all } from 'redux-saga/effects';
import { Map, fromJS } from 'immutable';

import { IAuthState, AuthActionTypes } from 'types/store/auth';
import { SetMapTypeAllowedData } from 'types/global/reducer-state';

import history from '../session-history';
import api from 'api';

import {
    IS_AUTH_REQUEST,
    IS_AUTH_SUCCESS,
    SIGN_OUT_REQUEST,
    SIGN_OUT_SUCCESS
} from '../types/store/auth';
import { IAddUserAction, ADD_USER_REQUEST, UserActionTypes, IUser } from 'types/store/user';
import { ILoginRegister, IIsAuth } from 'types/auth';
import { addUser } from './user';

const initialState: IAuthState = {
    loading: false,
    isAuth: false
};

export const moduleName = 'auth';

type MapTypeAllowedData = SetMapTypeAllowedData<IAuthState>;

const initialStateMap = <MapTypeAllowedData>Map(initialState);

export default function reducer(
    state: MapTypeAllowedData = initialStateMap,
    action: AuthActionTypes
) {
    switch (action.type) {
        case IS_AUTH_REQUEST:
            return state
                .set('loading', true);

        case IS_AUTH_SUCCESS:
            return state
                .set('loading', false)
                .set('isAuth', fromJS(action.payload))

        case SIGN_OUT_REQUEST:
            return state
                .set('loading', true)

        case SIGN_OUT_SUCCESS:
            console.log('action.payload', action.payload);

            return state
                .set('loading', false)
                .set('isAuth', action.payload ? fromJS(false) : state.get('isAuth'))

        default:
            return state;
    };
};

/* actions */
export function loginRegister(payload: ILoginRegister): UserActionTypes {
    return {
        type: ADD_USER_REQUEST,
        payload
    };
};

export function isAuth(): AuthActionTypes {
    return {
        type: IS_AUTH_REQUEST
    };
};

export function signOut(): AuthActionTypes {
    return {
        type: SIGN_OUT_REQUEST
    };
};

/* saga */
export const loginRegisterSaga = function* (action: Required<IAddUserAction>) {
    const { mode, user } = action.payload;

    try {
        const data: AxiosResponse<IUser> = yield call(api.post, mode, user);

        yield put({
            type: IS_AUTH_SUCCESS,
            payload: true
        });

        yield put(addUser(data?.data));
    } catch (error) {
        console.log(error);
    }
};

export const isAuthSaga = function* () {
    try {
        const data: AxiosResponse<IIsAuth> = yield call(api, 'isAuth');

        yield put({
            type: IS_AUTH_SUCCESS,
            payload: data?.data?.isAuth,
        });
    } catch (error) {
        console.log(error);
    }
};

export const signOutSaga = function* () {
    try {
        const data: AxiosResponse<boolean> = yield call(api, 'signOut');

        yield put({
            type: SIGN_OUT_SUCCESS,
            payload: data?.data,
        });

        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const saga = function* () {
    yield all([
        takeEvery(ADD_USER_REQUEST, loginRegisterSaga),
        takeEvery(IS_AUTH_REQUEST, isAuthSaga),
        takeEvery(SIGN_OUT_REQUEST, signOutSaga)
    ]);
};