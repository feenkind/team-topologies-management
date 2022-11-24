import {
  IChannel,
  IMeeting,
  IService,
  IWaysOfWorking,
  IWorkInProgress,
} from './teamSlice';
import { teamType } from '../../../constants/categories';

interface ITeamImportHistoryBase {
  id: string;
  createdAt: string;
  changeNote: string;
}

interface ITeamImportRelationBase {
  id: string;
  teamId: string;
}

interface ITeamImportChannel extends IChannel, ITeamImportRelationBase {}
interface ITeamImportMeeting extends IMeeting, ITeamImportRelationBase {}
interface ITeamImportService extends IService, ITeamImportRelationBase {}
interface ITeamImportWayOfWorking
  extends IWaysOfWorking,
    ITeamImportRelationBase {}
interface ITeamImportWork extends IWorkInProgress, ITeamImportRelationBase {}

interface IDomainOnTeams {
  domainId: string;
  teamId: string;
}

interface IDomainOnTeamsHistory
  extends IDomainOnTeams,
    ITeamImportHistoryBase {}

export interface ITeamImportHistory extends ITeamImportHistoryBase {
  fte: number;
  type: teamType;
  cognitiveLoad: number;
}

export interface ITeamImport {
  id: string;
  projectId: string;
  name: string;
  cognitiveLoad: number;
  fte: number;
  focus: string;
  type: teamType;
  platform?: string;
  wikiSearchTerms: string[];
}

export interface ITeamImportWithHistory extends ITeamImport {
  TeamHistory: ITeamImportHistory[];
  CommunicationChannel: ITeamImportChannel[];
  Meeting: ITeamImportMeeting[];
  Service: ITeamImportService[];
  WayOfWorking: ITeamImportWayOfWorking[];
  Work: ITeamImportWork[];
  DomainsOnTeams: IDomainOnTeams[];
  DomainsOnTeamsHistory: IDomainOnTeamsHistory[];
}
