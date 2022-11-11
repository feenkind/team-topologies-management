import { amber, deepOrange, grey, teal } from '@mui/material/colors';

export enum complexity {
  SIMPLE = 'simple',
  COMPLICATED = 'complicated',
  COMPLEX = 'complex',
}

export const complexityColor = {
  [complexity.SIMPLE]: teal[400],
  [complexity.COMPLICATED]: amber[600],
  [complexity.COMPLEX]: deepOrange[900],
};

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
  COLLABORATION = 'Collaboration',
  X_AS_A_SERVICE = 'X-as-a-Service',
  FACILITATING = 'Facilitating',
  UNDEFINED = 'undefined',
}

export const interactionModeColor = {
  [interactionMode.COLLABORATION]: {
    color: '#967EE2',
    backgroundColor: 'rgba(198,190,223,0.5)',
  },
  [interactionMode.X_AS_A_SERVICE]: {
    color: '#999696',
    backgroundColor: 'rgba(180,180,180,0.5)',
  },
  [interactionMode.FACILITATING]: {
    color: '#78996B',
    backgroundColor: 'rgba(201,223,190,0.5)',
  },
  [interactionMode.UNDEFINED]: {
    color: '#9B99AF',
    backgroundColor: 'rgba(235,235,239,0.5)',
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
