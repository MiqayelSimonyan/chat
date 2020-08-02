import { createSelector } from 'reselect';

export const moduleName = 'auth';

const stateSelector = (key: string) => (state: any) => state[moduleName].get(key);

export const isAuthSelector = createSelector(stateSelector('isAuth'), (value) =>
    value && value.toJS ? value.toJS() : value
);

export const loadingSelector = createSelector(stateSelector('loading'), (value) =>
    value && value.toJS ? value.toJS() : value
);