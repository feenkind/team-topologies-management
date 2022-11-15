import * as React from 'react';
import { Badge, Button, IconButton, Menu, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import {
  notificationArea,
  notificationType,
} from '../../constants/notifications';

export interface INotificationItem {
  id: string;
  type: notificationType;
  area: notificationArea;
  summary: string;
}

interface INotificationsProps {
  notificationItems: INotificationItem[];
}

const Notifications: React.FC<INotificationsProps> = ({
  notificationItems,
}: INotificationsProps) => {
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(
    null,
  );
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="show new notifications"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        sx={{
          mr: 2,
          borderRadius: 0,
          '&:hover': {
            backgroundColor: 'rgba(0, 96, 100, 0.04)',
          },
        }}
      >
        <Badge badgeContent={1} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElement)}
        onClose={handleClose}
        sx={{ mt: '40px' }}
      >
        {notificationItems.length === 0 && (
          <Typography>
            No new notifications. You can see older notifications by clicking
            the button below.
          </Typography>
        )}
        <Button component={Link} to="">
          View all notifications
        </Button>
      </Menu>
    </>
  );
};

export default Notifications;
