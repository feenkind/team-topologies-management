import { interactionMode } from './create-interaction.dto';

export class InteractionDto {
  projectId: string;
  teamIdOne: string;
  teamIdTwo: string;
  interactionMode: interactionMode;
  purpose: string;
  startDate: string;
  expectedDuration: number;
  additionalInformation: string;
}
