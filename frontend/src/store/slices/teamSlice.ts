import { createSlice } from '@reduxjs/toolkit';
import {
  dependencyType,
  interactionMode,
  teamTopology,
} from '../../constants/categories';
import {
  channelTypes,
  meetingsDay,
  versioningType,
} from '../../constants/teamApi';

interface IChannel {
  type: channelTypes;
  name: string;
}

interface IMeeting {
  purpose: string;
  day: meetingsDay;
  time: string;
  durationMinutes: number;
}

interface IService {
  name: string;
  url: string;
  repository: string;
  versioningType: versioningType;
}

interface IWorkInProgress {
  summary: string;
  repository?: string;
}

interface IWaysOfWorking {
  name: string;
  url?: string;
}

export interface ITeam {
  channels?: IChannel[];
  cognitiveLoad: number;
  domains?: string[];
  focus: string;
  fte: number;
  id: string;
  meetings?: IMeeting[];
  name: string;
  platform?: string;
  services?: IService[];
  topology: teamTopology;
  wikiSearchTerms?: string[];
  waysOfWorking?: IWaysOfWorking[];
  workInProgress?: IWorkInProgress[];
}

export interface IDependency {
  fromTeamId: string;
  toTeamId: string;
  dependencyType: dependencyType;
  description?: string;
}

interface IInteraction {
  teamIdOne: string;
  teamIdTwo: string;
  interactionMode: interactionMode;
  purpose: string;
  startDate: string;
  expectedDuration: number;
  additionalInformation?: string;
}

interface IInitialState {
  // teams ordered by project
  teams: {
    [keys: string]: ITeam[];
  };
  // dependencies ordered by project
  dependencies: { [keys: string]: IDependency[] };
  // interactions ordered by project
  interactions: { [keys: string]: IInteraction[] };
}

export const initialState: IInitialState = {
  teams: {
    '1': [
      {
        channels: [
          { type: channelTypes.SLACK, name: '#aweseome-team' },
          { type: channelTypes.SLACK, name: '#all-teams' },
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
        topology: teamTopology.STREAM_ALIGNED,
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
        channels: [{ type: channelTypes.SLACK, name: '#perfect-team' }],
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
        topology: teamTopology.PLATFORM,
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
        topology: teamTopology.ENABLING,
      },
      {
        cognitiveLoad: 12,
        domains: ['1'],
        focus: '',
        fte: 2,
        id: '4',
        name: 'Party Team',
        topology: teamTopology.COMPLICATED_SUBSYSTEM,
      },
    ],
    '2': [
      {
        cognitiveLoad: 0,
        focus: '',
        fte: 2,
        id: '5',
        name: 'Unwanted Team',
        topology: teamTopology.ENABLING,
      },
    ],
    '3': [
      {
        cognitiveLoad: 0,
        focus: '',
        fte: 1,
        id: '6',
        name: 'Undecided Team',
        topology: teamTopology.UNDEFINED,
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
  },
  interactions: {
    '1': [
      {
        teamIdOne: '1',
        teamIdTwo: '2',
        interactionMode: interactionMode.X_AS_A_SERVICE,
        purpose: 'Use the services from this perfect team',
        startDate: '2022/09/10',
        expectedDuration: 12,
        additionalInformation: 'We love working with this team',
      },
      {
        teamIdOne: '1',
        teamIdTwo: '3',
        interactionMode: interactionMode.FACILITATING,
        purpose: 'Learn a lot from this team',
        startDate: '2022/09/10',
        expectedDuration: 4,
        additionalInformation: 'All going according to plan',
      },
      {
        teamIdOne: '1',
        teamIdTwo: '4',
        interactionMode: interactionMode.COLLABORATION,
        purpose: 'We need to find a good solution for a complicated problem.',
        startDate: '2022/09/10',
        expectedDuration: 8,
      },
    ],
  },
};

const teamSlice = createSlice({
  name: 'team',
  initialState: initialState,
  reducers: {},
});

export const teamReducer = teamSlice.reducer;
export const {} = teamSlice.actions;
