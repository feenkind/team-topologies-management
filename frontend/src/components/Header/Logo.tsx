import * as React from 'react';
import { Toolbar, Typography } from '@mui/material';

const Logo: React.FC = () => {
  return (
    <Toolbar sx={{ alignSelf: 'center' }}>
      <Typography variant="h5">TmwTT</Typography>
    </Toolbar>
  );
};

export default Logo;
