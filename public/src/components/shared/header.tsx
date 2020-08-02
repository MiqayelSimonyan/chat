import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box } from '@material-ui/core';

import 'assets/styles/header.scss';

import Auth from 'components/auth';
import SignOut from 'components/auth/sign-out';
import { isAuth as isAuthAction } from 'ducks/auth';
import { isAuthSelector, loadingSelector } from 'selectors/auth';

const Header = () => {
    const dispatch = useDispatch();
    let isAuth: boolean = useSelector(isAuthSelector);
    let loading: boolean = useSelector(loadingSelector);

    useEffect(() => {
        dispatch(isAuthAction());
    }, []);

    return (
        <Grid
            className="header"
            container
            spacing={0}
            direction="column"
            alignItems="flex-end"
        >
            {
                loading ? null :
                    !isAuth ?
                        <Box mr={1}>
                            <Auth mode="signIn" title='Sign In' />
                            <Auth mode="signUp" title='Sign Up' />
                        </Box>
                        : <SignOut />
            }
        </Grid>
    )
};

export default memo(Header);