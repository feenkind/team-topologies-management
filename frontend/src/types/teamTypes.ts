import { interactionMode } from './interactionTypes';
import { dependencyType } from './dependencyType';
import { changeType } from './changeTypes';
import { versioningType } from './versioningTypes';
import { meetingsDay } from './meetingTypes';
import { channelType } from './channelTypes';

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

export interface ITeamImport {
  id: string;
  projectId: string;
  name: string;
  cognitiveLoad: number;
  fte: number;
  focus: string;
  type: teamType;
  platform?: string;
  wikiSearchTerms: string[];
  communicationChannels: { type: channelType; name: string }[];
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
  interactionsAsTeamOne?: IInteractionImport[];
  interactionsAsTeamTwo?: IInteractionImport[];
  dependencies?: IDependencyImport[];
  teamHistory?: ITeamHistoryImport[];
  domainHistory?: {
    createdAt: string;
    changeNote: string;
    domainId: string;
  }[];
}

export interface ITeamHistoryImport {
  createdAt: string;
  changeNote: string;
  fte: number;
  type: teamType;
  cognitiveLoad: number;
}

export interface IDependencyImport {
  projectId: string;
  teamIdFrom: string;
  teamIdTo: string;
  dependencyType: dependencyType;
  description: string;
}

export interface IDependencyHistoryImport extends IDependencyImport {
  createdAt: string;
  changeNote: string;
  changeType: changeType;
}

export interface IInteractionImport {
  projectId: string;
  teamIdOne: string;
  teamIdTwo: string;
  interactionMode: interactionMode;
  purpose: string;
  startDate: string;
  expectedDuration: number;
  additionalInformation: string;
}

export interface IInteractionHistoryImport extends IInteractionImport {
  createdAt: string;
  changeNote: string;
  changeType: changeType;
}
