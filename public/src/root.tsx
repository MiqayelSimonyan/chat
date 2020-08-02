import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Header from 'components/shared/header';
import HomePage from 'components/home';
import Chat from 'components/chat';
import PageNotFound from 'components/page-not-found';

import { IIndexSignature } from 'types/global/index-signature';

const styles = () => ({
    grid: {
        margin: '0 auto'
    },
});

type Props = {
    classes: IIndexSignature<any>;
};

const Root: FunctionComponent<Props> = ({ classes }) => {
    return (
        <>
            <Header />
            <Grid item xs={6} className={classes.grid}>
                <Switch>
                    <Route path="/" exact={true} component={HomePage} />
                    <Route path="/chat" exact={true} component={Chat} />
                    <Route path="*" exact={true} component={PageNotFound} />
                </Switch>
            </Grid>
        </>
    );
};

export default withStyles(styles)(Root);