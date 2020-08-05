import { createSelector } from 'reselect';

import { moduleName } from 'ducks/auth';

const stateSelector = (key: string) => (state: any) => state[moduleName].get(key);

export const isAuthSelector = createSelector(stateSelector('isAuth'), (value) => {
    return value && value.toJS ? value.toJS() : value;
});

export const errorSelector = createSelector(stateSelector('errors'), (value) => {
    return value && value.toJS ? value.toJS() : value;
});

export const loadingSelector = createSelector(stateSelector('loading'), (value) => {
    return value && value.toJS ? value.toJS() : value;
});