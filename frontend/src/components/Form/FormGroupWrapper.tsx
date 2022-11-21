import * as React from 'react';
import { Paper, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

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
        backgroundColor: grey[50],
        p: 2,
        my: 3,
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
          backgroundColor: grey[50],
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
