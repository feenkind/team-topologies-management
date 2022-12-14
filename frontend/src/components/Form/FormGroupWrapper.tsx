import * as React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

interface IFormGroupWrapperProps {
  caption: string;
  children: React.ReactNode | React.ReactNode[];
}

const FormGroupWrapper: React.FC<IFormGroupWrapperProps> = ({
  caption,
  children,
}: IFormGroupWrapperProps) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        backgroundColor: 'white',
        px: 2,
        py: 3,
        my: 4,
        position: 'relative',
      }}
    >
      <Typography
        variant="overline"
        component="div"
        sx={{
          fontSize: '12px',
          lineHeight: 1,
          position: 'absolute',
          top: '-12px',
          px: 1,
          py: 0.5,
          backgroundColor: 'white',
          borderRadius: 1,
        }}
      >
        {caption}
      </Typography>
      <Grid container spacing={2}>
        {children}
      </Grid>
    </Paper>
  );
};

export default FormGroupWrapper;
