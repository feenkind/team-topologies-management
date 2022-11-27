import { amber, deepOrange, lightGreen } from '@mui/material/colors';

export enum complexity {
  SIMPLE = 'simple',
  COMPLICATED = 'complicated',
  COMPLEX = 'complex',
}

export const complexityColor = {
  [complexity.SIMPLE]: lightGreen[300],
  [complexity.COMPLICATED]: amber[400],
  [complexity.COMPLEX]: deepOrange[300],
};
