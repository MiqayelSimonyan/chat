import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import authReducer, { moduleName as authModule } from 'ducks/auth';
import userReducer, { moduleName as userModule } from 'ducks/user';
import chatReducer, { moduleName as chatModule } from 'ducks/chat';

export default combineReducers({
    router,
    [authModule]: authReducer,
    [userModule]: userReducer,
    [chatModule]: chatReducer
});