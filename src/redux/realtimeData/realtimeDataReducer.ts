import {
  ActionTypes,
  initialState,
  WebSocketAction,
  WebSocketState,
} from './types';
import { Reducer } from 'redux';

const MAX_DATA_LENGTH = 50;

export const realtimeDataReducer: Reducer<WebSocketState, WebSocketAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ActionTypes.RECEIVED_DATA:
      const newData = [action.payload[1], ...state.data];
      const limitedData = newData.slice(0, MAX_DATA_LENGTH);
      return {
        ...state,
        data: limitedData,
      };
    case ActionTypes.WEBSOCKET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.START_WEBSOCKET_CONNECTION:
      return {
        ...state,
        active: true,
      };
    case ActionTypes.STOP_WEBSOCKET_CONNECTION:
      return {
        ...state,
        active: false,
      };
    default:
      return state;
  }
};
