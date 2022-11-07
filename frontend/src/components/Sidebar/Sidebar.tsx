import * as React from 'react';
import { Divider, List, Toolbar, Typography } from '@mui/material';
import WysiwygSharpIcon from '@mui/icons-material/WysiwygSharp';
import BubbleChartSharpIcon from '@mui/icons-material/BubbleChartSharp';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import DomainSharpIcon from '@mui/icons-material/DomainSharp';
import DomainAddSharpIcon from '@mui/icons-material/DomainAddSharp';
import {
  sidebarMenuItemLabels,
  sidebarMenuItems,
} from '../../constants/navigationTypes';
import SidebarNavItem from './SidebarNavItem';
import SidebarNavHeadline from './SidebarNavHeadline';

interface ISidebarProps {
  activeMenuItem?: sidebarMenuItems;
  currentProjectId: string;
  projectSelect: React.ReactNode;
}

const Sidebar: React.FC<ISidebarProps> = ({
  activeMenuItem,
  currentProjectId,
  projectSelect,
}: ISidebarProps) => {
  const logo = (
    <Toolbar sx={{ alignSelf: 'center' }}>
      <Typography variant="h5">TmwTT</Typography>
    </Toolbar>
  );

  return (
    <>
      {logo}
      {projectSelect}
      <List>
        <SidebarNavItem
          icon={<WysiwygSharpIcon />}
          label={sidebarMenuItemLabels[sidebarMenuItems.OVERVIEW]}
          url={`/project/${currentProjectId}`}
          active={activeMenuItem === sidebarMenuItems.OVERVIEW}
        />
        <SidebarNavItem
          icon={<BubbleChartSharpIcon />}
          label={sidebarMenuItemLabels[sidebarMenuItems.VISUALIZATION]}
          url="/"
          active={activeMenuItem === sidebarMenuItems.VISUALIZATION}
        />
      </List>

      <Divider sx={{ backgroundColor: 'background.paper' }} />

      <List>
        <SidebarNavHeadline text="Teams" />
        <SidebarNavItem
          icon={<GroupsSharpIcon />}
          label={sidebarMenuItemLabels[sidebarMenuItems.VIEW_TEAMS]}
          url="/"
          active={activeMenuItem === sidebarMenuItems.VIEW_TEAMS}
        />
        <SidebarNavItem
          icon={<GroupAddSharpIcon />}
          label={sidebarMenuItemLabels[sidebarMenuItems.ADD_TEAM]}
          url="/"
          active={activeMenuItem === sidebarMenuItems.ADD_TEAM}
        />
      </List>

      <Divider sx={{ backgroundColor: 'background.paper' }} />

      <List>
        <SidebarNavHeadline text="Domains" />
        <SidebarNavItem
          icon={<DomainSharpIcon />}
          label={sidebarMenuItemLabels[sidebarMenuItems.VIEW_DOMAINS]}
          url="/"
          active={activeMenuItem === sidebarMenuItems.VIEW_DOMAINS}
        />
        <SidebarNavItem
          icon={<DomainAddSharpIcon />}
          label={sidebarMenuItemLabels[sidebarMenuItems.ADD_DOMAIN]}
          url="/"
          active={activeMenuItem === sidebarMenuItems.ADD_DOMAIN}
        />
      </List>
    </>
  );
};

export default Sidebar;
