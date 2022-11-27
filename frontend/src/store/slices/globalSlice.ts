import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  dataLoaded: boolean;
  networkError: boolean;
  basicAuthDataSet: boolean;
}

export const initialState: IInitialState = {
  dataLoaded: false,
  networkError: false,
  basicAuthDataSet: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    setDataLoaded: (state, { payload }: PayloadAction<boolean>) => {
      state.dataLoaded = payload;
    },
    setNetworkError: (state, { payload }: PayloadAction<boolean>) => {
      state.networkError = payload;
    },
    setBasicAuthData: (state, { payload }: PayloadAction<boolean>) => {
      state.basicAuthDataSet = payload;
    },
  },
});

export const globalReducer = globalSlice.reducer;
export const { setDataLoaded, setNetworkError, setBasicAuthData } =
  globalSlice.actions;
