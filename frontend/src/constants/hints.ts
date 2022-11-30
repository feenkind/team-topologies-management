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
    summary:
      'How to calculate the Cognitive Load with the Cognitive Load' +
      ' Assessment?',
    description:
      'The cognitive load assessment can help teams understand' +
      ' their cognitive load. In this application, 5 is a very low' +
      ' and 25 is a very high cognitive load. For more' +
      ' information on calculating the load, the book Team Topologies by' +
      ' Matthew Skelton and Manuel Pais is recommended.',
    linkUrl: 'https://github.com/TeamTopologies/Team-Cognitive-Load-Assessment',
    linkLabel: 'Cognitive Load Assessment Template',
  },
  userNeedsMapping: {
    summary: 'Define team boundaries with the User Needs Mapping',
    description:
      'The User Needs Mapping can help to define the needed teams and team' +
      ' boundaries to fullfill user needs. While doing so, potential' +
      ' dependencies between the teams can be detected.',
    linkUrl:
      'https://teamtopologies.com/key-concepts-content/exploring-team-and-service-boundaries-with-user-needs-mapping',
    linkLabel: 'Learn more about the User Needs Mapping',
  },
};

export const domainHints: IHintMapping = {
  eventStorming: {
    summary: 'Exploring the domains with Event Storming',
    description:
      'To get a better understanding of a domain, (re-)evaluate' +
      ' processes or (re-)define bounded contexts, Event Storming can be a' +
      ' very powerful tool. Its application is flexible and it can be' +
      ' used for new or existing domains.',
    linkUrl: 'https://github.com/ddd-crew/eventstorming-glossary-cheat-sheet',
    linkLabel: 'Go to the cheatsheet',
  },
  independentServiceHeuristics: {
    summary: 'Identify domain boundaries with ISH',
    description:
      'Independent Service Heuristics (ISH) can help with identifying domain' +
      ' boundaries by answering a set of questions and discussing the' +
      ' outcome. It can also be used in combination, before or after the' +
      ' Event Storming process.',
    linkUrl: 'https://github.com/TeamTopologies/Independent-Service-Heuristics',
    linkLabel: 'Go to the checklist',
  },
  domainStorytelling: {
    summary: 'Exploring the domains with Domain Storytelling',
    description:
      'Similar to event storming, the Domain Storytelling' +
      ' technique can be used to get to know a domain better and' +
      ' understand the requirements in this domain.',
    linkUrl: 'https://domainstorytelling.org',
    linkLabel: 'Learn about Domain Storytelling',
  },
  coreDomainChart: {
    summary: 'Prioritize domains with a Core Domain Chart',
    description:
      'A core domain chart can help you prioritize and align your' +
      ' domains strategically. Especially when used with the display of the' +
      ' team interaction modes between the bounded contexts and the team' +
      ' size display, this tool can be very helpful in discovering any' +
      ' misalignments.',
    linkUrl: 'https://github.com/ddd-crew/core-domain-charts',
    linkLabel: 'Learn more about core domain charts',
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
