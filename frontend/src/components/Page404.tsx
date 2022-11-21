import * as React from 'react';
import { Typography } from '@mui/material';
import PageHeadline from './Layout/PageHeadline';

interface IPage404Props {
  children?: React.ReactNode | React.ReactNode[];
}

const Page404: React.FC<IPage404Props> = ({ children }: IPage404Props) => {
  return (
    <>
      <PageHeadline text="So sorry..." />
      <Typography component="div" variant="body1">
        {children || 'The page you are looking for does not exist.'}
      </Typography>
    </>
  );
};

export default Page404;
