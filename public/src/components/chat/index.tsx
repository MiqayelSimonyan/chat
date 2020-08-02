import React from 'react';
import { useSelector } from 'react-redux';

import { isAuthSelector } from 'selectors/auth';

const Chat = () => {
    let isAuth: boolean = useSelector(isAuthSelector);

    return (
        !isAuth ? null : <h1>Chat</h1>
    )
};

export default Chat;