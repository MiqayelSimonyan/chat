import React, { useState, memo, ChangeEvent, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import socket from 'services/socket';
import { addMessage as addMessageAction } from 'ducks/chat';
import { userSelector } from 'selectors/user';
import { reciverSelector } from 'selectors/chat';
import { IUser } from 'types/store/user';

const ChatAction = () => {
    let user: IUser = useSelector(userSelector);
    let reciver: IUser = useSelector(reciverSelector);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage((event.target as HTMLInputElement).value);
    };

    const onBlur = () => {
        socket.emit('stop_typing', reciver);
    };

    const onKeyPress = (event: KeyboardEvent) => {
        let value = (event.target as HTMLInputElement).value;
        socket.emit('typing', user, reciver);

        if (value) {
            setMessage(value);

            if ((event.which || event.keyCode) === 13) addMessage(value);
        };
    };

    const addMessage = (text: string) => {
        let data = { reciver, user, text, date: Date.now() };
        socket.emit('message', data);

        socket.emit('stop_typing', reciver);
        dispatch(addMessageAction({ sender: true, ...data }));

        setMessage('');
    };

    const sendMessage = () => {
        if (message) addMessage(message);
    };

    return (
        <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
                <TextField
                    id="outlined-basic-email"
                    label="Type Something"
                    value={message}
                    onChange={onChange}
                    fullWidth
                    onKeyPress={onKeyPress}
                    onBlur={onBlur}
                />
            </Grid>
            <Grid item xs={1}>
                <Fab color="primary" aria-label="add">
                    <div onClick={sendMessage}><SendIcon /></div>
                </Fab>
            </Grid>
        </Grid>
    );
};

export default memo(ChatAction);