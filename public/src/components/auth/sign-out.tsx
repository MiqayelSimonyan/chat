import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import { signOut } from 'ducks/auth';

const SignOut = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(signOut());
    };

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={onClick}
        >
            Sign Out
        </Button>
    );
};

export default memo(SignOut);