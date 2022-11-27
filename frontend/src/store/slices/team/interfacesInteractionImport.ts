import { interactionMode, changeType } from '../../../constants/categories';
import { ITeamImport } from './interfacesTeamImport';

export interface IInteractionImport {
  teamIdOne: string;
  teamIdTwo: string;
  interactionMode: interactionMode;
  purpose: string;
  startDate: string;
  expectedDuration: number;
  additionalInformation: string;
  teamOne: ITeamImport;
  teamTwo: ITeamImport;
}

export interface IInteractionHistoryImport extends IInteractionImport {
  id: string;
  createdAt: string;
  changeNote: string;
  changeType: changeType;
}
