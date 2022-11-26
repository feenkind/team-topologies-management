import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateDependencyDto } from './create-dependency.dto';
import { OmitType } from '@nestjs/mapped-types';

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

export enum interactionMode {
  COLLABORATION = 'collaboration',
  X_AS_A_SERVICE = 'x_as_a_service',
  FACILITATING = 'facilitating',
  UNDEFINED = 'undefined',
}

export enum changeType {
  ADDED = 'added',
  CHANGED = 'changed',
  REMOVED = 'removed',
}

class CreateTeamDependency extends OmitType(CreateDependencyDto, [
  'teamIdFrom',
] as const) {}

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
  dependencies: CreateTeamDependency[];
}
