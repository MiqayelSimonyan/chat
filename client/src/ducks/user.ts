import { all, takeEvery, call, put } from 'redux-saga/effects';
import { List, Map, fromJS } from 'immutable';
import { AxiosResponse } from 'axios';

import { SetMapTypeAllowedData } from 'types/global/reducer-state';
import { IUserState, UserActionTypes, IUser, IGetUsersAction } from 'types/store/user';
import api from 'services/axios';

import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS
} from '../types/store/user';

const initialState: IUserState = {
    loading: false,
    usersLoading: true,
    users: List.of(),
    user: Map()
};

export const moduleName = 'user';

type MapTypeAllowedData = SetMapTypeAllowedData<IUserState>;

const initialStateMap = <MapTypeAllowedData>Map(initialState);

export default function reducer(
    state: MapTypeAllowedData = initialStateMap,
    action: UserActionTypes
) {
    switch (action.type) {
        case GET_USER_REQUEST:
            return state
                .set('loading', true);

        case GET_USER_SUCCESS:
            return state
                .set('loading', false)
                .set('user', fromJS(action.payload))

        case GET_USERS_SUCCESS:
            return state
                .set('usersLoading', false)
                .set('users', fromJS(action.payload) || state.get('users'))

        default:
            return state;
    };
};

/* actions */
export function getUser(): UserActionTypes {
    return {
        type: GET_USER_REQUEST
    };
};

export function getUsers(): UserActionTypes {
    return {
        type: GET_USERS_REQUEST
    };
};

/* saga */
export const getUsersSaga = function* (action: Required<IGetUsersAction>) {
    try {
        const data: AxiosResponse<Array<IUser>> = yield call(api, 'users');

        yield put({
            type: GET_USERS_SUCCESS,
            payload: data?.data
        });
    } catch (err) {
        console.log('err', err);
    }
};

export const getUserSaga = function* () {
    try {
        const data: AxiosResponse<Array<IUser>> = yield call(api, 'user');

        yield put({
            type: GET_USER_SUCCESS,
            payload: data?.data
        });
    } catch (err) {
        console.log('err', err);
    }
};

export const saga = function* () {
    yield all([
        takeEvery(GET_USER_REQUEST, getUserSaga),
        takeEvery(GET_USERS_REQUEST, getUsersSaga)
    ]);
};