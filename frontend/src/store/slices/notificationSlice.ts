import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  notificationArea,
  notificationType,
} from '../../constants/notifications';
import { INotificationImport } from '../../types/notificationTypes';

interface INotification {
  id: string;
  type: notificationType;
  area: notificationArea;
  summary: string;
  reason: string;
  date: string;
  read: boolean;
}

interface IInitialState {
  notifications: INotification[];
}

export const initialState: IInitialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    markRead: (state, { payload }: PayloadAction<string>) => {
      state.notifications.forEach((notification) => {
        if (notification.id === payload) {
          notification.read = true;
          return;
        }
      });
    },

    addAllNotifications: (
      state,
      { payload }: PayloadAction<INotificationImport[]>,
    ) => {
      state.notifications = payload.map((notification) => ({
        id: notification.id,
        type: notification.type,
        area: notification.area,
        summary: notification.summary,
        reason: notification.reason,
        date: notification.createdAt,
        read: notification.read,
      }));
    },

    addNotification: (
      state,
      { payload }: PayloadAction<INotificationImport>,
    ) => {
      state.notifications = [
        ...state.notifications,
        {
          id: payload.id,
          type: payload.type,
          area: payload.area,
          summary: payload.summary,
          reason: payload.reason,
          date: payload.createdAt,
          read: payload.read,
        },
      ];
    },
  },
});

export const notificationReducer = notificationSlice.reducer;
export const { markRead, addNotification, addAllNotifications } =
  notificationSlice.actions;
