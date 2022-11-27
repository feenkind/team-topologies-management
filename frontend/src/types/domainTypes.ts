import { complexity } from './complexityTypes';
import { priority } from './priorityTypes';

export interface IDomainImport {
  id: string;
  projectId: string;
  name: string;
  description: string;
  priority: priority;
  complexity: complexity;
  domainHistory?: IDomainHistoryImport[];
}

export interface IDomainHistoryImport {
  name: string;
  description: string;
  priority: priority;
  complexity: complexity;
  createdAt: string;
  changeNote: string;
}
