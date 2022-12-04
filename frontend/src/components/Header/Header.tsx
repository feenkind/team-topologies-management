import * as React from 'react';
import { Box } from '@mui/material';
import UserMenu from './UserMenu';

interface IHeaderProps {
  navigation: React.ReactNode;
  notifications: React.ReactNode;
  logoutAction: () => void;
}

const Header: React.FC<IHeaderProps> = ({
  navigation,
  notifications,
  logoutAction,
}: IHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {navigation}
      {notifications}
      <UserMenu logoutAction={logoutAction} />
    </Box>
  );
};

export default Header;
