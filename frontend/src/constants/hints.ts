export interface IHint {
  summary: string;
  description: string;
  linkUrl?: string;
  linkLabel?: string;
}

interface IHintMapping {
  [keys: string]: IHint;
}

export const teamHints: IHintMapping = {
  teamSize: {
    summary: 'Team Size',
    description: 'The perfect team consists of 7 to 9 members.',
    linkUrl: '',
    linkLabel: '',
  },
  cognitiveLoad: {
    summary: 'Cognitive Load',
    description:
      '... ideally 2-3 simple domains, not more than 1' +
      ' complicated and if one complex, no other...',
    linkUrl: '',
    linkLabel: 'Lern more about team topologies',
  },
  interactionModes: {
    summary: 'Interaction Modes',
    description: 'What do they mean?',
    linkUrl: '',
    linkLabel: 'Lern more about team topologies',
  },
  cognitiveLoadAssessment: {
    summary: 'How to calculate the Cognitive Load?',
    description:
      'The cognitive load assessment can help teams understand' +
      ' their cognitive load. In this application, 5 is a very low' +
      ' and 25 is a very high cognitive load. For more' +
      ' information on calculating the load, the book Team Topologies by' +
      ' Matthew Skelton and Manuel Pais is recommended.',
    linkUrl: 'https://github.com/TeamTopologies/Team-Cognitive-Load-Assessment',
    linkLabel: 'Cognitive Load Assessment Template',
  },
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
  eventStormingRemote: {
    summary: 'Remote Event Storming',
    description: 'Remote event storming...',
    linkUrl: '',
    linkLabel: 'Go to the article',
  },
  coreDomainChart: {
    summary: 'Core Domain Chart',
    description:
      'A core domain chart can help you prioritize and align your' +
      ' domains strategically.',
    linkUrl: 'https://github.com/ddd-crew/core-domain-charts',
    linkLabel: 'Learn more',
  },
  domainPriority: {
    summary: 'How to calculate the domain priority?',
    description:
      'To know about the strategic position of a domain is important. To get' +
      ' a better understanding, using a core domain chart can help. The' +
      ' domain priority in this application can either be generic,' +
      ' supporting or core.',
    linkUrl: 'https://github.com/ddd-crew/core-domain-charts',
    linkLabel: 'Learn more about core domain charts',
  },
  domainComplexity: {
    summary: 'How to calculate the domain complexity?',
    description:
      'The complexity of a domain influences the cognitive load of the team' +
      " responsibible for it. Always consider the team's opinion on the" +
      ' domain complexity, e.g. using the cognitive load assessment. For' +
      ' some suggestions to assess the complexity visit the core domain' +
      ' chart repository of the DDDCrew.',
    linkUrl:
      'https://github.com/ddd-crew/core-domain-charts#suggestions-for-measuring-complexity-and-differentiation',
    linkLabel: 'See clues for complexity',
  },
  domainStorytelling: {
    summary: 'Domain Storytelling',
    description: '',
    linkUrl: '',
    linkLabel: 'Learn more',
  },
};

export const projectHints: IHintMapping = {
  projectDescription: {
    summary: 'What is a project?',
    description:
      'A project is a logical container around your domains. It can be a' +
      ' value stream or a product or something completely different.' +
      ' After creation you can add domains and teams to your project.',
  },
};
