import { DependencyDto } from './dependency.dto';
import { changeType } from './create-team.dto';

export class DependencyHistoryDto extends DependencyDto {
  createdAt: string;
  changeNote: string;
  changeType: changeType;
}
