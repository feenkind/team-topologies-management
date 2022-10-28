import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  currentProject: string;
}

export const initialState: IInitialState = {
  currentProject: 'test project',
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
