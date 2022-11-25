import * as React from 'react';
import { Paper, Typography } from '@mui/material';

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
        p: 2,
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
      {children}
    </Paper>
  );
};

export default FormGroupWrapper;
