import * as React from 'react';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { yellow } from '@mui/material/colors';
import Face4SharpIcon from '@mui/icons-material/Face4Sharp';

const UserMenu: React.FC = () => {
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
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
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
    </>
  );
};

export default UserMenu;
