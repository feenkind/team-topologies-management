import { amber, deepOrange, grey } from '@mui/material/colors';

export enum dependencyType {
  OK = 'ok',
  SLOWING = 'slowing',
  BLOCKING = 'blocking',
}

export const dependencyColor = {
  [dependencyType.OK]: grey[400],
  [dependencyType.SLOWING]: amber[600],
  [dependencyType.BLOCKING]: deepOrange[900],
};
