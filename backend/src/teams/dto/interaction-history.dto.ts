import { changeType } from './create-team.dto';
import { InteractionDto } from './interaction.dto';

export class InteractionHistoryDto extends InteractionDto {
  createdAt: string;
  changeNote: string;
  changeType: changeType;
}
