import * as React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface ITableLinkTextProps {
  label: string;
  url: string;
}

const TableLinkText: React.FC<ITableLinkTextProps> = ({
  label,
  url,
}: ITableLinkTextProps) => {
  return (
    <Typography
      component={Link}
      variant="body2"
      sx={{ textDecoration: 'none', color: 'inherit' }}
      to={url}
    >
      {label}
    </Typography>
  );
};

export default TableLinkText;
