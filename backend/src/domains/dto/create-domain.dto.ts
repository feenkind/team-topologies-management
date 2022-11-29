import { IsEnum, IsString } from 'class-validator';
import { complexity, priority } from './domain.dto';

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
