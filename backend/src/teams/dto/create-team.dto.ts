import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateDependencyDto } from './create-dependency.dto';
import { CreateInteractionDto } from './create-interaction.dto';

export enum teamType {
  STREAM_ALIGNED = 'stream_aligned',
  PLATFORM = 'platform',
  ENABLING = 'enabling',
  COMPLICATED_SUBSYSTEM = 'complicated_subsystem',
  UNDEFINED = 'undefined',
}

export enum channelTypes {
  SLACK = 'slack',
}

export enum meetingsDay {
  DAILY = 'daily',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
}

export enum versioningType {
  SEMANTIC = 'semantic',
  SEQUENTIAL = 'sequential',
}

export enum changeType {
  ADDED = 'added',
  CHANGED = 'changed',
  REMOVED = 'removed',
}

export class CreateTeamDto {
  @IsString()
  projectId: string;

  @IsString()
  name: string;

  @IsNumber()
  cognitiveLoad: number;

  @IsNumber()
  fte: number;

  @IsString()
  focus: string;

  @IsEnum(teamType)
  type: teamType;

  @IsOptional()
  @IsString()
  platform?: string;

  @IsOptional()
  @IsArray()
  wikiSearchTearms: string[];

  @IsOptional()
  @IsArray()
  communicationChannels: {
    type: channelTypes;
    name: string;
  }[];

  @IsOptional()
  @IsArray()
  meetings: {
    day: meetingsDay;
    purpose: string;
    time: string;
    durationMinutes: number;
  }[];

  @IsOptional()
  @IsArray()
  services: {
    versioning: versioningType;
    name: string;
    url?: string;
    repository?: string;
  }[];

  @IsOptional()
  @IsArray()
  waysOfWorking: { name: string; url?: string }[];

  @IsOptional()
  @IsArray()
  domainIds: string[];

  @IsOptional()
  @IsArray()
  work: { summary: string; repository?: string }[];

  @IsOptional()
  @IsArray()
  dependencies: CreateDependencyDto[];

  @IsOptional()
  @IsArray()
  interactions: CreateInteractionDto[];
}
