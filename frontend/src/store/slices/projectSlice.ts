import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IProject {
  id: string;
  name: string;
  description: string;
}

interface IInitialState {
  currentProject: {
    id: string;
    name: string;
  };
  projects: IProject[];
}

export const initialState: IInitialState = {
  currentProject: {
    id: '',
    name: '',
  },
  projects: [],
};

const projectSlice = createSlice({
  name: 'project',
  initialState: initialState,
  reducers: {
    setCurrentProject: (state, { payload }: PayloadAction<string>) => {
      state.currentProject.id = payload;
      const currentProject = state.projects.find(
        (project) => project.id === payload,
      );
      state.currentProject.name = currentProject ? currentProject.name : '';
    },
    addAllProjects: (state, { payload }: PayloadAction<IProject[]>) => {
      state.projects = payload;
      state.currentProject.id = state.currentProject.id || payload[0].id || '';
      state.currentProject.name =
        state.currentProject.name || payload[0].name || '';
    },
  },
});

export const projectReducer = projectSlice.reducer;
export const { setCurrentProject, addAllProjects } = projectSlice.actions;
