import { createSelector } from 'reselect';
import { WebSocketState } from './realtimeData/types';

const selectWebSocketState = (state: { wss: WebSocketState }) => state.wss;

export const selectWebSocketData = createSelector(
  selectWebSocketState,
  (wss: WebSocketState) => wss.data,
);

export const selectWebSocketActive = createSelector(
  selectWebSocketState,
  (wss: WebSocketState) => wss.active,
);
