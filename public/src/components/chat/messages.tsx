import React, { FunctionComponent, memo } from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, Grid, ListItemText } from '@material-ui/core';
import moment from 'moment';

import { chatMessagesSelector } from 'selectors/chat';

import { IIndexSignature } from 'types/global/index-signature';
import { IMessage } from 'types/store/chat';

type Props = {
    classes: IIndexSignature<string>;
    paramsId: string;
};

const Messages: FunctionComponent<Props> = ({ classes, paramsId }) => {
    let messages: Array<IMessage> = useSelector(chatMessagesSelector);

    return (
        <List className={classes.messageArea}>
            {
                !messages.length ? null :
                    messages.map((message: IMessage, index: number) => {
                        const { sender, reciver, text, date } = message;

                        return (
                            paramsId !== reciver._id ? null :
                                <ListItem key={index}>
                                    <Grid container>
                                        <Grid item xs={6} className={sender ? classes.orderToRight : classes.reciverMessage}>
                                            {reciver ?
                                                <ListItemText secondary={reciver?.username} className={classes.username}></ListItemText>
                                                : null}
                                            <ListItemText className={sender ? classes.senderMessage : classes.reciverMessage} primary={text}></ListItemText>
                                        </Grid>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={6} className={sender ? classes.orderToRight : ''}>
                                            <ListItemText secondary={moment(date).format('hh:mm')}></ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                        )
                    })
            }
        </List>
    );
};

export default memo(Messages);