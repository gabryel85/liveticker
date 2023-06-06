import {
  ADD_NOTIFICATION,
  AddNotificationAction,
  Notification,
  REMOVE_NOTIFICATION,
  RemoveNotificationAction,
} from './types';

export const addNotification = (
  notification: Notification,
): AddNotificationAction => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});

export const removeNotification = (id: number): RemoveNotificationAction => ({
  type: REMOVE_NOTIFICATION,
  payload: id,
});
