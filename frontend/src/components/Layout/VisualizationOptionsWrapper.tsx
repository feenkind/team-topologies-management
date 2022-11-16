import * as React from 'react';
import { Box, Divider } from '@mui/material';

interface IVisualizationOptionsWrapperProps {
  children: React.ReactNode | React.ReactNode[];
}

const VisualizationOptionsWrapper: React.FC<
  IVisualizationOptionsWrapperProps
> = ({ children }: IVisualizationOptionsWrapperProps) => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        //justifyContent: 'center',
        display: 'flex',
        p: 0.5,
        mb: 2,
      }}
    >
      <Divider />
      {children}
    </Box>
  );
};

export default VisualizationOptionsWrapper;
