import {
  IHistoricCognitiveLoadValue,
  IHistoricDomainResponsibility,
  IHistoricFTEValue,
  IHistoricTeamType,
  ITeam,
} from './teamSlice';
import { ITeamHistoryImport, ITeamImport } from '../../../types/teamTypes';

export const createTeam = (teamData: ITeamImport): ITeam => {
  return {
    channels: teamData.communicationChannels.map((channel) => ({
      type: channel.type,
      name: channel.name,
    })),
    cognitiveLoad: teamData.cognitiveLoad,
    domains: teamData.domains,
    focus: teamData.focus,
    fte: teamData.fte,
    id: teamData.id,
    meetings: teamData.meetings.map((meeting) => ({
      purpose: meeting.purpose,
      day: meeting.day,
      time: meeting.time,
      durationMinutes: meeting.durationMinutes,
    })),
    name: teamData.name,
    platform: teamData.platform || '',
    services: teamData.services.map((service) => ({
      versioning: service.versioning,
      repository: service.repository,
      name: service.name,
      url: service.url,
    })),
    type: teamData.type,
    wikiSearchTerms: teamData.wikiSearchTerms,
    waysOfWorking: teamData.waysOfWorking.map((way) => ({
      name: way.name,
      url: way.url || '',
    })),
    workInProgress: teamData.works.map((work) => ({
      summary: work.summary,
      repository: work.repository || '',
    })),
    teamCreationDate: '',
  };
};

export const createHistoricFteValue = (
  teamDataHistory: ITeamHistoryImport,
): IHistoricFTEValue => ({
  value: teamDataHistory.fte,
  date: teamDataHistory.createdAt,
  changeReason: teamDataHistory.changeNote,
});

export const createHistoricCognitiveLoadValue = (
  teamDataHistory: ITeamHistoryImport,
): IHistoricCognitiveLoadValue => ({
  value: teamDataHistory.cognitiveLoad,
  date: teamDataHistory.createdAt,
  changeReason: teamDataHistory.changeNote,
});

export const createHistoricTeamType = (
  teamDataHistory: ITeamHistoryImport,
): IHistoricTeamType => ({
  teamType: teamDataHistory.type,
  date: teamDataHistory.createdAt,
  changeReason: teamDataHistory.changeNote,
});

export const createHistoricDomainResponsibility = (
  date: string,
  domainHistory: { domains: string[]; changeNote: string },
): IHistoricDomainResponsibility => ({
  domains: domainHistory.domains,
  date: date,
  changeReason: domainHistory.changeNote,
});
