import React, { FunctionComponent, memo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Grid, List, ListItem, ListItemIcon, Avatar, ListItemText } from '@material-ui/core';

import { reciverSelector } from 'selectors/chat';

import { IIndexSignature } from 'types/global/index-signature';
import { IUser } from 'types/store/user';

type Props = {
    classes: IIndexSignature<string>;
};

const Recivers: FunctionComponent<Props> = ({ classes }) => {
    let reciver: IUser = useSelector(reciverSelector);
    const history = useHistory();

    const { _id, username } = reciver;

    const setActiveChat = (id?: string) => {
        history.push(`/chat/${id}`);
    };

    return (
        <Grid item xs={6} md={4} className={classes.borderRight}>
            {
                <List>
                    {
                        !reciver ? null :
                            username ?
                                <ListItem key={_id} button className="active" onClick={setActiveChat.bind(null, _id)}>

                                    <ListItemIcon>
                                        <Avatar style={{ backgroundColor: '#6f81d8' }}>{username?.charAt(0)}</Avatar>
                                    </ListItemIcon>

                                    <ListItemText primary={username}>{username}</ListItemText>
                                    {/*<ListItemText secondary="online" className={classes.textAlignRight}></ListItemText>*/}
                                </ListItem>
                                : null
                    }
                </List>
            }
        </Grid>
    );
};

export default memo(Recivers);