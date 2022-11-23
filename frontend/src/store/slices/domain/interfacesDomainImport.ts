import { IDomain } from './domainSlice';

export interface IDomainHistory extends IDomain {
  domainId: string;
  createdAt: string;
  changeNote: string;
}

export interface IDomainDataWithHistory extends IDomain {
  projectId: string;
  DomainHistory: IDomainHistory[];
}
