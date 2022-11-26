import { IsString } from 'class-validator';
import { CreateInteractionDto } from './create-interaction.dto';

export class UpdateInteractionDto extends CreateInteractionDto {
  @IsString()
  teamIdOne: string;

  @IsString()
  changeNote: string;
}
