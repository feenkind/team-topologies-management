import * as React from 'react';
import { Divider, Grid, Paper, Typography } from '@mui/material';

interface IContentVisualizationProps {
  children: React.ReactNode | React.ReactNode[];
  keys?: [];
}

const ContentVisualization: React.FC<IContentVisualizationProps> = ({
  children,
  keys,
}: IContentVisualizationProps) => {
  const keyBox = (
    <Paper sx={{ backgroundColor: 'grey.100', py: 3, px: 2 }}>
      <Typography
        variant="subtitle1"
        component="h2"
        align="center"
        sx={{ textTransform: 'uppercase' }}
      >
        Keys
      </Typography>
      <Divider variant="middle" sx={{ my: 2 }} />
      Here will be keys
    </Paper>
  );

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={10}>
        {children}
      </Grid>
      <Grid item xs={12} md={2}>
        {keyBox}
      </Grid>
    </Grid>
  );
};

export default ContentVisualization;
