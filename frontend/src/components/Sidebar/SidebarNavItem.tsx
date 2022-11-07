import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

interface INavItemProps {
  label: string;
  url: string;
  active: boolean;
  icon: React.ReactNode;
}

const SidebarNavItem: React.FC<INavItemProps> = ({
  label,
  url,
  active,
  icon,
}: INavItemProps) => {
  return (
    <ListItem
      component={Link}
      to={url}
      sx={{ color: 'primary.contrastText' }}
      disablePadding
    >
      <ListItemButton
        selected={active}
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

export default SidebarNavItem;
