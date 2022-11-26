import {
  IHistoricCognitiveLoadValue,
  IHistoricDomainResponsibility,
  IHistoricFTEValue,
  IHistoricTeamType,
} from './teamSlice';
import { ITeamHistoryImport } from '../../../types/teamTypes';

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
