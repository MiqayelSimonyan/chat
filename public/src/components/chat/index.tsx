import React, { memo, useEffect, FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, ListItemText, Divider, Paper } from '@material-ui/core';

import { getReciver } from 'ducks/chat';
import { isAuthSelector } from 'selectors/auth';
import { userSelector } from 'selectors/user';

import socket from 'services/socket';

import Recivers from './recivers';
import Messages from './messages';
import ChatAction from './chat-action';

import { RoutePropsType } from 'types/global/route-props';
import { IUser } from 'types/store/user';
import { IStoreIsAuth } from 'types/store/auth';
import { IMatchParams } from 'types/common';

import styles from './styles';

import 'assets/styles/pages/chat.scss';
import { Typing } from 'types/chat';

const useStyles = styles;

type Props = RoutePropsType<IMatchParams, {}>;

const Chat: FunctionComponent<Props> = (props) => {
    const [paramsId, setParamsId] = useState<string>('');
    const [typingUser, setTypingUser] = useState<any>(null);

    let user: IUser = useSelector(userSelector);
    let isAuth: IStoreIsAuth = useSelector(isAuthSelector);

    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if (isAuth.hasOwnProperty('auth') && isAuth.auth) {
            let id = props?.match?.params?.id;
            setParamsId(id);
            dispatch(getReciver(id));

            socket.on('user_typing', (data: Typing) => {
                setTypingUser(data?.user);
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
                <Grid container>
                    <Grid item xs={12} className={classes.title}>
                        <Typography variant="h5" className="header-message">Chat</Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container component={Paper} className={classes.chatSection}>
                    <Recivers classes={classes} />
                    <Grid item xs={6} md={8}>
                        <Messages classes={classes} paramsId={paramsId} />
                        <Divider />
                        {(!typingUser?.username || typingUser._id !== paramsId) ? null :
                            <Grid item>
                                <ListItemText style={{ paddingLeft: '20px' }} primary={`${typingUser.username} is typing...`}></ListItemText>
                            </Grid>
                        }
                        <Divider />
                        <ChatAction />
                    </Grid>
                </Grid>
            </div>
    )
};

export default memo(Chat);