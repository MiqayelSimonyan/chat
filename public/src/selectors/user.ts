import { createSelector } from 'reselect';

import { moduleName } from 'ducks/user';

const stateSelector = (key: string) => (state: any) => state[moduleName].get(key);

export const userSelector = createSelector(stateSelector('user'), (value) => {
    return value && value.toJS ? value.toJS() : value
});

export const usersSelector = createSelector(stateSelector('users'), (value) => {
    return value && value.toJS ? value.toJS() : value
});

export const usersLoadingSelector = createSelector(stateSelector('usersLoading'), (value) => {
    return value && value.toJS ? value.toJS() : value
});