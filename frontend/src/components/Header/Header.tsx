import * as React from 'react';
import { Box } from '@mui/material';
import {
  headerMenuItemLabels,
  headerMenuItems,
} from '../../constants/navigationTypes';
import UserMenu from './UserMenu';
import Notifications from './Notifications';
import NavItem from './NavItem';

interface IHeaderProps {
  activeMenuItem?: headerMenuItems;
}

const Header: React.FC<IHeaderProps> = ({ activeMenuItem }: IHeaderProps) => {
  const navItems = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        px: 3,
      }}
    >
      <NavItem
        label={headerMenuItemLabels[headerMenuItems.DASHBOARD]}
        url="/"
        active={activeMenuItem === headerMenuItems.DASHBOARD}
      />
      <NavItem
        label={headerMenuItemLabels[headerMenuItems.PROJECTS]}
        url="/projects"
        active={activeMenuItem === headerMenuItems.PROJECTS}
      />
      <NavItem
        label={headerMenuItemLabels[headerMenuItems.TEAMS]}
        url="/teams"
        active={activeMenuItem === headerMenuItems.TEAMS}
      />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {navItems}
      <Notifications />
      <UserMenu />
    </Box>
  );
};

export default Header;
