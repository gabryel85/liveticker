import { eventChannel, EventChannel, SagaIterator } from 'redux-saga';
import {
  call,
  take,
  put,
  fork,
  cancelled,
  cancel,
  takeLatest,
} from 'redux-saga/effects';
import { WebSocketPayloadData } from './types';
import { addNotification } from '../notifications/notificationsActions';
import { NotificationType } from '../notifications/types';
import { receivedData } from './realtimeDataActions';
import { WebSocketActionTypes } from './types';
import store from '../store';

let webSocketChannel: EventChannel<WebSocketPayloadData[]> | null = null;

const createWebSocketChannel = (
  url: string,
  channel: string,
  symbol: string,
): EventChannel<WebSocketPayloadData[]> => {
  return eventChannel((emitter) => {
    const ws = new WebSocket(url);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          event: 'subscribe',
          channel,
          symbol,
        }),
      );

      const notification = {
        id: Date.now(),
        message: 'Połączono z WebSocket',
        type: NotificationType.Success,
      };
      store.dispatch(addNotification(notification));
    };

    ws.onmessage = (event: MessageEvent) => {
      const payload = JSON.parse(event.data) as WebSocketPayloadData[];
      if (Array.isArray(payload)) {
        store.dispatch(receivedData(payload));
      }
    };

    ws.onerror = (event: Event) => {
      console.error('WebSocket error: ', event);

      const notification = {
        id: Date.now(),
        message: 'Wystąpił błąd WebSocket',
        type: NotificationType.Error,
      };
      store.dispatch(addNotification(notification));
    };

    ws.onclose = (event: CloseEvent) => {
      const notification = {
        id: Date.now(),
        message: 'WebSocket closed:',
        type: NotificationType.Info,
      };
      store.dispatch(addNotification(notification));
    };

    return () => {
      ws.close();
    };
  });
};

export function* handleWebSocket(): SagaIterator {
  const url = process.env.REACT_APP_WEBSOCKET_URL as string;
  const channel = process.env.REACT_APP_WEBSOCKET_CHANNEL as string;
  const symbol = process.env.REACT_APP_WEBSOCKET_SYMBOL as string;
  webSocketChannel = yield call(createWebSocketChannel, url, channel, symbol);

  try {
    while (true) {
      const payload = yield take(webSocketChannel as any);
      yield put(receivedData(payload));
    }
  } catch (error) {
    console.error('WebSocket error: ', error);

    const notification = {
      id: Date.now(),
      message: 'Wystąpił błąd WebSocket',
      type: NotificationType.Error,
    };
    yield put(addNotification(notification));
  } finally {
    if (yield cancelled()) {
      webSocketChannel?.close();
    }
  }
}

function* handleStopWebSocket(): SagaIterator {
  if (webSocketChannel) {
    webSocketChannel.close();
    webSocketChannel = null;
  }
}

export function* watchWebSocketConnection(): SagaIterator {
  yield takeLatest(
    WebSocketActionTypes.START_WEBSOCKET_CONNECTION,
    handleWebSocket,
  );
  yield takeLatest(
    WebSocketActionTypes.STOP_WEBSOCKET_CONNECTION,
    handleStopWebSocket,
  );
}

export default function* rootSaga(): SagaIterator {
  const webSocketTask = yield fork(watchWebSocketConnection);

  yield take('DISCONNECT');
  yield cancel(webSocketTask);
}
