import * as React from 'react';
import { useAppSelector } from '../../hooks';
import Notifications from '../../components/Header/Notifications';

const NotificationMenu: React.FC = () => {
  const unreadNotifications = useAppSelector((state) =>
    state.notification.notifications.filter(
      (notification) => !notification.read,
    ),
  );

  return (
    <Notifications
      notificationItems={unreadNotifications.map((notification) => ({
        id: notification.id,
        type: notification.type,
        area: notification.area,
        summary: notification.summary,
      }))}
    />
  );
};

export default NotificationMenu;
