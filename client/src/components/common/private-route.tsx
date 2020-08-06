import React, { FunctionComponent } from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';

import { isAuthSelector } from 'selectors/auth';
import { IStoreIsAuth } from 'types/store/auth';

const PrivateRoute: FunctionComponent<any> = ({ Component, ...rest }) => {
    let isAuth: IStoreIsAuth = useSelector(isAuthSelector);

    return (
        !isAuth.hasOwnProperty('auth')
            ? null :
            isAuth.auth
                ? <Route {...rest} />
                : <Redirect to='/' />
    );
};

export default PrivateRoute;