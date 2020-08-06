import React, { memo, useEffect, FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, ListItemText, Divider, Paper } from '@material-ui/core';

import { isAuthSelector } from 'selectors/auth';
import { userSelector, usersSelector, usersLoadingSelector } from 'selectors/user';

import socket from 'services/socket';

import Users from './users';
import Messages from './messages';
import ChatAction from './chat-action';

import Loading from 'components/common/loading';

import { RoutePropsType } from 'types/global/route-props';
import { IUser } from 'types/store/user';
import { IStoreIsAuth } from 'types/store/auth';
import { IMatchParams } from 'types/common';
import { Typing } from 'types/chat';
import { IIndexSignature } from 'types/global/index-signature';

import styles from './styles';

import 'assets/styles/pages/chat.scss';

const useStyles = styles;

type Props = RoutePropsType<IMatchParams, {}>;

const Chat: FunctionComponent<Props> = ({ match }) => {
    const [typingUser, setTypingUser] = useState<IUser | null>(null);
    const [onlineUsers, setOnlineUsers] = useState({});

    let usersLoading: Array<IUser> = useSelector(usersLoadingSelector);
    let users: Array<IUser> = useSelector(usersSelector);
    let user: IUser = useSelector(userSelector);
    let isAuth: IStoreIsAuth = useSelector(isAuthSelector);

    const classes = useStyles();

    socket.on('online', (data: { clients: IIndexSignature<string> }) => {
        setOnlineUsers(data?.clients);
    });

    useEffect(() => {
        if (isAuth.hasOwnProperty('auth') && isAuth.auth) {
            socket.on('user_typing', (data: Typing) => {
                if (data?.user) setTypingUser(data.user);
            });

            socket.on('user_stop_typing', () => {
                setTypingUser(null);
            });
        };
    }, [isAuth]);

    useEffect(() => {
        if (user?._id) socket.emit('authentificate', user._id);
    }, [user]);

    return (
        !isAuth ? null :
            <div className="chat_wrapper">
                {usersLoading ? <Loading /> : !users.length ? <h2 style={{ textAlign: 'center' }}>No users for chat</h2> :
                    <>
                        <Grid container>
                            <Grid item xs={12} className={classes.title}>
                                <Typography variant="h5" className="header-message">Chat</Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container component={Paper} className={classes.chatSection}>
                            <Users classes={classes} users={users} onlineUsers={onlineUsers} />
                            <Grid item xs={6} md={8}>
                                {!match?.params?.id ? <h2 className="info">click on username and start a chat with a particular user</h2> :
                                    <>
                                        <Messages user={user} classes={classes} />
                                        <Divider />
                                        {
                                            (!typingUser?.username || typingUser._id !== match?.params?.id) ? null :
                                                <Grid item>
                                                    <ListItemText style={{ paddingLeft: '20px' }} primary={`${typingUser.username} is typing...`}></ListItemText>
                                                </Grid>
                                        }
                                        <Divider />
                                        <ChatAction />
                                    </>
                                }
                            </Grid>
                        </Grid>
                    </>
                }
            </div>
    )
};

export default memo(Chat);