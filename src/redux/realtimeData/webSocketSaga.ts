import axios from 'axios';
import HmacSHA384 from 'crypto-js/hmac-sha384';
import Hex from 'crypto-js/enc-hex';
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

function handleWebSocketError(error: unknown, message: string) {
  console.error('WebSocket error: ', error);

  const notification = {
    id: Date.now(),
    message,
    type: NotificationType.Error,
  };

  store.dispatch(addNotification(notification));
}

export const createWebSocketChannel = (
  url: string,
  channel: string,
  symbol: string,
): EventChannel<WebSocketPayloadData[]> => {
  return eventChannel((emitter) => {
    const ws = new WebSocket(url);
    ws.onopen = () => {
      ws.send(JSON.stringify({ event: 'subscribe', channel, symbol }));

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

    ws.onerror = (event: Event) =>
      handleWebSocketError(event, 'Wystąpił błąd WebSocket');
    ws.onclose = (event: CloseEvent) =>
      handleWebSocketError(event, 'WebSocket closed:');

    return () => {
      ws.close();
    };
  });
};

export function* handleWebSocket(): SagaIterator {
  const url = process.env.REACT_APP_WEBSOCKET_URL as string;
  const channel = process.env.REACT_APP_WEBSOCKET_CHANNEL as string;
  const symbol = process.env.REACT_APP_WEBSOCKET_SYMBOL as string;

  if (store.getState().wss.data.length === 0) {
    yield call(fetchInitialData, symbol, 'PO');
  }

  webSocketChannel = yield call(createWebSocketChannel, url, channel, symbol);

  try {
    while (true) {
      const payload = yield take(webSocketChannel as any);
      yield put(receivedData(payload));
    }
  } catch (error) {
    handleWebSocketError(error, 'Wystąpił błąd WebSocket');
  } finally {
    if (yield cancelled()) {
      webSocketChannel?.close();
    }
  }
}

export function* fetchInitialData(
  symbol: string,
  precision: string,
): SagaIterator {
  const apiKey = process.env.REACT_APP_API_KEY as string;
  const apiSecret = process.env.REACT_APP_API_SECRET as string;

  const nonce = (Date.now() * 1000).toString();

  const apiPath = `v2/book/${symbol}/${precision}?len=50`;
  const signaturePayload = `GET/api/${apiPath}${nonce}`;
  const signature = HmacSHA384(signaturePayload, apiSecret).toString(Hex);

  const url = `https://api-pub.bitfinex.com/${apiPath}`;

  try {
    const response = yield call(axios.get, url, {
      headers: {
        'Content-Type': 'application/json',
        'bfx-nonce': nonce,
        'bfx-apikey': apiKey,
        'bfx-signature': signature,
      },
    });

    if (response.status === 200) {
      yield put(receivedData(response.data));
    } else {
      const notification = {
        id: Date.now(),
        message:
          'Error fetching data: ' + response.status + ' ' + response.statusText,
        type: NotificationType.Error,
      };
      yield put(addNotification(notification));
    }
  } catch (error) {
    const notification = {
      id: Date.now(),
      message: 'Error fetching data: ' + error,
      type: NotificationType.Error,
    };
    yield put(addNotification(notification));
  }
}

export function* handleStopWebSocket(): SagaIterator {
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
