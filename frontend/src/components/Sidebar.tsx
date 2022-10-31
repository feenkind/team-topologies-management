import * as React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import WysiwygSharpIcon from '@mui/icons-material/WysiwygSharp';
import BubbleChartSharpIcon from '@mui/icons-material/BubbleChartSharp';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import DomainSharpIcon from '@mui/icons-material/DomainSharp';
import DomainAddSharpIcon from '@mui/icons-material/DomainAddSharp';
import { sidebarMenuItemLabels, sidebarMenuItems } from '../constants/navItems';

interface ISidebarProps {
  activeMenuItem?: sidebarMenuItems;
}

const MenuItem = ({
  icon,
  label,
  selected,
}: {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
}) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={selected}
        sx={{
          '&&.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
          '&&.Mui-selected:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
          '&&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <ListItemIcon sx={{ color: 'primary.contrastText' }}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};

const Sidebar: React.FC<ISidebarProps> = ({
  activeMenuItem,
}: ISidebarProps) => {
  return (
    <>
      <Toolbar sx={{ alignSelf: 'center' }}>
        <Typography variant="h5">TmwTT</Typography>
      </Toolbar>
      <List>
        <MenuItem
          icon={<WysiwygSharpIcon />}
          label={sidebarMenuItemLabels[sidebarMenuItems.OVERVIEW]}
          selected={activeMenuItem === sidebarMenuItems.OVERVIEW}
        />
        <MenuItem
          icon={<BubbleChartSharpIcon />}
          label={sidebarMenuItemLabels[sidebarMenuItems.VISUALIZATION]}
          selected={activeMenuItem === sidebarMenuItems.VISUALIZATION}
        />
      </List>
      <Divider sx={{ backgroundColor: 'background.paper' }} />
      <List>
        <ListItemButton disabled={true}>
          <ListItemText>
            <Typography variant="button">Teams</Typography>
          </ListItemText>
        </ListItemButton>

        <MenuItem
          icon={<GroupsSharpIcon />}
          label={sidebarMenuItemLabels[sidebarMenuItems.VIEW_TEAMS]}
          selected={activeMenuItem === sidebarMenuItems.VIEW_TEAMS}
        />
        <MenuItem
          icon={<GroupAddSharpIcon />}
          label={sidebarMenuItemLabels[sidebarMenuItems.ADD_TEAM]}
          selected={activeMenuItem === sidebarMenuItems.ADD_TEAM}
        />
      </List>
      <Divider sx={{ backgroundColor: 'background.paper' }} />
      <List>
        <ListItemButton disabled={true}>
          <ListItemText>
            <Typography variant="button">Domains</Typography>
          </ListItemText>
        </ListItemButton>

        <MenuItem
          icon={<DomainSharpIcon />}
          label={sidebarMenuItemLabels[sidebarMenuItems.VIEW_DOMAINS]}
          selected={activeMenuItem === sidebarMenuItems.VIEW_DOMAINS}
        />
        <MenuItem
          icon={<DomainAddSharpIcon />}
          label={sidebarMenuItemLabels[sidebarMenuItems.ADD_DOMAIN]}
          selected={activeMenuItem === sidebarMenuItems.ADD_DOMAIN}
        />
      </List>
    </>
  );
};

export default Sidebar;
