import * as React from 'react';
import { Typography } from '@mui/material';

interface IPageHeadlineProps {
  text: string;
}

const PageHeadline: React.FC<IPageHeadlineProps> = ({
  text,
}: IPageHeadlineProps) => {
  return (
    <Typography component="h1" variant="h6" marginBottom={3}>
      {text}
    </Typography>
  );
};

export default PageHeadline;
