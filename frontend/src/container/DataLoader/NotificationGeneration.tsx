import * as React from 'react';
import { addNotification } from '../../store/slices/notificationSlice';
import {
  notificationArea,
  notificationType,
} from '../../constants/notifications';
import { useAppDispatch } from '../../hooks';

const NotificationGeneration: React.FC = () => {
  const dispatch = useAppDispatch();

  dispatch(
    addNotification({
      id: new Date().toString(),
      type: notificationType.REMINDER,
      area: notificationArea.DOMAIN,
      summary: 'Generic reminder',
      reason: 'Regulary check your domains',
      date: new Date().toDateString(),
      read: false,
    }),
  );

  return <></>;
};

export default NotificationGeneration;
