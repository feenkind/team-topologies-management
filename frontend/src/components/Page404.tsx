import * as React from 'react';
import { Typography } from '@mui/material';
import PageHeadline from './PageHeadline';

const Page404: React.FC = () => {
  return (
    <>
      <PageHeadline text="So sorry..." />
      <Typography component="div" variant="body1">
        The page you are looking for does not exist.
      </Typography>
    </>
  );
};

export default Page404;
