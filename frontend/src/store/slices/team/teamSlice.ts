import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IDependencyHistoryImport,
  IDependencyImport,
  IInteractionHistoryImport,
  IInteractionImport,
  ITeamImport,
  teamType,
} from '../../../types/teamTypes';
import {
  createHistoricCognitiveLoadValue,
  createHistoricDomainResponsibility,
  createHistoricFteValue,
  createHistoricTeamType,
  createTeam,
} from './mappingsTeamImport';
import { interactionMode } from '../../../types/interactionTypes';
import { dependencyType } from '../../../types/dependencyType';
import { changeType } from '../../../types/changeTypes';
import { versioningType } from '../../../types/versioningTypes';
import { meetingsDay } from '../../../types/meetingTypes';
import { channelType } from '../../../types/channelTypes';

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
  versioning: versioningType;
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

export interface IHistoricDomainResponsibility extends IHistoricValue {
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
      { payload }: PayloadAction<ITeamImport[]>,
    ) => {
      // reset in the beginning to not keep any old data
      state.teams = {};
      state.historyCognitiveLoad = {};
      state.historyFte = {};
      state.historyDomains = {};

      payload.forEach((teamData) => {
        // order team history values asc by date
        teamData.teamHistory &&
          teamData.teamHistory.sort((a, b) =>
            new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1,
          );
        // order team domain history values asc by date
        teamData.domainHistory &&
          teamData.domainHistory.sort((a, b) =>
            new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1,
          );

        if (!state.teams[teamData.projectId]) {
          state.teams = { ...state.teams, [teamData.projectId]: [] };
        }

        if (
          !state.teams[teamData.projectId].find(
            (team) => team.id === teamData.id,
          )
        ) {
          state.teams[teamData.projectId].push({
            ...createTeam(teamData),
            teamCreationDate: teamData.teamHistory
              ? teamData.teamHistory[0].createdAt
              : '',
          });
        }

        const teamDataHistory = teamData.teamHistory || [];

        for (let i = 0; i < teamDataHistory.length; i++) {
          const currentHistory = teamDataHistory[i];
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
          const previousHistory = teamDataHistory[i - 1];
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

        const domainHistoryByDateInitial: {
          [keys: string]: { domains: string[]; changeNote: string };
        } = {};
        const teamDataDomainHistory = teamData.domainHistory || [];
        // create object with domain ids ordered by date
        const domainHistoryByDate = teamDataDomainHistory.reduce(
          (historyByDate, currentHistory) => {
            if (historyByDate[currentHistory.createdAt]) {
              historyByDate[currentHistory.createdAt] = {
                ...historyByDate[currentHistory.createdAt],
                domains: [
                  ...historyByDate[currentHistory.createdAt].domains,
                  currentHistory.domainId,
                ],
              };
            } else {
              historyByDate[currentHistory.createdAt] = {
                changeNote: currentHistory.changeNote,
                domains: [currentHistory.domainId],
              };
            }

            return { ...historyByDate };
          },
          domainHistoryByDateInitial,
        );

        const domainHistoryDates = Object.keys(domainHistoryByDate);
        for (let i = 0; i < domainHistoryDates.length; i++) {
          const currentDate = domainHistoryDates[i];
          const currentDomainData = domainHistoryByDate[currentDate];
          // order domain ids in history, so we can better compare later and
          // there will be no new history just because the order of domains
          // changed
          currentDomainData.domains.sort();

          // first history value is always relevant
          if (i === 0) {
            state.historyDomains = {
              ...state.historyDomains,
              [teamData.id]: [],
            };

            state.historyDomains[teamData.id].push(
              createHistoricDomainResponsibility(
                currentDate,
                currentDomainData,
              ),
            );

            continue;
          }

          // check if current history values are different than previous and
          // save only, if so
          const previousDomainData =
            domainHistoryByDate[domainHistoryDates[i - 1]];
          if (
            !(
              currentDomainData.domains.length ===
                previousDomainData.domains.length &&
              currentDomainData.domains.every(
                (domainId, index) =>
                  domainId === previousDomainData.domains[index],
              )
            )
          ) {
            state.historyDomains[teamData.id].push(
              createHistoricDomainResponsibility(
                currentDate,
                currentDomainData,
              ),
            );
          }
        }
      });
    },

    addAllDependencies: (
      state,
      { payload }: PayloadAction<IDependencyImport[]>,
    ) => {
      const dependencies: { [keys: string]: IDependency[] } = {};
      payload.forEach((dependency) => {
        const importedDependency = {
          fromTeamId: dependency.teamIdFrom,
          toTeamId: dependency.teamIdTo,
          dependencyType: dependency.dependencyType,
          description: dependency.description,
        };
        const projectId = dependency.projectId;
        // append dependency or create new
        if (dependencies[projectId]) {
          dependencies[projectId].push(importedDependency);
        } else {
          dependencies[projectId] = [importedDependency];
        }
      });

      state.dependencies = dependencies;
    },

    addAllDependencyHistory: (
      state,
      { payload }: PayloadAction<IDependencyHistoryImport[]>,
    ) => {
      const historyDependencies: { [keys: string]: IHistoricDependency[] } = {};
      payload.forEach((dependencyHistory) => {
        const importedHistory = {
          dependency: {
            fromTeamId: dependencyHistory.teamIdFrom,
            toTeamId: dependencyHistory.teamIdTo,
            dependencyType: dependencyHistory.dependencyType,
            description: dependencyHistory.description,
          },
          changeType: dependencyHistory.changeType,
          changeReason: dependencyHistory.changeNote,
          date: dependencyHistory.createdAt,
        };
        // check project id of any team to see connected dependency project
        // this needs to be changed as soon as teams can have dependencies
        // over different projects
        const projectId = dependencyHistory.projectId;
        // append dependency or create new
        if (historyDependencies[projectId]) {
          historyDependencies[projectId].push(importedHistory);
        } else {
          historyDependencies[projectId] = [importedHistory];
        }
      });

      state.historyDependencies = historyDependencies;
    },

    addAllInteractions: (
      state,
      { payload }: PayloadAction<IInteractionImport[]>,
    ) => {
      const interactions: { [keys: string]: IInteraction[] } = {};
      payload.forEach((interaction) => {
        const importedInteraction = {
          teamIdOne: interaction.teamIdOne,
          teamIdTwo: interaction.teamIdTwo,
          interactionMode: interaction.interactionMode,
          purpose: interaction.purpose,
          startDate: interaction.startDate,
          expectedDuration: interaction.expectedDuration,
          additionalInformation: interaction.additionalInformation,
        };
        // check project id of any team to see connected interactions project
        // this needs to be changed as soon as teams can have interactions
        // over different projects
        const projectId = interaction.projectId;
        // append interaction or create new
        if (interactions[projectId]) {
          interactions[projectId].push(importedInteraction);
        } else {
          interactions[projectId] = [importedInteraction];
        }
      });

      state.interactions = interactions;
    },

    addAllInteractionHistory: (
      state,
      { payload }: PayloadAction<IInteractionHistoryImport[]>,
    ) => {
      const historyInteractions: { [keys: string]: IHistoricInteraction[] } =
        {};
      payload.forEach((history) => {
        const importedHistory = {
          interaction: {
            teamIdOne: history.teamIdOne,
            teamIdTwo: history.teamIdTwo,
            interactionMode: history.interactionMode,
            purpose: history.purpose,
            startDate: history.startDate,
            expectedDuration: history.expectedDuration,
            additionalInformation: history.additionalInformation,
          },
          changeType: history.changeType,
          changeReason: history.changeNote,
          date: history.createdAt,
        };
        // check project id of any team to see connected interactions project
        // this needs to be changed as soon as teams can have interactions
        // over different projects
        const projectId = history.projectId;
        // append interaction or create new
        if (historyInteractions[projectId]) {
          historyInteractions[projectId].push(importedHistory);
        } else {
          historyInteractions[projectId] = [importedHistory];
        }
      });

      state.historyInteractions = historyInteractions;
    },
  },
});

export const teamReducer = teamSlice.reducer;
export const {
  addAllTeamDataWithHistory,
  addAllDependencies,
  addAllDependencyHistory,
  addAllInteractions,
  addAllInteractionHistory,
} = teamSlice.actions;
