import * as React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import WysiwygSharpIcon from '@mui/icons-material/WysiwygSharp';
import BubbleChartSharpIcon from '@mui/icons-material/BubbleChartSharp';

interface ISidebarProps {
  activeMenuItem?: string;
}

const Sidebar: React.FC<ISidebarProps> = ({
  activeMenuItem,
}: ISidebarProps) => {
  return (
    <>
      <Toolbar />
      <Divider sx={{ backgroundColor: 'primary.contrastText' }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton selected={true}>
            <ListItemIcon sx={{ color: 'primary.contrastText' }}>
              <WysiwygSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Project Overview" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'primary.contrastText' }}>
              <BubbleChartSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Visualization" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ backgroundColor: 'primary.contrastText' }} />
    </>
  );
};

export default Sidebar;
