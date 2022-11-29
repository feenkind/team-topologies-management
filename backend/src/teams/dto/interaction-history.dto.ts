import { InteractionDto } from './interaction.dto';
import { changeType } from './team.dto';

export class InteractionHistoryDto extends InteractionDto {
  createdAt: string;
  changeNote: string;
  changeType: changeType;
}
