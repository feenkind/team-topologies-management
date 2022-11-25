import { PartialType } from '@nestjs/mapped-types';
import { CreateDomainDto } from './create-domain.dto';
import { IsString } from 'class-validator';

export class UpdateDomainDto extends PartialType(CreateDomainDto) {
  @IsString()
  changeNote: string;
}
