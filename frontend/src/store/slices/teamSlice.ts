import { createSlice } from '@reduxjs/toolkit';
import {
  dependencyType,
  interactionMode,
  teamType,
} from '../../constants/categories';
import {
  channelTypes,
  meetingsDay,
  versioningType,
} from '../../constants/teamApi';

interface IChannel {
  type: channelTypes;
  name: string;
}

interface IMeeting {
  purpose: string;
  day: meetingsDay;
  time: string;
  durationMinutes: number;
}

interface IService {
  name: string;
  url: string;
  repository: string;
  versioningType: versioningType;
}

interface IWorkInProgress {
  summary: string;
  repository?: string;
}

interface IWaysOfWorking {
  name: string;
  url?: string;
}

export interface ITeam {
  channels?: IChannel[];
  cognitiveLoad: number;
  domains?: string[];
  focus: string;
  fte: number;
  id: string;
  meetings?: IMeeting[];
  name: string;
  platform?: string;
  services?: IService[];
  teamCreationDate: string;
  type: teamType;
  wikiSearchTerms?: string[];
  waysOfWorking?: IWaysOfWorking[];
  workInProgress?: IWorkInProgress[];
}

export interface IDependency {
  fromTeamId: string;
  toTeamId: string;
  dependencyType: dependencyType;
  description?: string;
}

export interface IInteraction {
  teamIdOne: string;
  teamIdTwo: string;
  interactionMode: interactionMode;
  purpose: string;
  startDate: string;
  expectedDuration: number;
  additionalInformation?: string;
}

export enum changeType {
  ADDED = 'added',
  REMOVED = 'removed',
  CHANGED = 'changed',
}

interface IHistoricValue {
  date: string;
  changeReason?: string;
}

interface IHistoricFTEValue extends IHistoricValue {
  value: number;
}

interface IHistoricCognitiveLoadValue extends IHistoricValue {
  value: number;
}

interface IHistoricDomainResponsibility extends IHistoricValue {
  domains: string[];
}

interface IHistoricTeamType extends IHistoricValue {
  teamType: teamType;
}

interface IHistoricDependency extends IHistoricValue {
  dependency: IDependency;
  changeType: changeType;
}

interface IHistoricInteraction extends IHistoricValue {
  interaction: IInteraction;
  changeType: changeType;
}

interface IInitialState {
  // teams ordered by project
  teams: {
    [keys: string]: ITeam[];
  };
  // dependencies ordered by project
  dependencies: { [keys: string]: IDependency[] };
  // interactions ordered by project
  interactions: { [keys: string]: IInteraction[] };
  // history ordered by team
  historyFte: {
    [keys: string]: IHistoricFTEValue[];
  };
  historyCognitiveLoad: {
    [keys: string]: IHistoricCognitiveLoadValue[];
  };
  historyDomains: {
    [keys: string]: IHistoricDomainResponsibility[];
  };
  historyTeamTypes: {
    [keys: string]: IHistoricTeamType[];
  };
  // historic dependencies ordered by project
  historyDependencies: {
    [keys: string]: IHistoricDependency[];
  };
  // historic interactions ordered by project
  historyInteractions: {
    [keys: string]: IHistoricInteraction[];
  };
}

export const initialState: IInitialState = {
  teams: {},
  dependencies: {},
  interactions: {},
  historyFte: {},
  historyCognitiveLoad: {},
  historyDomains: {},
  historyTeamTypes: {},
  historyDependencies: {},
  historyInteractions: {},
};

const teamSlice = createSlice({
  name: 'team',
  initialState: initialState,
  reducers: {},
});

export const teamReducer = teamSlice.reducer;
export const {} = teamSlice.actions;
