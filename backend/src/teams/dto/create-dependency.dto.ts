import { IsEnum, IsOptional, IsString } from 'class-validator';
import { dependencyType } from './dependency.dto';

export class CreateDependencyDto {
  @IsString()
  teamIdTo: string;

  @IsEnum(dependencyType)
  dependencyType: dependencyType;

  @IsOptional()
  @IsString()
  description?: string;
}
