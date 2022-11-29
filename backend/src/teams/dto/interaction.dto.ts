export enum interactionMode {
  COLLABORATION = 'collaboration',
  X_AS_A_SERVICE = 'x_as_a_service',
  FACILITATING = 'facilitating',
  UNDEFINED = 'undefined',
}

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
