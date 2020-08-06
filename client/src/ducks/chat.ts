import { all, takeEvery, call, put, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { Map, fromJS, List } from 'immutable';
import { AxiosResponse } from 'axios';

import api from 'services/axios';
import socket from 'services/socket';

import { SetMapTypeAllowedData } from 'types/global/reducer-state';
import { IUser } from 'types/store/user';
import { IGetReceiverAction, ChatActionTypes, IChatState, IMessage, IGetMessageAction } from 'types/store/chat';

import {
    GET_CHAT_USER_REQUEST,
    GET_CHAT_USER_SUCCESS,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    ADD_MESSAGE_SUCCESS
} from '../types/store/chat';

const initialState: IChatState = {
    loading: false,
    receiver: Map(),
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
                .set('receiver', fromJS(action.payload))

        case GET_MESSAGES_SUCCESS:
            return state
                .set('messages', fromJS(action.payload));

        case ADD_MESSAGE_SUCCESS:
            return state
                .set('loading', false)
                .setIn(['messages', state.get('messages').size], action.payload);

        default:
            return state;
    };
};

/* actions */
export function getReceiver(payload: string): ChatActionTypes {
    return {
        type: GET_CHAT_USER_REQUEST,
        payload
    };
};

export function getMessages(payload: string): ChatActionTypes {
    return {
        type: GET_MESSAGES_REQUEST,
        payload
    }
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

export const getMessagesSaga = function* (action: IGetMessageAction) {
    try {
        const data: AxiosResponse<Array<IMessage>> = yield call(api, `messages/${action.payload}`);

        yield put({
            type: GET_MESSAGES_SUCCESS,
            payload: data?.data
        });
    } catch (err) {
        console.log('err', err);
    }
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

export const getReceiverSaga = function* (action: IGetReceiverAction) {
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
        takeEvery(GET_MESSAGES_REQUEST, getMessagesSaga),
        takeEvery(GET_CHAT_USER_REQUEST, getReceiverSaga),
        fork(addMessageSaga)
    ]);
};