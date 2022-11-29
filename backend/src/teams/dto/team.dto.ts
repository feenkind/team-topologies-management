import { InteractionDto } from './interaction.dto';
import { DependencyDto } from './dependency.dto';

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

export enum changeType {
  ADDED = 'added',
  CHANGED = 'changed',
  REMOVED = 'removed',
}

export class TeamDto {
  id: string;
  projectId: string;
  name: string;
  cognitiveLoad: number;
  fte: number;
  focus: string;
  type: teamType;
  platform?: string;
  wikiSearchTerms: string[];
  communicationChannels: { type: channelTypes; name: string }[];
  meetings: {
    purpose: string;
    day: meetingsDay;
    time: string;
    durationMinutes: number;
  }[];
  services: {
    name: string;
    url: string;
    repository: string;
    versioning: versioningType;
  }[];
  waysOfWorking: {
    name: string;
    url?: string;
  }[];
  works: {
    summary: string;
    repository?: string;
  }[];
  domains: string[];
  interactionsAsTeamOne?: InteractionDto[];
  interactionsAsTeamTwo?: InteractionDto[];
  dependencies?: DependencyDto[];
  teamHistory?: {
    createdAt: string;
    changeNote: string;
    fte: number;
    type: teamType;
    cognitiveLoad: number;
  }[];
  domainHistory?: {
    createdAt: string;
    changeNote: string;
    domainId: string;
  }[];
}
