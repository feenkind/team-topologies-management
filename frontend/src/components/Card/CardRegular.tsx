import * as React from 'react';
import { Card } from '@mui/material';

interface ICardRegular {
  children: React.ReactNode | React.ReactNode[];
}

const CardRegular: React.FC<ICardRegular> = ({ children }: ICardRegular) => {
  return (
    <Card sx={{ backgroundColor: 'secondary.main', p: 1 }} elevation={4}>
      {children}
    </Card>
  );
};

export default CardRegular;
