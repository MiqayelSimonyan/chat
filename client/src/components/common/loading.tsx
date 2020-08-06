import React from 'react';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import 'assets/styles/layout/loading.scss';

const Loading = () => {
    return <Grid className="loading" container>
        <CircularProgress
            className="loading-progress"
            color="secondary"
            disableShrink
        />
    </Grid>
};

export default Loading;