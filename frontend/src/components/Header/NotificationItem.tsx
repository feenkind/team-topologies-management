import * as React from 'react';
import { Box, ListItem, Typography } from '@mui/material';
import { INotificationItem } from './Notifications';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { notificationType } from '../../constants/notifications';

interface INotificationItemProps {
  item: INotificationItem;
}

const NotificationItem: React.FC<INotificationItemProps> = ({
  item,
}: INotificationItemProps) => {
  let notificationIcon = <InfoOutlinedIcon color="info" />;
  if (item.type === notificationType.REMINDER) {
    notificationIcon = <AccessAlarmOutlinedIcon color="info" />;
  }
  if (item.type === notificationType.WARNING) {
    notificationIcon = <WarningAmberOutlinedIcon color="warning" />;
  }

  return (
    <ListItem sx={{ p: 2 }} divider>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ mr: 2 }}>{notificationIcon}</Box>
        <Box>
          <Typography variant="overline" color="text.secondary">
            {`${item.type} for ${item.area}`}
          </Typography>
          <Typography variant="subtitle2">{item.summary}</Typography>
        </Box>
      </Box>
    </ListItem>
  );
};

export default NotificationItem;
