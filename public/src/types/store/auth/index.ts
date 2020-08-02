import { IActionCreator } from 'types/global/action-creator';

export const IS_AUTH_REQUEST = 'IS_AUTH_REQUEST';
export const IS_AUTH_SUCCESS = 'IS_AUTH_SUCCESS';
export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';

export interface IAuthState {
    loading: boolean;
    isAuth: boolean;
};

// actions
export interface IIsAuthAction extends IActionCreator {
    type: typeof IS_AUTH_REQUEST;
};

export interface IIsAuthSuccessAction extends IActionCreator<boolean> {
    type: typeof IS_AUTH_SUCCESS;
};

export interface ISignOutAction extends IActionCreator {
    type: typeof SIGN_OUT_REQUEST;
};

export interface ISignOutSuccessAction extends IActionCreator<boolean> {
    type: typeof SIGN_OUT_SUCCESS;
};

export type AuthActionTypes =
    IIsAuthAction
    | IIsAuthSuccessAction
    | ISignOutAction
    | ISignOutSuccessAction;