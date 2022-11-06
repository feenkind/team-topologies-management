import * as React from 'react';
import { Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Notifications: React.FC = () => {
  return (
    <IconButton
      size="large"
      aria-label="show 17 new notifications"
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
  );
};

export default Notifications;
