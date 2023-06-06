export interface WebSocketState {
  data: WebSocketPayloadData[];
  active: boolean;
  error: string | null;
}

export type WebSocketPayloadData = Array<number>;

export const ActionTypes = {
  RECEIVED_DATA: 'RECEIVED_DATA',
  WEBSOCKET_ERROR: 'WEBSOCKET_ERROR',
  START_WEBSOCKET_CONNECTION: 'START_WEBSOCKET_CONNECTION',
  STOP_WEBSOCKET_CONNECTION: 'STOP_WEBSOCKET_CONNECTION',
} as const;

export interface ReceivedDataAction {
  type: typeof ActionTypes.RECEIVED_DATA;
  payload: any | undefined;
}

export interface WebSocketErrorAction {
  type: typeof ActionTypes.WEBSOCKET_ERROR;
  payload: string;
}

export type WebSocketAction =
  | ReceivedDataAction
  | WebSocketErrorAction
  | StartWebSocketConnectionAction
  | StopWebSocketConnectionAction;

export const initialState: WebSocketState = {
  data: [],
  active: false,
  error: null,
};

export enum WebSocketActionTypes {
  START_WEBSOCKET_CONNECTION = 'START_WEBSOCKET_CONNECTION',
  STOP_WEBSOCKET_CONNECTION = 'STOP_WEBSOCKET_CONNECTION',
}

export interface StartWebSocketConnectionAction {
  type: WebSocketActionTypes.START_WEBSOCKET_CONNECTION;
}

export interface StopWebSocketConnectionAction {
  type: WebSocketActionTypes.STOP_WEBSOCKET_CONNECTION;
}

export type WebSocketConnectionAction =
  | StartWebSocketConnectionAction
  | StopWebSocketConnectionAction;
