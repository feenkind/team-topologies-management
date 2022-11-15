import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import Table from '../../components/Table/Table';
import { useAppSelector } from '../../hooks';
import { Alert, Typography } from '@mui/material';
import { notificationType } from '../../constants/notifications';

const NotificationList: React.FC = () => {
  const notifications = useAppSelector(
    (state) => state.notification.notifications,
  );

  // sort by date, copy first because array directly from store is immutable
  const sortedNotifications = notifications
    .slice()
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <>
      <PageHeadline text="Notifications" />
      {notifications.length === 0 && (
        <Alert severity="info">There are no notifications to display.</Alert>
      )}
      <Table
        headerItems={['Type', 'Area', 'Summary', 'Notification reason', 'Date']}
        headerItemWidthsInPercentage={[15, 20, 25, 25, 15]}
        contentItems={sortedNotifications.map((notification) => {
          const variant =
            notification.type === notificationType.WARNING
              ? 'subtitle2'
              : 'body2';
          const color =
            notification.type === notificationType.WARNING
              ? 'text.primary'
              : 'text.secondary';

          return [
            <Typography key={notification.id} variant={variant} color={color}>
              {notification.type}
            </Typography>,
            <Typography key={notification.id} variant={variant} color={color}>
              {notification.area}
            </Typography>,
            <Typography key={notification.id} variant={variant} color={color}>
              {notification.summary}
            </Typography>,
            <Typography key={notification.id} variant={variant} color={color}>
              {notification.reason}
            </Typography>,
            <Typography key={notification.id} variant={variant} color={color}>
              {notification.date.toLocaleDateString('en-GB')}
            </Typography>,
          ];
        })}
      />
    </>
  );
};

export default NotificationList;
