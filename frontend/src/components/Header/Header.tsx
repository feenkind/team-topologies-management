import * as React from 'react';
import { Box } from '@mui/material';
import UserMenu from './UserMenu';

interface IHeaderProps {
  navigation: React.ReactNode;
  notifications: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = ({
  navigation,
  notifications,
}: IHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {navigation}
      {notifications}
      <UserMenu />
    </Box>
  );
};

export default Header;
