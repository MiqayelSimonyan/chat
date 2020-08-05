import { List } from "immutable";

import { IActionCreator } from "types/global/action-creator";
import { ImmutableMap } from "types/global/immutable-map";
import { IUser } from "../user";

export const GET_CHAT_USER_REQUEST = 'GET_CHAT_USER_REQUEST';
export const GET_CHAT_USER_SUCCESS = 'GET_CHAT_USER_SUCCESS';
export const ADD_MESSAGE_SUCCESS = 'ADD_MESSAGE_SUCCESS';

export interface IChatState {
    loading: boolean;
    reciver: ImmutableMap<IUser>;
    messages: List<IMessage>;
};

// actions
export interface IGetReciverAction extends IActionCreator<string> {
    type: typeof GET_CHAT_USER_REQUEST;
};

export interface IGetMessageAction extends IActionCreator<IMessage> {
    type: typeof ADD_MESSAGE_SUCCESS;
};

export interface IGetReciverSuccessAction extends IActionCreator {
    type: typeof GET_CHAT_USER_SUCCESS;
};

// selector types
export interface IMessage {
    sender: boolean;
    text: string;
    reciver: IUser;
    user?: IUser;
    date: Date | number;
};

export type ChatActionTypes = IGetReciverAction | IGetMessageAction | IGetReciverSuccessAction;