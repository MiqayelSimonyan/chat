import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import store from './redux-implementation';
import history from './session-history';
import Root from './root';

const App = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
    >
      <Provider store={store}>
        <Router history={history}>
          <Root />
        </Router>
      </Provider>
    </Grid>
  );
}

export default App;