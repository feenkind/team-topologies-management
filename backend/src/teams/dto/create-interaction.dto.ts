import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum interactionMode {
  COLLABORATION = 'collaboration',
  X_AS_A_SERVICE = 'x_as_a_service',
  FACILITATING = 'facilitating',
  UNDEFINED = 'undefined',
}

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
