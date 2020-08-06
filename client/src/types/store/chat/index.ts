import { List } from "immutable";

import { IActionCreator } from "types/global/action-creator";
import { ImmutableMap } from "types/global/immutable-map";
import { IUser } from "../user";

export const GET_CHAT_USER_REQUEST = 'GET_CHAT_USER_REQUEST';
export const GET_CHAT_USER_SUCCESS = 'GET_CHAT_USER_SUCCESS';
export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const ADD_MESSAGE_SUCCESS = 'ADD_MESSAGE_SUCCESS';

export interface IChatState {
    loading: boolean;
    receiver: ImmutableMap<IUser>;
    messages: List<IMessage>;
};

// actions
export interface IGetReceiverAction extends IActionCreator<string> {
    type: typeof GET_CHAT_USER_REQUEST;
};

export interface IGetMessagesAction extends IActionCreator<string> {
    type: typeof GET_MESSAGES_REQUEST;
};

export interface IGetMessagesSuccessAction extends IActionCreator<Array<IMessage>> {
    type: typeof GET_MESSAGES_SUCCESS;
};

export interface IGetMessageAction extends IActionCreator<IMessage> {
    type: typeof ADD_MESSAGE_SUCCESS;
};

export interface IGetReceiverSuccessAction extends IActionCreator {
    type: typeof GET_CHAT_USER_SUCCESS;
};

// selector types
export interface IMessage {
    sender: IUser;
    message: string;
    receiver: Partial<IUser>;
    user?: IUser;
    date?: Date | number;
    createdAt?: Date;
};

export type ChatActionTypes = IGetReceiverAction
    | IGetMessagesAction
    | IGetMessagesSuccessAction
    | IGetMessageAction
    | IGetReceiverSuccessAction;