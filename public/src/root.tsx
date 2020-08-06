import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Header from 'components/shared/header';
import HomePage from 'components/home';
import Chat from 'components/chat';
import PageNotFound from 'components/page-not-found';
import { makeStyles } from '@material-ui/core';

import { isAuth as isAuthAction } from 'ducks/auth';
import { isAuthSelector } from 'selectors/auth';

import PrivateRoute from 'components/common/private-route';
import { IStoreIsAuth } from 'types/store/auth';
import { getUsers, getUser } from 'ducks/user';

const useStyles = makeStyles({
    grid: {
        margin: '0 auto'
    },
});

const Root = () => {
    let isAuth: IStoreIsAuth = useSelector(isAuthSelector);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(isAuthAction());
        dispatch(getUser());
    }, []);

    useEffect(() => {
        if (isAuth.hasOwnProperty('auth') && isAuth.auth) {
            dispatch(getUsers());
        };
    }, [isAuth]);

    return (
        <>
            <Header />
            <Grid item xs={8} className={classes.grid}>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <PrivateRoute path={['/chat', '/chat/:id']} component={Chat} exact />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </Grid>
        </>
    );
};

export default Root;