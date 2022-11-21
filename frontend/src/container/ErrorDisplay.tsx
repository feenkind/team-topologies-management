import * as React from 'react';
import { useAppSelector } from '../hooks';
import { Alert } from '@mui/material';

const ErrorDisplay: React.FC = () => {
  const isDataLoaded = useAppSelector((state) => state.global.isDataLoaded);
  return (
    <>
      {!isDataLoaded && (
        <Alert severity="error" sx={{ mb: 3 }}>
          The application data could not be loaded from the backend. Please try
          again later.
        </Alert>
      )}
    </>
  );
};

export default ErrorDisplay;
