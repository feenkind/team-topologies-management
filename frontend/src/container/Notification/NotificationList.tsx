import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import Table from '../../components/Table/Table';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Alert, IconButton, Typography } from '@mui/material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { markRead } from '../../store/slices/notificationSlice';

const NotificationList: React.FC = () => {
  const notifications = useAppSelector(
    (state) => state.notification.notifications,
  );
  const dispatch = useAppDispatch();

  // sort by date, copy first because array directly from store is immutable
  const sortedNotifications = notifications
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return (
    <>
      <PageHeadline text="Notifications" />
      {notifications.length === 0 && (
        <Alert severity="info">There are no notifications to display.</Alert>
      )}
      <Table
        headerItems={[
          'Type',
          'Area',
          'Summary',
          'Notification reason',
          'Date',
          'Mark read',
        ]}
        headerItemWidthsInPercentage={[10, 20, 25, 25, 10, 10]}
        contentItems={sortedNotifications.map((notification) => {
          const variant = !notification.read ? 'subtitle2' : 'body2';
          const color = !notification.read ? 'text.primary' : 'text.secondary';

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
              {new Date(notification.date).toLocaleDateString('en-GB')}
            </Typography>,
            <IconButton
              key={notification.id}
              disabled={notification.read}
              onClick={() => {
                dispatch(markRead(notification.id));
              }}
            >
              <MarkEmailReadIcon />
            </IconButton>,
          ];
        })}
      />
    </>
  );
};

export default NotificationList;
