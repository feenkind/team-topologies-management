import { createSlice } from '@reduxjs/toolkit';
import { dependencyType, teamTopology } from '../../constants/categories';

export interface ITeam {
  id: string;
  name: string;
  topology: teamTopology;
  domains?: string[];
  fte: number;
  cognitiveLoad: number;
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
        id: '1',
        name: 'Awesome Team',
        topology: teamTopology.STREAM_ALIGNED,
        domains: ['1', '2'],
        fte: 4,
        cognitiveLoad: 13,
      },
      {
        id: '2',
        name: 'Perfect Team',
        topology: teamTopology.PLATFORM,
        domains: ['3'],
        fte: 5,
        cognitiveLoad: 19,
      },
      {
        id: '3',
        name: 'Random Team',
        topology: teamTopology.ENABLING,
        domains: ['1', '4'],
        fte: 5,
        cognitiveLoad: 18,
      },
      {
        id: '4',
        name: 'Party Team',
        topology: teamTopology.COMPLICATED_SUBSYSTEM,
        domains: ['1'],
        fte: 2,
        cognitiveLoad: 12,
      },
    ],
    '2': [
      {
        id: '5',
        name: 'Unwanted Team',
        topology: teamTopology.ENABLING,
        fte: 2,
        cognitiveLoad: 0,
      },
    ],
    '3': [
      {
        id: '6',
        name: 'Undecided Team',
        topology: teamTopology.UNDEFINED,
        fte: 1,
        cognitiveLoad: 0,
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
        fromTeamId: '4',
        toTeamId: '2',
        dependencyType: dependencyType.SLOWING,
        description: 'Something should happen there, soon...',
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
