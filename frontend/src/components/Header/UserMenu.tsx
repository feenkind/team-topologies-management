import * as React from 'react';
import { Avatar, IconButton, ListItem, Menu, MenuItem } from '@mui/material';
import { yellow } from '@mui/material/colors';
import Face4SharpIcon from '@mui/icons-material/Face4Sharp';
import LogoutIcon from '@mui/icons-material/Logout';

interface IUserMenuProps {
  logoutAction: () => void;
}

const UserMenu: React.FC<IUserMenuProps> = ({
  logoutAction,
}: IUserMenuProps) => {
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
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(0, 96, 100, 0.04)',
          },
        }}
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
        <ListItem sx={{ p: 2 }} divider>
          This is a dummy account.
        </ListItem>
        <MenuItem
          sx={{ pt: 2, pb: 1, px: 2 }}
          onClick={() => {
            logoutAction();
            handleClose();
          }}
        >
          <LogoutIcon /> Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
