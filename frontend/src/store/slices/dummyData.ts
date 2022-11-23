import {
  complexity,
  dependencyType,
  interactionMode,
  priority,
  teamType,
} from '../../constants/categories';
import {
  channelType,
  meetingsDay,
  versioningType,
} from '../../constants/teamApi';
import { changeType } from './team/teamSlice';

const projectShoppingPlatform = {
  id: '1',
  name: 'Shopping Platform',
  description:
    'Some context for test project. Lorem ipsum dolor sit amet,' +
    ' consetetur sadipscing elitr, sed diam nonumy eirmod tempor' +
    ' invidunt ut labore et dolore magna aliquyam erat, sed diam' +
    ' voluptua. At vero eos et accusam et justo duo dolores et ea' +
    ' rebum. Stet clita kasd gubergren, no sea takimata sanctus est' +
    ' Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,' +
    ' consetetur sadipscing elitr, sed dia nonumy eirmod tempor' +
    ' invidunt ut labore et dolore magna aliquyam erat, sed diam' +
    ' voluptua. At vero eos et accusam et justo duo dolores et ea' +
    ' rebum. Stet clita kasd gubergren, no sea takimata sanctus est' +
    ' Lorem ipsum dolor sit amet.',
};

export const teams = {};

const initialDomainsState = {
  domains: {
    '1': [
      {
        id: '1',
        name: 'Shopping Cart',
        description: 'Description for the domain "Shopping Cart"',
        priority: priority.SUPPORTING,
        complexity: complexity.COMPLICATED,
      },
      {
        id: '2',
        name: 'Checkout',
        description:
          'Description for the domain "Checkout" with some more' +
          ' information... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\n' +
          '        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim\n' +
          '        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n' +
          '        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate\n' +
          '        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint\n' +
          '        occaecat cupidatat non proident, sunt in culpa qui officia deserunt\n' +
          '        mollit anim id est laborum.',
        priority: priority.CORE,
        complexity: complexity.COMPLEX,
      },
      {
        id: '3',
        name: 'Products',
        description: 'Some product domain description',
        priority: priority.SUPPORTING,
        complexity: complexity.SIMPLE,
      },
      {
        id: '4',
        name: 'Registration',
        description: 'Registration is super easy.',
        priority: priority.GENERIC,
        complexity: complexity.SIMPLE,
      },
    ],
    '2': [
      {
        id: '5',
        name: 'Domain A',
        description: 'More information for a domain should be provided...',
        priority: priority.SUPPORTING,
        complexity: complexity.COMPLICATED,
      },
      {
        id: '6',
        name: 'Domain B',
        description: 'Domain B information',
        priority: priority.GENERIC,
        complexity: complexity.SIMPLE,
      },
    ],
  },
  historyComplexity: {
    '1': [
      {
        value: complexity.COMPLICATED,
        date: '2022-11-02',
        changeReason:
          'Complex sitation was resolved, so complexity switched' +
          ' to complicated.',
      },
      {
        value: complexity.COMPLEX,
        date: '2022-10-05',
        changeReason: 'Something happened and complexity increased.',
      },
      {
        value: complexity.COMPLICATED,
        date: '2022-06-15',
        changeReason: 'It just got more complicated.',
      },
      {
        value: complexity.SIMPLE,
        date: '2022-03-24',
      },
      {
        value: complexity.COMPLEX,
        date: '2022-01-24',
      },
      {
        value: complexity.COMPLICATED,
        date: '2021-11-21',
      },
    ],
    '3': [
      {
        value: complexity.SIMPLE,
        date: '2022-09-10',
      },
    ],
  },

  historyPriority: {
    '1': [
      {
        value: priority.CORE,
        date: '2022-05-10',
        changeReason:
          'Suddenly main topic in this project. This is a very' +
          ' long note. Very long. I do not know what else to write. Maybe' +
          ' some more sentences will break the layout?',
      },
      {
        value: priority.GENERIC,
        date: '2021-12-27',
        changeReason: 'Not so important anymore for some reason.',
      },
      {
        value: priority.SUPPORTING,
        date: '2021-11-21',
      },
    ],
  },
};

