import { all, fork } from 'redux-saga/effects';
import handleWebSocket from './realtimeData/webSocketSaga';

export default function* rootSaga() {
  yield all([fork(handleWebSocket)]);
}
