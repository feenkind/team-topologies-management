export enum dependencyType {
  OK = 'ok',
  SLOWING = 'slowing',
  BLOCKING = 'blocking',
}

export class DependencyDto {
  projectId: string;
  teamIdFrom: string;
  teamIdTo: string;
  dependencyType: dependencyType;
  description: string;
}
