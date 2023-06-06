import { combineReducers } from 'redux';
import realtimeDataReducer from './realtimeData';
import notifications from './notifications';

export default combineReducers({
  wss: realtimeDataReducer,
  notifications,
});
