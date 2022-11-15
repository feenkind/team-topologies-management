import * as React from 'react';
import { Box } from '@mui/material';
import {
  headerMenuItemLabels,
  headerMenuItems,
} from '../../constants/navigation';
import HeaderNavItem from './HeaderNavItem';

interface IHeaderNavigationProps {
  activeMenuItem?: headerMenuItems;
}

const HeaderNavigation: React.FC<IHeaderNavigationProps> = ({
  activeMenuItem,
}: IHeaderNavigationProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        px: 3,
      }}
    >
      <HeaderNavItem
        label={headerMenuItemLabels[headerMenuItems.DASHBOARD]}
        url="/"
        active={activeMenuItem === headerMenuItems.DASHBOARD}
      />
      <HeaderNavItem
        label={headerMenuItemLabels[headerMenuItems.PROJECTS]}
        url="/projects"
        active={activeMenuItem === headerMenuItems.PROJECTS}
      />
      <HeaderNavItem
        label={headerMenuItemLabels[headerMenuItems.TEAMS]}
        url="/teams"
        active={activeMenuItem === headerMenuItems.TEAMS}
      />
    </Box>
  );
};

export default HeaderNavigation;
