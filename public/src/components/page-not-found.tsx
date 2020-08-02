import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import pageNotFound from 'assets/images/404.gif';

import 'assets/styles/page-not-found.scss';

const PageNotFound = () => {
    return (
        <Grid
            container
            className="not_found_wrap"
            direction="column"
            alignItems="center"
            justify="center"
            style={{ width: '99%' }}
        >
            <img className="mb-5" src={pageNotFound} alt="unknown page" title="notFound" />
            <Link to="/">Return To Homepage</Link>
        </Grid>
    )
}

export default PageNotFound;