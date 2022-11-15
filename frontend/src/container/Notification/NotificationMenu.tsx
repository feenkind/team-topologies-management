import * as React from 'react';
import { useAppSelector } from '../../hooks';
import Notifications from '../../components/Header/Notifications';

const NotificationMenu: React.FC = () => {
  const unreadNotifications = useAppSelector((state) =>
    state.notification.notifications.filter(
      (notification) => !notification.read,
    ),
  );

  return <Notifications notificationItems={[]} />;
};

export default NotificationMenu;
