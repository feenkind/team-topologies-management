import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

interface INavItemProps {
  label: string;
  url: string;
  active: boolean;
}

const NavItem: React.FC<INavItemProps> = ({
  label,
  url,
  active,
}: INavItemProps) => {
  return (
    <Typography
      component={Link}
      to={url}
      variant="button"
      sx={{
        color: active ? 'primary.main' : 'primary.dark',
        textDecoration: 'none',
        px: 3,
      }}
    >
      <Button sx={{ backgroundColor: active ? 'rgba(0, 96, 100, 0.1)' : '' }}>
        {label}
      </Button>
    </Typography>
  );
};

export default NavItem;
