import { ITeamImport } from './interfacesTeamImport';
import { interactionMode } from '../../../constants/categories';
import { changeType } from './teamSlice';

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
