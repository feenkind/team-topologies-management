import * as React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

interface INavButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const SidebarNavButton: React.FC<INavButtonProps> = ({
  label,
  onClick,
  icon,
}: INavButtonProps) => {
  return (
    <ListItem
      onClick={onClick}
      sx={{ color: 'primary.contrastText' }}
      disablePadding
    >
      <ListItemButton
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

export default SidebarNavButton;
