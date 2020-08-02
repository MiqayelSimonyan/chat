import { Map } from 'immutable';

import { SetMapTypeAllowedData } from 'types/global/reducer-state';
import { IUserState, UserActionTypes, IUser } from 'types/store/user';

import {
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS
} from '../types/store/user';

const initialState: IUserState = {};

export const moduleName = 'user';

type MapTypeAllowedData = SetMapTypeAllowedData<IUserState>;

const initialStateMap = <MapTypeAllowedData>Map(initialState);

export default function reducer(
    state: MapTypeAllowedData = initialStateMap,
    action: any
) {
    switch (action.type) {
        case ADD_USER_REQUEST:
            return state
                .set('loading', true);

        case ADD_USER_SUCCESS:
            return state
                .set('loading', false)
                .set('user', action.payload)

        default:
            return state;
    };
};

/* actions */
export function addUser(payload: IUser): UserActionTypes {
    return {
        type: ADD_USER_SUCCESS,
        payload
    };
};