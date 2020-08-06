import { createSelector } from 'reselect';

import { moduleName } from 'ducks/chat';

const stateSelector = (key: string) => (state: any) => state[moduleName].get(key);

export const receiverSelector = createSelector(stateSelector('receiver'), (value) => {
    return value && value.toJS ? value.toJS() : value
});

export const chatMessagesSelector = createSelector(stateSelector('messages'), (value) => {
    return value && value.toJS ? value.toJS() : value
});