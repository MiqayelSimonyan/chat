import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Grid, ListItemText, Avatar, List, ListItem, ListItemIcon, Button, Typography } from '@material-ui/core';

import { isAuthSelector } from 'selectors/auth';
import { usersSelector } from 'selectors/user';

import { IUser } from 'types/store/user';
import styles from './styles';
import { IStoreIsAuth } from 'types/store/auth';

const useStyles = styles;

const Users = () => {
    let isAuth: IStoreIsAuth = useSelector(isAuthSelector);
    let users: Array<IUser> = useSelector(usersSelector);
    const history = useHistory();
    const classes = useStyles();

    const startChat = (id?: string) => {
        history.push(`/chat/${id}`);
    };

    return (
        (!isAuth.hasOwnProperty('auth') || !isAuth.auth) ? null :
            <List>
                {
                    !users?.length ? null :
                        <>
                            <Grid container>
                                <Grid item xs={12} className={classes.title}>
                                    <Typography variant="h5" className="header-message">Users</Typography>
                                </Grid>
                            </Grid>
                            {
                                users.map((user: IUser) => {
                                    const { _id, username } = user;

                                    return <ListItem className={classes.listItem} key={_id} button>
                                        <Grid container>
                                            <Grid item>
                                                <ListItemIcon>
                                                    <Avatar className={classes.avatar}>{username?.charAt(0)}</Avatar>
                                                </ListItemIcon>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <ListItemText className={classes.username} primary={username}>{username}</ListItemText>
                                            </Grid>
                                            <ListItemText className={classes.textAlignRight}>
                                                <Button variant="contained" color="primary" onClick={startChat.bind(null, _id)}>Chat</Button>
                                            </ListItemText>
                                        </Grid>
                                    </ListItem>
                                })
                            }
                        </>
                }
            </List>
    )
};

export default Users;