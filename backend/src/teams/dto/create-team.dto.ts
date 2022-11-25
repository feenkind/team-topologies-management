import { channelType } from '../../../../frontend/src/constants/teamApi';

export enum teamType {
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

export class CreateTeamDto {
  projectId: string;
  name: string;
  cognitiveLoad: number;
  fte: number;
  focus: string;
  type: teamType;
  platform?: string;
  wikiSearchTearms: string[];
  communicationChannels: {
    type: channelType;
    name: string;
  }[];
  meetings: {
    day: meetingsDay;
    purpose: string;
    time: string;
    durationMinutes: number;
  }[];
  services: {
    versioning: versioningType;
    name: string;
    url?: string;
    repository?: string;
  }[];
  waysOfWorking: { name: string; url?: string }[];
  domainIds: string[];
  work: { summary: string; repository?: string }[];
}
