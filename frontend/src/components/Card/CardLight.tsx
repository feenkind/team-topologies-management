import * as React from 'react';
import { Card } from '@mui/material';

interface ICardLight {
  children: React.ReactNode | React.ReactNode[];
}

const CardLight: React.FC<ICardLight> = ({ children }: ICardLight) => {
  return (
    <Card sx={{ backgroundColor: 'secondary.light', p: 1 }} elevation={4}>
      {children}
    </Card>
  );
};

export default CardLight;
