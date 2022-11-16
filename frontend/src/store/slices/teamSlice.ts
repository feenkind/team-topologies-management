import { createSlice } from '@reduxjs/toolkit';
import {
  dependencyType,
  interactionMode,
  teamType,
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
  type: teamType;
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

export interface IInteraction {
  teamIdOne: string;
  teamIdTwo: string;
  interactionMode: interactionMode;
  purpose: string;
  startDate: string;
  expectedDuration: number;
  additionalInformation?: string;
}

export interface IHistoricFTEValue {
  value: number;
  date: string;
  changeReason?: string;
}

export interface IHistoricCognitiveLoadValue {
  value: number;
  date: string;
  changeReason?: string;
}

export interface IHistoricDomainResponsibility {
  domains: string[];
  date: string;
  changeReason?: string;
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
  // history ordered by team
  historyFte: {
    [keys: string]: IHistoricFTEValue[];
  };
  historyCognitiveLoad: {
    [keys: string]: IHistoricCognitiveLoadValue[];
  };
  historyDomains: {
    [keys: string]: IHistoricDomainResponsibility[];
  };
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
        type: teamType.ENABLING,
      },
      {
        cognitiveLoad: 12,
        domains: ['1'],
        focus: '',
        fte: 2,
        id: '4',
        name: 'Party Team',
        type: teamType.COMPLICATED_SUBSYSTEM,
      },
      {
        cognitiveLoad: 12,
        domains: ['1'],
        focus: '',
        fte: 2,
        id: '7',
        name: 'New Team',
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
        type: teamType.ENABLING,
      },
    ],
    '3': [
      {
        cognitiveLoad: 0,
        focus: '',
        fte: 1,
        id: '6',
        name: 'Undecided Team',
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
        startDate: '2022/09/09',
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
        teamIdTwo: '7',
        interactionMode: interactionMode.UNDEFINED,
        purpose: 'We do not know yet.',
        startDate: '2023/11/13',
        expectedDuration: 1,
      },
      {
        teamIdOne: '1',
        teamIdTwo: '3',
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
        changeReason: 'Getting used to the work.',
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
        date: '2021-07-13',
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
