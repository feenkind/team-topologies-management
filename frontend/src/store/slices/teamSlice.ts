import { createSlice } from '@reduxjs/toolkit';
import { dependencyType, teamTopology } from '../../constants/categories';
import { channelTypes, meetingsDay } from '../../constants/teamApi';

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
  topology: teamTopology;
  wikiSearchTerms?: string[];
}

export interface IDependency {
  fromTeamId: string;
  toTeamId: string;
  dependencyType: dependencyType;
  description?: string;
}

interface IInitialState {
  // teams ordered by project
  teams: {
    [keys: string]: ITeam[];
  };
  // dependencies ordered by project
  dependencies: { [keys: string]: IDependency[] };
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
        topology: teamTopology.STREAM_ALIGNED,
        wikiSearchTerms: ['awesome', 'team', 'great things'],
      },
      {
        channels: [{ type: channelTypes.SLACK, name: '#perfect-team' }],
        cognitiveLoad: 19,
        domains: ['3'],
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
        topology: teamTopology.PLATFORM,
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
};

const teamSlice = createSlice({
  name: 'team',
  initialState: initialState,
  reducers: {},
});

export const teamReducer = teamSlice.reducer;
export const {} = teamSlice.actions;
