import * as React from 'react';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Face4SharpIcon from '@mui/icons-material/Face4Sharp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { yellow } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(
    null,
  );
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const NavItem = ({ label, url }: { label: string; url: string }) => (
    <Typography
      component={Link}
      to={url}
      variant="button"
      sx={{
        color: 'primary.dark',
        '&:hover': {
          color: 'primary.light',
        },
        textDecoration: 'none',
        px: 3,
      }}
    >
      {label}
    </Typography>
  );

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',

            px: 3,
          }}
        >
          <NavItem label="Dashboard" url="/" />
          <NavItem label="Projects" url="/projects" />
          <NavItem label="Teams" url="/teams" />
        </Box>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          sx={{ mr: 2, borderRadius: 0 }}
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          sx={{ borderRadius: 0 }}
        >
          <Avatar sx={{ bgcolor: yellow[900] }}>
            <Face4SharpIcon />
          </Avatar>
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
          <MenuItem onClick={handleClose}>This is a dummy account.</MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default Header;
