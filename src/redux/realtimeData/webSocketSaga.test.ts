import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { handleWebSocket, watchWebSocketConnection } from './webSocketSaga';
import { WebSocketActionTypes } from './types';
import { receivedData } from './realtimeDataActions';
import { WebSocketPayloadData } from './types';
import { eventChannel, EventChannel } from 'redux-saga';

const createWebSocketChannel = (): EventChannel<WebSocketPayloadData[]> => {
  return eventChannel((emitter) => {
    emitter([{} as WebSocketPayloadData]); // emit an array of WebSocketPayloadData
    return () => {};
  });
};

describe('WebSocket saga', () => {
  const mockCreateWebSocketChannel = () => createWebSocketChannel();

  it('should handle websocket connection and data', () => {
    const mockedPayloadData: WebSocketPayloadData[] = [
      {} as WebSocketPayloadData,
    ];
    const mockEventChannel = createWebSocketChannel();

    return expectSaga(watchWebSocketConnection)
      .provide([[call(mockCreateWebSocketChannel), mockEventChannel]])
      .put(receivedData(mockedPayloadData))
      .dispatch({ type: WebSocketActionTypes.START_WEBSOCKET_CONNECTION })
      .silentRun();
  });

  it('should handle websocket disconnection', () => {
    const mockedPayloadData: WebSocketPayloadData[] = [
      {} as WebSocketPayloadData,
    ];
    const mockEventChannel = createWebSocketChannel();

    return expectSaga(watchWebSocketConnection)
      .provide([[call(mockCreateWebSocketChannel), mockEventChannel]])
      .not.put(receivedData(mockedPayloadData))
      .dispatch({ type: WebSocketActionTypes.STOP_WEBSOCKET_CONNECTION })
      .silentRun();
  });
});
