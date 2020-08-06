import React, { FunctionComponent, memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, List, ListItem, ListItemIcon, Avatar, ListItemText } from '@material-ui/core';

import { getMessages } from 'ducks/chat';

import { IIndexSignature } from 'types/global/index-signature';
import { IUser } from 'types/store/user';
import { RoutePropsType } from 'types/global/route-props';
import { IMatchParams } from 'types/common';

type Props = RoutePropsType<IMatchParams, {
    onlineUsers: IIndexSignature<string>;
    users: Array<IUser>;
    classes: IIndexSignature<string>;
}>;

const Users: FunctionComponent<Props> = ({ onlineUsers, users, classes, match }) => {
    const [activeUserId, setActiveUserId] = useState<string>(match?.params?.id);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setActiveUserId(match?.params?.id);
    }, []);

    const setActiveChat = (id?: string) => {
        if (id) {
            setActiveUserId(id);
            dispatch(getMessages(id));
        };

        history.push(`/chat/${id}`);
    };

    return (
        <Grid item xs={6} md={4} className={classes.borderRight}>
            {
                <List>
                    {
                        !users?.length ? null :
                            users.map(user => {
                                const { _id, username } = user;

                                return <ListItem key={_id} button className={`chat_user ${activeUserId == _id ? 'active' : ''}`} onClick={setActiveChat.bind(null, _id)}>
                                    <ListItemIcon>
                                        <Avatar style={{ backgroundColor: '#6f81d8' }}>{username?.charAt(0)}</Avatar>
                                    </ListItemIcon>

                                    <ListItemText primary={username}>{username}</ListItemText>
                                    {
                                        _id && onlineUsers[_id] ?
                                            <ListItemText secondary="online" className={classes.textAlignRight}></ListItemText>
                                            : null
                                    }
                                </ListItem>
                            })
                    }
                </List>
            }
        </Grid>
    );
};

export default memo(withRouter(Users));