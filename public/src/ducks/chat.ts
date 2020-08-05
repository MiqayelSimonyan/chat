import { all, takeEvery, call, put, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { Map, fromJS, List } from 'immutable';
import { AxiosResponse } from 'axios';

import api from 'services/axios';
import socket from 'services/socket';

import { SetMapTypeAllowedData } from 'types/global/reducer-state';
import { IUser } from 'types/store/user';
import { IGetReciverAction, ChatActionTypes, IChatState, IMessage } from 'types/store/chat';

import {
    GET_CHAT_USER_REQUEST,
    GET_CHAT_USER_SUCCESS,
    ADD_MESSAGE_SUCCESS
} from '../types/store/chat';

const initialState: IChatState = {
    loading: false,
    reciver: Map(),
    messages: List.of()
};

export const moduleName = 'chat';

type MapTypeAllowedData = SetMapTypeAllowedData<IChatState>;

const initialStateMap = <MapTypeAllowedData>Map(initialState);


export default function reducer(
    state: MapTypeAllowedData = initialStateMap,
    action: ChatActionTypes
) {
    switch (action.type) {
        case GET_CHAT_USER_REQUEST:
            return state
                .set('loading', true)

        case GET_CHAT_USER_SUCCESS:
            return state
                .set('loading', false)
                .set('reciver', fromJS(action.payload))

        case ADD_MESSAGE_SUCCESS:
            return state
                .set('loading', false)
                .setIn(['messages', state.get('messages').size], action.payload);

        default:
            return state;
    };
};

/* actions */
export function getReciver(payload: string): ChatActionTypes {
    return {
        type: GET_CHAT_USER_REQUEST,
        payload
    };
};

export function addMessage(payload: IMessage): ChatActionTypes {
    return {
        type: ADD_MESSAGE_SUCCESS,
        payload
    }
};

/* saga */
export function* createEventChannel(socket: any) {
    return eventChannel(emitter => {
        socket.on('user_message', (message: string) => {
            emitter(message);
        });
        return () => { };
    });
};

export const addMessageSaga = function* () {
    const channel = yield call(createEventChannel, socket);

    while (channel) {
        try {
            const payload = yield take(channel);

            yield put(addMessage({ ...payload }));
        } catch (err) {
            console.log('err', err);
        }
    };
};

export const getReciverSaga = function* (action: IGetReciverAction) {
    try {
        const data: AxiosResponse<Array<IUser>> = yield call(api, `user/${action.payload}`);

        yield put({
            type: GET_CHAT_USER_SUCCESS,
            payload: data?.data
        });
    } catch (err) {
        console.log('err', err);
    }
};

export const saga = function* () {
    yield all([
        takeEvery(GET_CHAT_USER_REQUEST, getReciverSaga),
        fork(addMessageSaga)
    ]);
};