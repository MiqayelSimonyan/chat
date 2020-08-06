import { List } from 'immutable';

import { IActionCreator } from 'types/global/action-creator';
import { ImmutableMap } from 'types/global/immutable-map';
import { ILoginRegister } from 'types/auth';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';

export interface IUserState {
    loading: boolean;
    usersLoading: boolean;
    user: ImmutableMap<IUser>;
    users: List<IUser>;
};

// actions
export interface IAddUserAction extends IActionCreator<ILoginRegister> {
    type: typeof GET_USER_REQUEST;
};

export interface IAddUserSuccessAction extends IActionCreator<IUser> {
    type: typeof GET_USER_SUCCESS;
};

export interface IGetUsersAction extends IActionCreator {
    type: typeof GET_USERS_REQUEST;
};

export interface IGetUsersSuccessAction extends IActionCreator {
    type: typeof GET_USERS_SUCCESS;
};

// selector types
export interface IUser {
    _id?: string;
    username: string;
};

export type UserActionTypes = IAddUserAction
    | IAddUserSuccessAction
    | IGetUsersAction
    | IGetUsersSuccessAction;