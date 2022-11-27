import {
  teamType,
  dependencyType,
  interactionMode,
  changeType,
} from '../constants/categories';
import { channelType, meetingsDay, versioningType } from '../constants/teamApi';

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
  teamIdOne: string;
  teamIdTwo: string;
  interactionMode: interactionMode;
  purpose: string;
  startDate: string;
  expectedDuration: number;
  additionalInformation: string;
}
