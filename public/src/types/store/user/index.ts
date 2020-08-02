import { IActionCreator } from 'types/global/action-creator';
import { ILoginRegister } from 'types/auth';

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';

export interface IUserState {
    loading?: boolean;
    user?: IUser;
};

// actions
export interface IAddUserAction extends IActionCreator<ILoginRegister> {
    type: typeof ADD_USER_REQUEST;
};

export interface IAddUserSuccessAction extends IActionCreator<IUser> {
    type: typeof ADD_USER_SUCCESS;
};

// selector types
export interface IUser {
    _id?: string;
    username: string;
};

export type UserActionTypes = IAddUserAction | IAddUserSuccessAction;