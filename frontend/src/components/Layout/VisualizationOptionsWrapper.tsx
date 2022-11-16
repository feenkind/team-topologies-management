import * as React from 'react';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';

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
        justifyContent: 'center',
        display: 'flex',
        p: 0.5,
        backgroundColor: grey[50],
      }}
    >
      {children}
    </Box>
  );
};

export default VisualizationOptionsWrapper;
