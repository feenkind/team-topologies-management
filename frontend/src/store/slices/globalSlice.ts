import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  isDataLoaded: boolean;
}

export const initialState: IInitialState = {
  isDataLoaded: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    setDataLoaded: (state, { payload }: PayloadAction<boolean>) => {
      state.isDataLoaded = payload;
    },
  },
});

export const globalReducer = globalSlice.reducer;
export const { setDataLoaded } = globalSlice.actions;
