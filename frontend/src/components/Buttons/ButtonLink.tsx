import * as React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface ITableLinkButtonProps {
  label: string;
  url: string;
}

const ButtonLink: React.FC<ITableLinkButtonProps> = ({
  label,
  url,
}: ITableLinkButtonProps) => {
  return (
    <Button
      component={Link}
      to={url}
      size="small"
      variant="outlined"
      sx={{ m: 0.5, backgroundColor: 'secondary.main' }}
    >
      {label}
    </Button>
  );
};

export default ButtonLink;
