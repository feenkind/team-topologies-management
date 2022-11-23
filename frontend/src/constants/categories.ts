import { amber, deepOrange, grey, lightGreen } from '@mui/material/colors';

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

export enum priority {
  GENERIC = 'generic',
  SUPPORTING = 'supporting',
  CORE = 'core',
}

export enum teamType {
  STREAM_ALIGNED = 'stream_aligned',
  ENABLING = 'enabling',
  COMPLICATED_SUBSYSTEM = 'complicated_subsystem',
  PLATFORM = 'platform',
  UNDEFINED = 'undefined',
}

export const teamTypeColor = {
  [teamType.STREAM_ALIGNED]: {
    color: '#FFD966',
    backgroundColor: '#FFEDB8',
  },
  [teamType.ENABLING]: {
    color: '#D09CB7',
    backgroundColor: '#DFBDCF',
  },
  [teamType.COMPLICATED_SUBSYSTEM]: {
    color: '#E88814',
    backgroundColor: '#FFC08B',
  },
  [teamType.PLATFORM]: {
    color: '#6D9EEB',
    backgroundColor: '#B7CDF1',
  },
  [teamType.UNDEFINED]: {
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
    color: '#eeeeee',
    backgroundColor: 'rgba(235,235,239,0.4)',
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
