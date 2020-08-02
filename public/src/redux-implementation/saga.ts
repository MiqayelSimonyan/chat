import { all } from 'redux-saga/effects';
import { saga as workflowSaga } from 'ducks/auth';

export default function* rootSaga() {
  yield all([workflowSaga()]);
};