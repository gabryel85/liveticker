import {
  ActionTypes,
  ReceivedDataAction,
  StartWebSocketConnectionAction,
  StopWebSocketConnectionAction,
  WebSocketActionTypes,
  WebSocketPayloadData,
} from './types';

export const startWebSocketConnection = (): StartWebSocketConnectionAction => ({
  type: WebSocketActionTypes.START_WEBSOCKET_CONNECTION,
});

export const stopWebSocketConnection = (): StopWebSocketConnectionAction => ({
  type: WebSocketActionTypes.STOP_WEBSOCKET_CONNECTION,
});

export const receivedData = (
  payload: WebSocketPayloadData[],
): ReceivedDataAction => ({
  type: ActionTypes.RECEIVED_DATA,
  payload,
});
