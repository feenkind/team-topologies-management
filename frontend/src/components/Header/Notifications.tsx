import * as React from 'react';
import {
  Badge,
  Button,
  IconButton,
  ListItem,
  Menu,
  Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import {
  notificationArea,
  notificationType,
} from '../../constants/notifications';
import NotificationItem from './NotificationItem';

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
  // only display last 5
  const notificationsToDisplay = notificationItems.slice(0, 5);

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
        <Badge badgeContent={notificationItems.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        id="notification-menu"
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
        sx={{ mt: '40px', '& li': { maxWidth: '450px' } }}
      >
        {notificationItems.length === 0 && (
          <ListItem sx={{ p: 2 }} divider>
            <Typography>
              No new notifications. You can see older notifications by clicking
              the button below.
            </Typography>
          </ListItem>
        )}

        {notificationItems.length > 0 &&
          notificationsToDisplay.map((notification) => (
            <NotificationItem key={notification.id} item={notification} />
          ))}

        <ListItem sx={{ p: 2 }}>
          <Button
            component={Link}
            to="/notifications"
            fullWidth
            variant="contained"
            onClick={handleClose}
          >
            View all notification details
          </Button>
        </ListItem>
      </Menu>
    </>
  );
};

export default Notifications;
