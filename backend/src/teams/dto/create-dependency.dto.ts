import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum dependencyType {
  OK = 'ok',
  SLOWING = 'slowing',
  BLOCKING = 'blocking',
}

export class CreateDependencyDto {
  @IsString()
  teamIdTo: string;

  @IsEnum(dependencyType)
  dependencyType: dependencyType;

  @IsOptional()
  @IsString()
  description?: string;
}
