export enum Priority {
  GENERIC = 'generic',
  SUPPORTING = 'supporting',
  CORE = 'core',
}

export enum Complexity {
  SIMPLE = 'simple',
  COMPLICATED = 'complicated',
  COMPLEX = 'complex',
}

export class CreateDomainDto {
  projectId: string;
  name: string;
  description: string;
  priority: Priority;
  complexity: Complexity;
}
