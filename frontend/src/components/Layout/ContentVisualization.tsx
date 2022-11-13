import * as React from 'react';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';

export interface ILegend {
  element: React.ReactNode;
  description: string;
}
interface IContentVisualizationProps {
  children: React.ReactNode | React.ReactNode[];
  legend?: ILegend[];
}

const ContentVisualization: React.FC<IContentVisualizationProps> = ({
  children,
  legend,
}: IContentVisualizationProps) => {
  const legendBox = (
    <Paper sx={{ backgroundColor: 'grey.100', py: 3, px: 2 }}>
      <Typography
        variant="subtitle1"
        component="h2"
        align="center"
        sx={{ textTransform: 'uppercase' }}
      >
        Legend
      </Typography>
      <Divider variant="middle" sx={{ my: 2 }} />
      {legend?.map((legendItem, index) => (
        <Box
          key={`key${index}`}
          paddingY={2}
          textAlign="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          {legendItem.element}
          <Typography variant="body2" paddingTop={1}>
            {legendItem.description}
          </Typography>
        </Box>
      ))}
    </Paper>
  );

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={10}>
        {children}
      </Grid>
      <Grid item xs={12} md={2}>
        {legendBox}
      </Grid>
    </Grid>
  );
};

export default ContentVisualization;
