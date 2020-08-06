import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware, { END } from 'redux-saga';
import logger from 'redux-logger';

import history from '../session-history';
import rootSaga from './saga';
import reducer from './reducer';

function getStore() {
    const sagaMiddleware: any = createSagaMiddleware();

    const enhancer = (process.env && process.env.NODE_ENV) !== 'production'
        ? applyMiddleware(routerMiddleware(history), sagaMiddleware, logger) : applyMiddleware(routerMiddleware(history), sagaMiddleware);

    const store: any = createStore(reducer, enhancer);
    if (process.env && process.env.NODE_ENV !== 'production' && typeof window != 'undefined') (window as any).store = store;

    sagaMiddleware.run(rootSaga);
    store.close = () => store.dispatch(END);

    return store;
}

export default getStore();