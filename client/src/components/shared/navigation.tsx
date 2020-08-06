import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';

import { usersSelector } from 'selectors/user';
import { userSelector } from 'selectors/user';

import SignOut from 'components/auth/sign-out';
import { IUser } from 'types/store/user';

import 'assets/styles/layout/navigation.scss';

const Navigation = () => {
    const users: Array<IUser> = useSelector(usersSelector);
    const user: IUser = useSelector(userSelector);

    return (
        <Grid container>
            <Grid item xs={9}>
                <Button>
                    <NavLink to="/" exact><HomeIcon /></NavLink>
                </Button>
                {
                    users?.length ?
                        <Button>
                            <NavLink to="/chat" exact>chat</NavLink>
                        </Button>
                        : null
                }
            </Grid>
            <Grid item xs={3} style={{ textAlign: 'right' }}>
                <span className="username">{user?.username}</span>
                <SignOut />
            </Grid>
        </Grid>
    )
};

export default memo(Navigation);