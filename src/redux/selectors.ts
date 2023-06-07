import { createSelector } from 'reselect';
import { WebSocketState } from './realtimeData/types';

const selectWebSocketState = (state: { wss: WebSocketState }) => state.wss;

export const selectWebSocketData = createSelector(
  selectWebSocketState,
  (wss: WebSocketState) => {
    return wss.data.map((item) => ({
      price: formatValue(item[0]),
      count: formatValue(item[1]),
      amount: item[2],
      total: formatValue(Number(item[0]) * Math.abs(Number(item[2]))),
      percent:
        Math.abs((Number(item[0]) * Math.abs(Number(item[2]))) / item[0]) * 100,
    }));
  },
);

const formatValue = (value: number) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '';
  }

  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  });
};

export const selectWebSocketActive = createSelector(
  selectWebSocketState,
  (wss: WebSocketState) => wss.active,
);
