import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  dependencyType,
  interactionMode,
  teamType,
} from '../../constants/categories';
import {
  channelType,
  meetingsDay,
  versioningType,
} from '../../constants/teamApi';
import { ITeamDataWithHistory } from './interfacesTeamImport';
import {
  createHistoricCognitiveLoadValue,
  createHistoricFteValue,
  createHistoricTeamType,
  createTeam,
} from './mappingsTeamImport';

export interface IChannel {
  type: channelType;
  name: string;
}

export interface IMeeting {
  purpose: string;
  day: meetingsDay;
  time: string;
  durationMinutes: number;
}

export interface IService {
  name: string;
  url: string;
  repository: string;
  versioningType: versioningType;
}

export interface IWorkInProgress {
  summary: string;
  repository?: string;
}

export interface IWaysOfWorking {
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
  type: teamType;
  wikiSearchTerms?: string[];
  waysOfWorking?: IWaysOfWorking[];
  workInProgress?: IWorkInProgress[];
  teamCreationDate: string;
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

export interface IHistoricFTEValue extends IHistoricValue {
  value: number;
}

export interface IHistoricCognitiveLoadValue extends IHistoricValue {
  value: number;
}

interface IHistoricDomainResponsibility extends IHistoricValue {
  domains: string[];
}

export interface IHistoricTeamType extends IHistoricValue {
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
  reducers: {
    addAllTeamDataWithHistory: (
      state,
      { payload }: PayloadAction<ITeamDataWithHistory[]>,
    ) => {
      state = { ...initialState };
      payload.forEach((teamData) => {
        // order team history values asc by date
        teamData.TeamHistory.sort((a, b) =>
          new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1,
        );
        // order team domain history values asc by date
        teamData.DomainsOnTeamsHistory.sort((a, b) =>
          new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1,
        );

        const team = createTeam(teamData);

        if (!state.teams[teamData.projectId]) {
          state.teams = { ...state.teams, [teamData.projectId]: [] };
        }

        if (
          !state.teams[teamData.projectId].find(
            (team) => team.id === teamData.id,
          )
        ) {
          state.teams[teamData.projectId].push(team);
        }

        for (let i = 0; i < teamData.TeamHistory.length; i++) {
          const currentHistory = teamData.TeamHistory[i];
          // first history value is always relevant
          if (i === 0) {
            state.historyFte = {
              ...state.historyFte,
              [teamData.id]: [],
            };
            state.historyCognitiveLoad = {
              ...state.historyCognitiveLoad,
              [teamData.id]: [],
            };
            state.historyTeamTypes = {
              ...state.historyTeamTypes,
              [teamData.id]: [],
            };

            state.historyFte[teamData.id].push(
              createHistoricFteValue(currentHistory),
            );
            state.historyCognitiveLoad[teamData.id].push(
              createHistoricCognitiveLoadValue(currentHistory),
            );
            state.historyTeamTypes[teamData.id].push(
              createHistoricTeamType(currentHistory),
            );

            continue;
          }

          // check if current history values are different than previous and
          // save only, if so
          const previousHistory = teamData.TeamHistory[i - 1];
          if (previousHistory.fte !== currentHistory.fte) {
            state.historyFte[teamData.id].push(
              createHistoricFteValue(currentHistory),
            );
          }

          if (previousHistory.cognitiveLoad !== currentHistory.cognitiveLoad) {
            state.historyCognitiveLoad[teamData.id].push(
              createHistoricCognitiveLoadValue(currentHistory),
            );
          }

          if (previousHistory.type !== currentHistory.type) {
            state.historyTeamTypes[teamData.id].push(
              createHistoricTeamType(currentHistory),
            );
          }
        }
      });

      return state;
    },
  },
});

export const teamReducer = teamSlice.reducer;
export const { addAllTeamDataWithHistory } = teamSlice.actions;
