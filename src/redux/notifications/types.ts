export const ADD_NOTIFICATION = '[notifications] - ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = '[notifications] - REMOVE_NOTIFICATION';

export enum NotificationType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

export interface AddNotificationAction {
  type: typeof ADD_NOTIFICATION;
  payload: Notification;
}

export interface RemoveNotificationAction {
  type: typeof REMOVE_NOTIFICATION;
  payload: number;
}

export type NotificationAction =
  | AddNotificationAction
  | RemoveNotificationAction;
