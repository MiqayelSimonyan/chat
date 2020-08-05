import { IActionCreator } from 'types/global/action-creator';
import { IIndexSignature } from 'types/global/index-signature';
import { ImmutableMap } from 'types/global/immutable-map';
import { ILoginRegister } from 'types/auth';

export const IS_AUTH_REQUEST = 'IS_AUTH_REQUEST';
export const IS_AUTH_SUCCESS = 'IS_AUTH_SUCCESS';
export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const LOG_IN_REGISTER_REQUEST = 'LOG_IN_REGISTER_REQUEST';
export const AUTH_ERROR_SUCCESS = 'AUTH_ERROR_SUCCESS';

export interface IAuthState {
    loading: boolean;
    isAuth: ImmutableMap<IStoreIsAuth>;
    errors: ImmutableMap<IIndexSignature<string>>;
};

// actions
export interface IIsAuthAction extends IActionCreator {
    type: typeof IS_AUTH_REQUEST;
};

export interface IIsAuthSuccessAction extends IActionCreator<boolean> {
    type: typeof IS_AUTH_SUCCESS;
};

export interface ILoginRegisterAction extends IActionCreator<ILoginRegister> {
    type: typeof LOG_IN_REGISTER_REQUEST;
};

export interface ISignOutAction extends IActionCreator {
    type: typeof SIGN_OUT_REQUEST;
};

export interface ISignOutSuccessAction extends IActionCreator<boolean> {
    type: typeof SIGN_OUT_SUCCESS;
};

export interface ISetErrorSuccessAction extends IActionCreator<IIndexSignature<string>> {
    type: typeof AUTH_ERROR_SUCCESS;
};

// selector types
export interface IStoreIsAuth {
    auth?: boolean
};

export type AuthActionTypes =
    IIsAuthAction
    | IIsAuthSuccessAction
    | ILoginRegisterAction
    | ISignOutAction
    | ISignOutSuccessAction
    | ISetErrorSuccessAction;