const initialTeamsState = {
  teams: {
    '1': [
      {
        channels: [
          { type: channelType.SLACK, name: '#aweseome-team' },
          { type: channelType.SLACK, name: '#all-teams' },
        ],
        cognitiveLoad: 13,
        domains: ['1', '2'],
        focus: 'Doing awesome things.',
        fte: 4,
        id: '1',
        meetings: [
          {
            purpose: 'Daily sync',
            day: meetingsDay.DAILY,
            time: '10:00',
            durationMinutes: 15,
          },
          {
            purpose: 'Weekly questions',
            day: meetingsDay.THURSDAY,
            time: '15:30',
            durationMinutes: 45,
          },
        ],
        name: 'Awesome Team',
        services: [
          {
            name: 'Awesome Service',
            url: 'https://anexampleservice.com',
            repository: 'https://github.com/example.com/example-service-a',
            versioningType: versioningType.SEMANTIC,
          },
          {
            name: 'Another awesome Service',
            url: 'https://anexampleservice.com',
            repository: 'https://github.com/example.com/example-service-a',
            versioningType: versioningType.SEMANTIC,
          },
        ],
        teamCreationDate: '2022-01-01',
        type: teamType.STREAM_ALIGNED,
        waysOfWorking: [
          {
            name: 'Scrum',
            url: 'https://scrumguides.org/',
          },
          {
            name: 'Very custom agile way of working',
          },
        ],
        wikiSearchTerms: ['awesome', 'team', 'great things'],
        workInProgress: [
          {
            summary: 'Internal things that need fixing',
            repository: 'https://github.com/example.com/example-service-a',
          },
          {
            summary: 'Organizing some meeting stuff',
          },
        ],
      },
      {
        channels: [{ type: channelType.SLACK, name: '#perfect-team' }],
        cognitiveLoad: 19,
        domains: ['3', '4'],
        focus: '',
        fte: 5,
        id: '2',
        meetings: [
          {
            purpose: 'Daily sync',
            day: meetingsDay.DAILY,
            time: '9:30',
            durationMinutes: 15,
          },
        ],
        name: 'Perfect Team',
        platform: 'Perfect platform',
        services: [
          {
            name: 'Perfect Service',
            url: 'https://anexampleservice.com',
            repository: 'https://github.com/example.com/example-service-a',
            versioningType: versioningType.SEMANTIC,
          },
        ],
        teamCreationDate: '2022-01-01',
        type: teamType.PLATFORM,
        waysOfWorking: [
          {
            name: 'Scrum',
            url: 'https://scrumguides.org/',
          },
          {
            name: 'Lean',
            url: 'https://example.internal-wiki.com/ways-of-working/lean',
          },
        ],
        workInProgress: [
          {
            summary: 'Improving some awesome service stuff',
            repository: 'https://github.com/example.com/example-service-a',
          },
          {
            summary: 'Internal things that need fixing',
            repository: 'https://github.com/example.com/example-service-a',
          },
        ],
      },
      {
        cognitiveLoad: 18,
        domains: ['1', '4'],
        focus: '',
        fte: 5,
        id: '3',
        name: 'Random Team',
        teamCreationDate: '2022-01-01',
        type: teamType.ENABLING,
      },
      {
        cognitiveLoad: 12,
        domains: ['1'],
        focus: '',
        fte: 2,
        id: '4',
        name: 'Party Team',
        teamCreationDate: '2022-01-01',
        type: teamType.COMPLICATED_SUBSYSTEM,
      },
      {
        cognitiveLoad: 12,
        domains: ['1'],
        focus: '',
        fte: 2,
        id: '7',
        name: 'New Team',
        teamCreationDate: '2022-11-01',
        type: teamType.UNDEFINED,
      },
    ],
    '2': [
      {
        cognitiveLoad: 0,
        focus: '',
        fte: 2,
        id: '5',
        name: 'Unwanted Team',
        teamCreationDate: '2022-01-01',
        type: teamType.ENABLING,
      },
      {
        cognitiveLoad: 0,
        focus: '',
        fte: 1,
        id: '7',
        name: 'Solo Team',
        teamCreationDate: '2022-01-01',
        type: teamType.PLATFORM,
      },
    ],
    '3': [
      {
        cognitiveLoad: 20,
        focus: '',
        fte: 1,
        id: '6',
        name: 'Undecided Team',
        teamCreationDate: '2022-01-01',
        type: teamType.UNDEFINED,
      },
    ],
    '4': [],
  },
  dependencies: {
    '1': [
      {
        fromTeamId: '1',
        toTeamId: '2',
        dependencyType: dependencyType.BLOCKING,
        description: 'We urgently need the implementation from this team.',
      },
      {
        fromTeamId: '1',
        toTeamId: '3',
        dependencyType: dependencyType.OK,
        description: 'Nothing that needs to happen soon. We are just talking.',
      },
      {
        fromTeamId: '1',
        toTeamId: '4',
        dependencyType: dependencyType.OK,
        description: 'Just random stuff.',
      },
      {
        fromTeamId: '4',
        toTeamId: '2',
        dependencyType: dependencyType.SLOWING,
        description: 'Something should happen there, soon...',
      },
      {
        fromTeamId: '4',
        toTeamId: '3',
        dependencyType: dependencyType.SLOWING,
        description: 'Another blocking dependency.',
      },
    ],
    '2': [
      {
        fromTeamId: '5',
        toTeamId: '7',
        dependencyType: dependencyType.BLOCKING,
        description: 'We urgently need the implementation from this team.',
      },
    ],
  },
  interactions: {
    '1': [
      {
        teamIdOne: '1',
        teamIdTwo: '2',
        interactionMode: interactionMode.X_AS_A_SERVICE,
        purpose:
          'Perfect team provides services so awesome team will be faster.',
        startDate: '2022/09/10',
        expectedDuration: 12,
        additionalInformation: 'We love working with this team',
      },
      {
        teamIdOne: '1',
        teamIdTwo: '3',
        interactionMode: interactionMode.FACILITATING,
        purpose: 'Work together, so Aweseome Team learns a lot.',
        startDate: '2022/11/01',
        expectedDuration: 2,
        additionalInformation: 'All going according to plan',
      },
      {
        teamIdOne: '1',
        teamIdTwo: '4',
        interactionMode: interactionMode.COLLABORATION,
        purpose: 'We need to find a good solution for a complicated problem.',
        startDate: '2022/09/10',
        expectedDuration: 20,
      },
      {
        teamIdOne: '2',
        teamIdTwo: '4',
        interactionMode: interactionMode.COLLABORATION,
        purpose: 'We need to find a good solution for a complicated problem.',
        startDate: '2022/07/15',
        expectedDuration: 5,
      },
      {
        teamIdOne: '2',
        teamIdTwo: '7',
        interactionMode: interactionMode.UNDEFINED,
        purpose: 'We do not know yet.',
        startDate: '2023/11/13',
        expectedDuration: 1,
      },
      {
        teamIdOne: '1',
        teamIdTwo: '7',
        interactionMode: interactionMode.COLLABORATION,
        purpose: 'We want to work closely together soon.',
        startDate: '2023/02/13',
        expectedDuration: 10,
      },
    ],
  },
  historyFte: {
    '1': [
      { value: 1, date: '2021-07-13' },
      {
        value: 3,
        date: '2021-07-20',
        changeReason: 'Finally the team is complete.',
      },
      {
        value: 4,
        date: '2021-12-10',
        changeReason:
          'Things got more complicated, we needed another team member.',
      },
      {
        value: 6,
        date: '2022-04-02',
        changeReason: 'Services are growing.',
      },
      {
        value: 5,
        date: '2022-08-13',
        changeReason: 'Amber is on materinty leave.',
      },
      {
        value: 4,
        date: '2022-11-11',
        changeReason: 'John found another job :(. Looking for new members.',
      },
    ],
  },
  historyCognitiveLoad: {
    '1': [
      { value: 5, date: '2021-07-13' },
      {
        value: 20,
        date: '2021-08-20',
        changeReason: 'A lot to learn. A lot.',
      },
      {
        value: 16,
        date: '2021-10-10',
        changeReason: 'Regular check in.',
      },
      {
        value: 18,
        date: '2022-03-10',
        changeReason: 'Still a lot, we are looking for a new member.',
      },
      {
        value: 12,
        date: '2022-06-03',
        changeReason: 'Regular check in.',
      },
      {
        value: 13,
        date: '2022-11-03',
        changeReason: 'Regular check in.',
      },
    ],
  },
  historyDomains: {
    '1': [
      {
        domains: ['1', '2'],
        date: '2022-11-10',
        changeReason: 'Taking over a domain because of xyz.',
      },
      {
        domains: ['2'],
        date: '2021-11-13',
        changeReason: 'Domain a is not continued anymore.',
      },
      {
        domains: ['2', 'a'],
        date: '2021-07-30',
      },
      {
        domains: [],
        date: '2021-07-13',
      },
    ],
  },
  historyTeamTypes: {
    '1': [
      {
        teamType: teamType.STREAM_ALIGNED,
        date: '2022-11-09',
        changeReason: 'Finally found the correct team type.',
      },
      {
        teamType: teamType.ENABLING,
        date: '2022-11-06',
        changeReason: 'Triyng to be an enabling team.',
      },
      {
        teamType: teamType.UNDEFINED,
        date: '2022-07-13',
      },
    ],
    '2': [
      {
        teamType: teamType.PLATFORM,
        date: '2022-11-05',
        changeReason: 'Finally found the correct team type.',
      },
      {
        teamType: teamType.UNDEFINED,
        date: '2022-07-13',
      },
    ],
  },
  historyDependencies: {
    '1': [
      {
        dependency: {
          fromTeamId: '1',
          toTeamId: '2',
          dependencyType: dependencyType.BLOCKING,
          description: 'We urgently need the implementation from this team.',
        },
        date: '2022-11-07',
        changeReason: 'Blocker added because deadline is coming closer.',
        changeType: changeType.CHANGED,
      },
      {
        dependency: {
          fromTeamId: '1',
          toTeamId: '2',
          dependencyType: dependencyType.SLOWING,
          description: 'We need the implementation from this team.',
        },
        date: '2022-11-01',
        changeReason: 'Added know dependency.',
        changeType: changeType.ADDED,
      },
      {
        dependency: {
          fromTeamId: '1',
          toTeamId: '3',
          dependencyType: dependencyType.OK,
          description:
            'Nothing that needs to happen soon. We are just talking.',
        },
        date: '2022-10-27',
        changeReason:
          'Constant talking added as dependency to make things' +
          ' more visible.',
        changeType: changeType.ADDED,
      },
      {
        dependency: {
          fromTeamId: '1',
          toTeamId: '4',
          dependencyType: dependencyType.OK,
          description: 'Just random stuff.',
        },
        date: '2022-11-16',
        changeType: changeType.ADDED,
      },
      {
        dependency: {
          fromTeamId: '4',
          toTeamId: '2',
          dependencyType: dependencyType.SLOWING,
          description: 'Something should happen there, soon...',
        },
        date: '2022-10-02',
        changeType: changeType.ADDED,
      },
      {
        dependency: {
          fromTeamId: '4',
          toTeamId: '3',
          dependencyType: dependencyType.SLOWING,
          description: 'Another blocking dependency.',
        },
        date: '2022-11-09',
        changeType: changeType.ADDED,
      },
      {
        dependency: {
          fromTeamId: '1',
          toTeamId: '4',
          dependencyType: dependencyType.OK,
          description: 'Know dependency because of xyz, no problems expected.',
        },
        date: '2022-07-20',
        changeReason: 'Dependency resolved.',
        changeType: changeType.REMOVED,
      },
      {
        dependency: {
          fromTeamId: '1',
          toTeamId: '4',
          dependencyType: dependencyType.OK,
          description: 'Know dependency because of xyz, no problems expected.',
        },
        date: '2022-07-02',
        changeReason: 'Make dependency visible.',
        changeType: changeType.ADDED,
      },
      {
        dependency: {
          fromTeamId: '1',
          toTeamId: '2',
          dependencyType: dependencyType.OK,
          description: 'Know dependency because of xyz, no problems expected.',
        },
        date: '2022-06-16',
        changeReason: 'Dependency resolved.',
        changeType: changeType.REMOVED,
      },
      {
        dependency: {
          fromTeamId: '1',
          toTeamId: '2',
          dependencyType: dependencyType.OK,
          description: 'Know dependency because of xyz, no problems expected.',
        },
        date: '2022-05-23',
        changeReason: 'Make dependency visible.',
        changeType: changeType.ADDED,
      },
      {
        dependency: {
          fromTeamId: '2',
          toTeamId: '3',
          dependencyType: dependencyType.BLOCKING,
          description: 'Urgently waiting on finishing the service.',
        },
        date: '2022-08-10',
        changeReason: 'Dependency resolved.',
        changeType: changeType.REMOVED,
      },
      {
        dependency: {
          fromTeamId: '2',
          toTeamId: '3',
          dependencyType: dependencyType.BLOCKING,
          description: 'Urgently waiting on finishing the service.',
        },
        date: '2022-07-21',
        changeReason: 'Dependency got worse.',
        changeType: changeType.CHANGED,
      },
      {
        dependency: {
          fromTeamId: '2',
          toTeamId: '3',
          dependencyType: dependencyType.SLOWING,
          description: 'Waiting on finishing the service.',
        },
        date: '2022-06-01',
        changeReason: 'Make dependency visible.',
        changeType: changeType.ADDED,
      },
    ],
    '2': [
      {
        dependency: {
          fromTeamId: '5',
          toTeamId: '7',
          dependencyType: dependencyType.BLOCKING,
          description: 'We urgently need the implementation from this team.',
        },
        date: '2022-11-05',
        changeType: changeType.ADDED,
      },
      {
        dependency: {
          fromTeamId: '5',
          toTeamId: '7',
          dependencyType: dependencyType.OK,
          description: 'We urgently need the implementation from this team.',
        },
        date: '2022-11-04',
        changeType: changeType.REMOVED,
      },
      {
        dependency: {
          fromTeamId: '5',
          toTeamId: '7',
          dependencyType: dependencyType.OK,
          description: 'We urgently need the implementation from this team.',
        },
        date: '2022-11-03',
        changeType: changeType.CHANGED,
      },
      {
        dependency: {
          fromTeamId: '5',
          toTeamId: '7',
          dependencyType: dependencyType.SLOWING,
          description: 'We urgently need the implementation from this team.',
        },
        date: '2022-11-02',
        changeType: changeType.CHANGED,
      },
      {
        dependency: {
          fromTeamId: '5',
          toTeamId: '7',
          dependencyType: dependencyType.BLOCKING,
          description: 'We urgently need the implementation from this team.',
        },
        date: '2022-11-01',
        changeType: changeType.ADDED,
      },
    ],
  },
  historyInteractions: {
    '1': [
      {
        interaction: {
          teamIdOne: '1',
          teamIdTwo: '7',
          interactionMode: interactionMode.COLLABORATION,
          purpose: 'We want to work closely together soon.',
          startDate: '2023/02/13',
          expectedDuration: 10,
        },
        date: '2022-11-11',
        changeType: changeType.ADDED,
      },
      {
        interaction: {
          teamIdOne: '1',
          teamIdTwo: '3',
          interactionMode: interactionMode.FACILITATING,
          purpose: 'Work together, so Aweseome Team learns a lot.',
          startDate: '2022/11/01',
          expectedDuration: 2,
          additionalInformation: 'All going according to plan',
        },
        date: '2022-11-01',
        changeType: changeType.ADDED,
      },
      {
        interaction: {
          teamIdOne: '1',
          teamIdTwo: '3',
          interactionMode: interactionMode.FACILITATING,
          purpose: 'Work together, so Aweseome Team learns a lot.',
          startDate: '2022/09/10',
          expectedDuration: 2,
        },
        date: '2022-09-30',
        changeType: changeType.REMOVED,
        changeReason: 'Support not needed anymore.',
      },
      {
        interaction: {
          teamIdOne: '1',
          teamIdTwo: '3',
          interactionMode: interactionMode.FACILITATING,
          purpose: 'Supporting AwesomeTeam in doing awesome things.',
          startDate: '2022/09/10',
          expectedDuration: 2,
        },
        date: '2022-09-10',
        changeType: changeType.ADDED,
        changeReason: 'Support is needed.',
      },
      {
        interaction: {
          teamIdOne: '1',
          teamIdTwo: '4',
          interactionMode: interactionMode.COLLABORATION,
          purpose: 'We need to find a good solution for a complicated problem.',
          startDate: '2022/10/30',
          expectedDuration: 20,
        },
        date: '2022-10-15',
        changeType: changeType.CHANGED,
        changeReason: 'Deeper collaboration needed, also start date changed.',
      },
      {
        interaction: {
          teamIdOne: '1',
          teamIdTwo: '4',
          interactionMode: interactionMode.FACILITATING,
          purpose: 'Helping to find a good solution for a complicated problem.',
          startDate: '2022/10/10',
          expectedDuration: 20,
        },
        date: '2022-10-09',
        changeType: changeType.ADDED,
      },
      {
        interaction: {
          teamIdOne: '1',
          teamIdTwo: '2',
          interactionMode: interactionMode.X_AS_A_SERVICE,
          purpose:
            'Perfect team provides services so awesome team will be faster.',
          startDate: '2022/09/10',
          expectedDuration: 12,
          additionalInformation: 'We love working with this team',
        },
        date: '2022-09-01',
        changeType: changeType.ADDED,
      },
    ],
  },
};
