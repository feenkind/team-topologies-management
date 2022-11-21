import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IProject {
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
    id: '1',
    name: 'A Shopping Platform',
  },
  projects: [
    {
      id: '1',
      name: 'A Shopping Platform',
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
    {
      id: '4',
      name: 'Brand new project',
      description: 'We do not know anything yet.',
    },
  ],
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
    addProject: (state, { payload }: PayloadAction<IProject>) => {
      state.projects.push(payload);
      state.currentProject.id = payload.id;
      state.currentProject.name = payload.name;
    },
  },
});

export const projectReducer = projectSlice.reducer;
export const { setCurrentProject, addProject } = projectSlice.actions;
