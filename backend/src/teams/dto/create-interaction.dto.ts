import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { interactionMode } from './interaction.dto';

export class CreateInteractionDto {
  @IsString()
  teamIdTwo: string;

  @IsEnum(interactionMode)
  interactionMode: interactionMode;

  @IsString()
  purpose: string;

  @IsDate()
  startDate: Date;

  @IsNumber()
  expectedDuration: number;

  @IsOptional()
  @IsString()
  additionalInformation?: string;
}
