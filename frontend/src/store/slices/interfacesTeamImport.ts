import {
  IChannel,
  IMeeting,
  IService,
  IWaysOfWorking,
  IWorkInProgress,
} from './teamSlice';
import { teamType } from '../../constants/categories';

interface ITeamDataHistoryBase {
  id: string;
  createdAt: string;
  changeNote: string;
}

interface ITeamDataRelationBase {
  id: string;
  teamId: string;
}

interface ITeamDataChannel extends IChannel, ITeamDataRelationBase {}
interface ITeamDataMeeting extends IMeeting, ITeamDataRelationBase {}
interface ITeamDataService extends IService, ITeamDataRelationBase {}
interface ITeamDataWayOfWorking extends IWaysOfWorking, ITeamDataRelationBase {}
interface ITeamDataWork extends IWorkInProgress, ITeamDataRelationBase {}

interface IDomainOnTeams {
  domainId: string;
  teamId: string;
}

interface IDomainOnTeamsHistory extends IDomainOnTeams, ITeamDataHistoryBase {}

export interface ITeamDataHistory extends ITeamDataHistoryBase {
  fte: number;
  type: teamType;
  cognitiveLoad: number;
}

export interface ITeamDataWithHistory {
  id: string;
  projectId: string;
  name: string;
  cognitiveLoad: number;
  fte: number;
  focus: string;
  type: teamType;
  platform?: string;
  wikiSearchTerms: string[];
  TeamHistory: ITeamDataHistory[];
  CommunicationChannel: ITeamDataChannel[];
  Meeting: ITeamDataMeeting[];
  Service: ITeamDataService[];
  WayOfWorking: ITeamDataWayOfWorking[];
  Work: ITeamDataWork[];
  DomainsOnTeams: IDomainOnTeams[];
  DomainsOnTeamsHistory: IDomainOnTeamsHistory[];
}
