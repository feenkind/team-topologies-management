export enum TeamType {
  STREAM_ALIGNED = 'stream_aligned',
  PLATFORM = 'platform',
  ENABLING = 'enabling',
  COMPLICATED_SUBSYSTEM = 'complicated_subsystem',
  UNDEFINED = 'undefined',
}

export enum channelTypes {
  SLACK = 'slack',
}

export enum meetingsDay {
  DAILY = 'daily',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
}

export enum versioningType {
  SEMANTIC = 'semantic',
  SEQUENTIAL = 'sequential',
}

export enum dependencyType {
  OK = 'ok',
  SLOWING = 'slowing',
  BLOCKING = 'blocking',
}

export enum interactionMode {
  COLLABORATION = 'collaboration',
  X_AS_A_SERVICE = 'x_as_a_service',
  FACILITATING = 'facilitating',
  UNDEFINED = 'undefined',
}

export enum changeType {
  ADDED = 'added',
  CHANGED = 'changed',
  REMOVED = 'removed',
}

export class CreateTeamDto {}
