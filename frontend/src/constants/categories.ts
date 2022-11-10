import { amber, deepOrange, grey } from '@mui/material/colors';

export enum complexity {
  SIMPLE = 'Simple',
  COMPLICATED = 'Complicated',
  COMPLEX = 'Complex',
}

export enum priority {
  GENERIC = 'Generic',
  SUPPORTING = 'Supporting',
  CORE = 'Core',
}

export enum teamTopology {
  STREAM_ALIGNED = 'Stream Aligned',
  ENABLING = 'Enabling',
  COMPLICATED_SUBSYSTEM = 'Complicated Subsystem',
  PLATFORM = 'Platform',
  UNDEFINED = 'Undefined Type',
}

export const teamTopologyColors = {
  [teamTopology.STREAM_ALIGNED]: {
    color: '#FFD966',
    backgroundColor: '#FFEDB8',
  },
  [teamTopology.ENABLING]: {
    color: '#D09CB7',
    backgroundColor: '#DFBDCF',
  },
  [teamTopology.COMPLICATED_SUBSYSTEM]: {
    color: '#E88814',
    backgroundColor: '#FFC08B',
  },
  [teamTopology.PLATFORM]: {
    color: '#6D9EEB',
    backgroundColor: '#B7CDF1',
  },
  [teamTopology.UNDEFINED]: {
    color: '#9B99AF',
    backgroundColor: '#EBEBEF',
  },
};

export enum dependencyType {
  OK = 'ok',
  SLOWING = 'slowing',
  BLOCKING = 'blocking',
}

export const dependencyColors = {
  [dependencyType.OK]: grey[400],
  [dependencyType.SLOWING]: amber[600],
  [dependencyType.BLOCKING]: deepOrange[900],
};
