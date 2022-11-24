import {
  IHistoricCognitiveLoadValue,
  IHistoricDomainResponsibility,
  IHistoricFTEValue,
  IHistoricTeamType,
  ITeam,
} from './teamSlice';
import {
  ITeamImportHistory,
  ITeamImportWithHistory,
} from './interfacesTeamImport';

export const createTeam = (teamData: ITeamImportWithHistory): ITeam => {
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
      versioning: service.versioning,
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
  teamDataHistory: ITeamImportHistory,
): IHistoricFTEValue => ({
  value: teamDataHistory.fte,
  date: teamDataHistory.createdAt,
  changeReason: teamDataHistory.changeNote,
});

export const createHistoricCognitiveLoadValue = (
  teamDataHistory: ITeamImportHistory,
): IHistoricCognitiveLoadValue => ({
  value: teamDataHistory.cognitiveLoad,
  date: teamDataHistory.createdAt,
  changeReason: teamDataHistory.changeNote,
});

export const createHistoricTeamType = (
  teamDataHistory: ITeamImportHistory,
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
