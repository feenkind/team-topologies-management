import * as React from 'react';
import { Divider, Grid, Paper, Typography } from '@mui/material';

interface IContentWithHintsProps {
  children: React.ReactNode | React.ReactNode[];
}

const ContentWithHints: React.FC<IContentWithHintsProps> = ({
  children,
}: IContentWithHintsProps) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={9}>
        {children}
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ backgroundColor: 'secondary.light', p: 3 }}>
          <Typography
            variant="subtitle1"
            component="h2"
            align="center"
            sx={{ textTransform: 'uppercase' }}
          >
            Useful hints
          </Typography>
          <Divider variant="middle" />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ContentWithHints;
