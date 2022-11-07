export interface IHint {
  summary: string;
  description: string;
  linkUrl: string;
  linkLabel: string;
}

interface IHintMapping {
  [keys: string]: IHint;
}

export const teamHints = {
  teamSize: 'The perfect team consists of 7 to 9 members.',
};

export const domainHints: IHintMapping = {
  eventStorming: {
    summary: 'Event Storming',
    description:
      'Event Storming is a very useful method to get to know your' +
      ' domain and to define bounded contexts.',
    linkUrl: 'https://github.com/ddd-crew/eventstorming-glossary-cheat-sheet',
    linkLabel: 'Go to the cheatsheet',
  },
  coreDomainChart: {
    summary: 'Core Domain Chart',
    description:
      'A core domain chart can help you prioritize and align your' +
      ' domains strategically.',
    linkUrl: 'https://github.com/ddd-crew/core-domain-charts',
    linkLabel: 'Learn more',
  },
};
