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

        const team: ITeam = {
          channels: teamData.CommunicationChannel.map((channel) => ({
            type: channel.type,
            name: channel.name,
          })),
          cognitiveLoad: teamData.cognitiveLoad,
          domains: teamData.DomainsOnTeams.map((domain) => domain.domainId),
          focus: teamData.focus,
          fte: teamData.fte,
          id: teamData.id,
          meetings: teamData.Meeting.map((meeting) => ({
            purpose: meeting.purpose,
            day: meeting.day,
            time: meeting.time,
            durationMinutes: meeting.durationMinutes,
          })),
          name: teamData.name,
          platform: teamData.platform || '',
          services: teamData.Service.map((service) => ({
            versioningType: service.versioningType,
            repository: service.repository,
            name: service.name,
            url: service.url,
          })),
          type: teamData.type,
          wikiSearchTerms: teamData.wikiSearchTerms,
          waysOfWorking: teamData.WayOfWorking.map((way) => ({
            name: way.name,
            url: way.url || '',
          })),
          workInProgress: teamData.Work.map((work) => ({
            summary: work.summary,
            repository: work.repository || '',
          })),
          teamCreationDate: teamData.TeamHistory[0].createdAt,
        };

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
      });

      return state;
    },
  },
});

export const teamReducer = teamSlice.reducer;
export const { addAllTeamDataWithHistory } = teamSlice.actions;
