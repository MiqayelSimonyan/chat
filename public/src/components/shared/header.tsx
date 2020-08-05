import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import 'assets/styles/header.scss';

import Auth from 'components/auth';
import Navigation from 'components/shared/navigation';
import { isAuthSelector } from 'selectors/auth';
import { IStoreIsAuth } from 'types/store/auth';

const Header = () => {
    let isAuth: IStoreIsAuth = useSelector(isAuthSelector);

    return (
        <Grid
            className="header"
            container
            spacing={0}
            direction="column"
        >
            {
                !isAuth.hasOwnProperty('auth') ? null :
                    !isAuth.auth ?
                        <Grid container>
                            <Grid item xs={8}></Grid>
                            <Grid item xs={4} className='auth-buttons-wrapper'>
                                <Auth mode="signIn" title='Sign In' />
                                <Auth mode="signUp" title='Sign Up' />
                            </Grid>
                        </Grid>
                        : <Navigation />
            }
        </Grid>
    )
};

export default memo(Header);