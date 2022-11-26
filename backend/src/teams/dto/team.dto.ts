import {
  meetingsDay,
  teamType,
  versioningType,
  channelTypes,
} from './create-team.dto';
import { InteractionDto } from './interaction.dto';
import { DependencyDto } from './dependency.dto';

export class TeamDto {
  id: string;
  projectId: string;
  name: string;
  cognitiveLoad: number;
  fte: number;
  focus: string;
  type: teamType;
  platform?: string;
  wikiSearchTerms: string[];
  communicationChannels: { type: channelTypes; name: string }[];
  meetings: {
    purpose: string;
    day: meetingsDay;
    time: string;
    durationMinutes: number;
  }[];
  services: {
    name: string;
    url: string;
    repository: string;
    versioning: versioningType;
  }[];
  waysOfWorking: {
    name: string;
    url?: string;
  }[];
  works: {
    summary: string;
    repository?: string;
  }[];
  domains: string[];
  interactionsAsTeamOne?: InteractionDto[];
  interactionsAsTeamTwo?: InteractionDto[];
  dependencies?: DependencyDto[];
  teamHistory?: {
    createdAt: string;
    changeNote: string;
    fte: number;
    type: teamType;
    cognitiveLoad: number;
  }[];
  domainHistory?: {
    createdAt: string;
    changeNote: string;
    domainId: string;
  }[];
}
