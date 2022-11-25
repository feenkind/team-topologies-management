import { IsEnum, IsString } from 'class-validator';

export enum Priority {
  GENERIC = 'generic',
  SUPPORTING = 'supporting',
  CORE = 'core',
}

export enum Complexity {
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

  @IsEnum(Priority)
  priority: Priority;

  @IsEnum(Complexity)
  complexity: Complexity;
}
