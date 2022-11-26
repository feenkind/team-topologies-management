import { dependencyType } from '../../../constants/categories';
import { changeType } from './teamSlice';
import { ITeamImport } from './interfacesTeamImport';

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
  changeType: changeType;
}
