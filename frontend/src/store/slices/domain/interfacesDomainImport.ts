import { IDomain } from './domainSlice';

export interface IDomainImportHistory extends IDomain {
  domainId: string;
  createdAt: string;
  changeNote: string;
}

export interface IDomainImportWithHistory extends IDomain {
  projectId: string;
  DomainHistory: IDomainImportHistory[];
}
