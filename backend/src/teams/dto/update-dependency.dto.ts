import { IsString } from 'class-validator';
import { CreateDependencyDto } from './create-dependency.dto';

export class UpdateDependencyDto extends CreateDependencyDto {
  @IsString()
  teamIdFrom: string;

  @IsString()
  changeNote: string;
}
