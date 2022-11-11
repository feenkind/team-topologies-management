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

export const teamTopologyColor = {
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

export enum interactionMode {
  COLLABORATION = 'collaboration',
  X_AS_A_SERVICE = 'x-as-a-service',
  FACILITATING = 'facilitating',
  UNDEFINED = 'undefined',
}

export const interactionModeColor = {
  [interactionMode.COLLABORATION]: {
    color: '#967EE2',
    backgroundColor: '#C6BEDF',
  },
  [interactionMode.X_AS_A_SERVICE]: {
    color: '#999696',
    backgroundColor: '#B4B4B4',
  },
  [interactionMode.FACILITATING]: {
    color: '#78996B',
    backgroundColor: '#C9DFBE',
  },
  [interactionMode.UNDEFINED]: {
    color: '#9B99AF',
    backgroundColor: '#EBEBEF',
  },
};

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
