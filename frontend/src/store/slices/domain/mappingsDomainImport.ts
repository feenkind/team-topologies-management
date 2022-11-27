import { IDomain, IHistoricValue } from './domainSlice';
import {
  IDomainHistoryImport,
  IDomainImport,
} from '../../../types/domainTypes';

export const createDomain = (domainData: IDomainImport): IDomain => {
  return {
    id: domainData.id,
    name: domainData.name,
    description: domainData.description,
    priority: domainData.priority,
    complexity: domainData.complexity,
  };
};

export const createHistoricPriorityValue = (
  domainHistory: IDomainHistoryImport,
): IHistoricValue => {
  return {
    value: domainHistory.priority,
    date: domainHistory.createdAt,
    changeReason: domainHistory.changeNote,
  };
};

export const createHistoricComplexityValue = (
  domainHistory: IDomainHistoryImport,
): IHistoricValue => {
  return {
    value: domainHistory.complexity,
    date: domainHistory.createdAt,
    changeReason: domainHistory.changeNote,
  };
};
