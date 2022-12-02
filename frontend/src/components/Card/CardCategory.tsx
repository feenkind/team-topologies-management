import * as React from 'react';
import { Typography } from '@mui/material';

interface ICardCategory {
  children: React.ReactNode | React.ReactNode[];
}

const CardCategory: React.FC<ICardCategory> = ({ children }: ICardCategory) => {
  return (
    <Typography variant="overline" color="text.secondary" gutterBottom>
      {children}
    </Typography>
  );
};

export default CardCategory;
