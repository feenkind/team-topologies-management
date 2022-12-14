import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProjectImport } from '../../types/projectTypes';

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
    addAllProjects: (state, { payload }: PayloadAction<IProjectImport[]>) => {
      state.projects = payload.map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description,
      }));
      state.currentProject.id = payload[0] ? payload[0].id : '';
      state.currentProject.name = payload[0] ? payload[0].name : '';
    },
  },
});

export const projectReducer = projectSlice.reducer;
export const { setCurrentProject, addAllProjects } = projectSlice.actions;
