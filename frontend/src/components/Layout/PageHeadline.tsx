import * as React from 'react';
import { Box, Typography } from '@mui/material';

interface IPageHeadlineProps {
  text: string;
  children?: React.ReactNode | React.ReactNode[];
}

const PageHeadline: React.FC<IPageHeadlineProps> = ({
  text,
  children,
}: IPageHeadlineProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
      <Typography component="h1" variant="h6">
        {text}
      </Typography>
      {children}
    </Box>
  );
};

export default PageHeadline;
