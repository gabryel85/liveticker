import { Reducer } from 'redux';
import {
  Notification,
  NotificationAction,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from './types';

export type NotificationsState = Array<Notification>;

const initialState: NotificationsState = [];

export const notificationsReducer: Reducer<
  NotificationsState,
  NotificationAction
> = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.payload];

    case REMOVE_NOTIFICATION:
      return state.filter((notification) => notification.id !== action.payload);
    default:
      return state;
  }
};
