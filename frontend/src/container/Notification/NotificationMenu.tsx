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
      notificationItems={unreadNotifications
        // sort by date
        .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
        .map((notification) => ({
          id: notification.id,
          type: notification.type,
          area: notification.area,
          summary: notification.summary,
        }))}
    />
  );
};

export default NotificationMenu;
