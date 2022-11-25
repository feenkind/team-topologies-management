import { IsEnum, IsString } from 'class-validator';

export enum priority {
  GENERIC = 'generic',
  SUPPORTING = 'supporting',
  CORE = 'core',
}

export enum complexity {
  SIMPLE = 'simple',
  COMPLICATED = 'complicated',
  COMPLEX = 'complex',
}

export class CreateDomainDto {
  @IsString()
  projectId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(priority)
  priority: priority;

  @IsEnum(complexity)
  complexity: complexity;
}
