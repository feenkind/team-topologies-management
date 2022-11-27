import { priority, complexity } from './create-domain.dto';

export class DomainDto {
  id: string;
  projectId: string;
  name: string;
  description: string;
  priority: priority;
  complexity: complexity;
  domainHistory?: {
    name: string;
    description: string;
    priority: priority;
    complexity: complexity;
    createdAt: string;
    changeNote: string;
  }[];
}
