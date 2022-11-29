export enum priority {
  GENERIC = 'generic',
  SUPPORTING = 'supporting',
  CORE = 'core',
}

export enum complexity {
  SIMPLE = 'simple',
  COMPLICATED = 'complicated',
  COMPLEX = 'complex',
}

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
