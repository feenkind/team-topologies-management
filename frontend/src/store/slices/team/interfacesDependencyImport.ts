import { ITeamImport } from './interfacesTeamImport';
import { dependencyType } from '../../../constants/categories';

export interface IDepdencyImport {
  teamIdFrom: string;
  teamIdTo: string;
  dependencyType: dependencyType;
  description: string;
  teamFrom: ITeamImport;
  teamTo: ITeamImport;
}

export interface IDepdencyHistoryImport extends IDepdencyImport {
  id: string;
  createdAt: string;
  changeNote: string;
}
