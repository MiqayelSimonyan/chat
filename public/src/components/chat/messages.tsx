import React, { FunctionComponent, memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List, ListItem, Grid, ListItemText } from '@material-ui/core';
import moment from 'moment';

import { getMessages } from 'ducks/chat';
import { chatMessagesSelector } from 'selectors/chat';

import { IIndexSignature } from 'types/global/index-signature';
import { IMessage } from 'types/store/chat';
import { RoutePropsType } from 'types/global/route-props';
import { IMatchParams } from 'types/common';
import { IUser } from 'types/store/user';

type Props = RoutePropsType<IMatchParams, {
    user: IUser;
    classes: IIndexSignature<string>;
}>;

const Messages: FunctionComponent<Props> = ({ user, classes, match }) => {
    let paramsId = match?.params?.id;
    let messages: Array<IMessage> = useSelector(chatMessagesSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMessages(paramsId));
    }, []);

    return (
        <List className={classes.messageArea}>
            {
                !messages.length ? null :
                    messages.map((messageData: IMessage, index: number) => {
                        const { sender, receiver, message, date } = messageData;

                        return (
                            ((sender._id === paramsId && receiver._id === user._id) || (receiver._id === paramsId && sender._id === user._id)) ?
                                <ListItem key={index}>
                                    <Grid container>
                                        <Grid item xs={6} className={sender._id === user._id ? classes.orderToRight : classes.receiverMessage}>
                                            {sender._id !== user._id ?
                                                <ListItemText secondary={sender?.username} className={classes.username}></ListItemText>
                                                : null
                                            }
                                            <ListItemText className={sender._id === user._id ? classes.senderMessage : classes.receiverMessage} primary={message}></ListItemText>
                                        </Grid>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={6} className={sender._id === user._id ? classes.orderToRight : classes.orderToLeft}>
                                            <ListItemText className={classes.date} secondary={moment(date || messageData.createdAt).format('LLLL')}></ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                : null
                        )
                    })
            }
        </List>
    );
};

export default memo(withRouter(Messages));