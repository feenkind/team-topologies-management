import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IProject {
  id: string;
  name: string;
  description: string;
}

interface IInitialState {
  currentProjectId: string;
  projects: IProject[];
}

export const initialState: IInitialState = {
  currentProjectId: '',
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
    setCurrentProjectId: (state, { payload }: PayloadAction<string>) => {
      state.currentProjectId = payload;
    },
  },
});

export const projectReducer = projectSlice.reducer;
export const { setCurrentProjectId } = projectSlice.actions;
