import {
  IHistoricCognitiveLoadValue,
  IHistoricDomainResponsibility,
  IHistoricFTEValue,
  IHistoricTeamType,
  ITeam,
} from './teamSlice';
import { ITeamDataHistory, ITeamDataWithHistory } from './interfacesTeamImport';

export const createTeam = (teamData: ITeamDataWithHistory): ITeam => {
  return {
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
};

export const createHistoricFteValue = (
  teamDataHistory: ITeamDataHistory,
): IHistoricFTEValue => ({
  value: teamDataHistory.fte,
  date: teamDataHistory.createdAt,
  changeReason: teamDataHistory.changeNote,
});

export const createHistoricCognitiveLoadValue = (
  teamDataHistory: ITeamDataHistory,
): IHistoricCognitiveLoadValue => ({
  value: teamDataHistory.cognitiveLoad,
  date: teamDataHistory.createdAt,
  changeReason: teamDataHistory.changeNote,
});

export const createHistoricTeamType = (
  teamDataHistory: ITeamDataHistory,
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
