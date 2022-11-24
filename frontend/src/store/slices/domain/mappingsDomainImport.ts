import { IDomain, IHistoricValue } from './domainSlice';
import {
  IDomainImportWithHistory,
  IDomainImportHistory,
} from './interfacesDomainImport';

export const createDomain = (domainData: IDomainImportWithHistory): IDomain => {
  return {
    id: domainData.id,
    name: domainData.name,
    description: domainData.description,
    priority: domainData.priority,
    complexity: domainData.complexity,
  };
};

export const createHistoricPriorityValue = (
  domainHistory: IDomainImportHistory,
): IHistoricValue => {
  return {
    value: domainHistory.priority,
    date: domainHistory.createdAt,
    changeReason: domainHistory.changeNote,
  };
};

export const createHistoricComplexityValue = (
  domainHistory: IDomainImportHistory,
): IHistoricValue => {
  return {
    value: domainHistory.complexity,
    date: domainHistory.createdAt,
    changeReason: domainHistory.changeNote,
  };
};
