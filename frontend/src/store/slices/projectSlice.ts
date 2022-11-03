import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IProject {
  id: string;
  name: string;
  description: string;
}

interface IInitialState {
  currentProject: string;
  projects: IProject[];
}

export const initialState: IInitialState = {
  currentProject: 'test project',
  projects: [
    {
      id: '1',
      name: 'Test Project',
      description: 'Some context for test project.',
    },
    {
      id: '2',
      name: 'Another Project',
      description: 'Some context.',
    },
    {
      id: '3',
      name: 'Some Random Project',
      description:
        'Some more context. Some more context. Some more context.' +
        ' Some more context. Some more context. Some more context. Some' +
        ' more context. Some more context. Some more context. Some more' +
        ' context. Some more context. Some more context.',
    },
  ],
};

const projectSlice = createSlice({
  name: 'project',
  initialState: initialState,
  reducers: {
    setCurrentProject: (state, { payload }: PayloadAction<string>) => {
      state.currentProject = payload;
    },
  },
});

export const projectReducer = projectSlice.reducer;
export const { setCurrentProject } = projectSlice.actions;
