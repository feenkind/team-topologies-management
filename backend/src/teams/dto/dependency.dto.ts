import { dependencyType } from './create-dependency.dto';

export class DependencyDto {
  projectId: string;
  teamIdFrom: string;
  teamIdTo: string;
  dependencyType: dependencyType;
  description: string;
}
