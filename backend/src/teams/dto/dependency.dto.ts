import { dependencyType } from './create-dependency.dto';

export class DependencyDto {
  teamIdFrom: string;
  teamIdTo: string;
  dependencyType: dependencyType;
  description: string;
}
