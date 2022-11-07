import { createSlice } from '@reduxjs/toolkit';
import { teamTopology } from '../../constants/categories';

interface ITeam {
  id: string;
  name: string;
  topology: teamTopology;
  domains?: string[];
  fte: number;
  cognitiveLoad: number;
}

interface IInitialState {
  teams: ITeam[];
}

export const initialState: IInitialState = {
  teams: [
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
      domains: ['1', '3'],
      fte: 3,
      cognitiveLoad: 10,
    },
  ],
};

const teamSlice = createSlice({
  name: 'team',
  initialState: initialState,
  reducers: {},
});

export const teamReducer = teamSlice.reducer;
export const {} = teamSlice.actions;
