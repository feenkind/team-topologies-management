import { IDomain, IHistoricValue } from './domainSlice';
import {
  IDomainDataWithHistory,
  IDomainHistory,
} from './interfacesDomainImport';

export const createDomain = (domainData: IDomainDataWithHistory): IDomain => {
  return {
    id: domainData.id,
    name: domainData.name,
    description: domainData.description,
    priority: domainData.priority,
    complexity: domainData.complexity,
  };
};

export const createHistoricPriorityValue = (
  domainHistory: IDomainHistory,
): IHistoricValue => {
  return {
    value: domainHistory.priority,
    date: domainHistory.createdAt,
    changeReason: domainHistory.changeNote,
  };
};

export const createHistoricComplexityValue = (
  domainHistory: IDomainHistory,
): IHistoricValue => {
  return {
    value: domainHistory.complexity,
    date: domainHistory.createdAt,
    changeReason: domainHistory.changeNote,
  };
};
