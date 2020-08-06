import React, { useState, memo, ChangeEvent, KeyboardEvent, FunctionComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import socket from 'services/socket';
import { addMessage as addMessageAction } from 'ducks/chat';
import { userSelector } from 'selectors/user';
import { IUser } from 'types/store/user';
import { RoutePropsType } from 'types/global/route-props';
import { IMatchParams } from 'types/common';

type Props = RoutePropsType<IMatchParams, {}>;

const ChatAction: FunctionComponent<Props> = ({ match }) => {
    let paramsId = match?.params?.id;
    let user: IUser = useSelector(userSelector);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage((event.target as HTMLInputElement).value);
    };

    const onBlur = () => {
        socket.emit('stop_typing', { _id: paramsId });
    };

    const onKeyPress = (event: KeyboardEvent) => {
        let value = (event.target as HTMLInputElement).value;
        socket.emit('typing', user, { _id: paramsId });

        if (value) {
            setMessage(value);

            if ((event.which || event.keyCode) === 13) addMessage(value);
        };
    };

    const addMessage = (message: string) => {
        let data = {
            receiver: { _id: paramsId },
            sender: user,
            message, date: Date.now()
        };

        socket.emit('message', data);
        socket.emit('stop_typing', { _id: paramsId });
        dispatch(addMessageAction({ ...data }));

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

export default memo(withRouter(ChatAction));