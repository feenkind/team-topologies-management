import * as React from 'react';
import { useState } from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import Table from '../../components/Table/Table';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Alert, IconButton, Typography } from '@mui/material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { markRead } from '../../store/slices/notificationSlice';
import axiosInstance from '../../axios';
import { notificationArea as notificationAreaEnum } from '../../types/notificationTypes';

const NotificationList: React.FC = () => {
  const notifications = useAppSelector(
    (state) => state.notification.notifications,
  );
  const dispatch = useAppDispatch();
  const [networkError, setNetworkError] = useState<boolean>(false);

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
      {networkError && (
        <Alert severity="error">
          Due to network issues the notification could not be marked as read.
        </Alert>
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

          // display area correctly
          let areaDisplay =
            notification.area.toString().charAt(0).toUpperCase() +
            notification.area.toString().slice(1);
          if (notification.area === notificationAreaEnum.TEAM_INTERACTIONS) {
            areaDisplay = 'Team interactions';
          }
          // display type correctly
          const typeDisplay =
            notification.type.toString().charAt(0).toUpperCase() +
            notification.type.toString().slice(1);

          return [
            <Typography key={notification.id} variant={variant} color={color}>
              {typeDisplay}
            </Typography>,
            <Typography key={notification.id} variant={variant} color={color}>
              {areaDisplay}
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
                axiosInstance
                  .patch(`/notifications/${notification.id}/read`)
                  .then(() => {
                    dispatch(markRead(notification.id));
                    setNetworkError(false);
                  })
                  .catch(() => setNetworkError(true));
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
