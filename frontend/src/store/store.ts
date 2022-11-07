import { configureStore } from '@reduxjs/toolkit';
import { projectReducer } from './slices/projectSlice';
import { domainReducer } from './slices/domainSlice';

export const store = configureStore({
  reducer: {
    project: projectReducer,
    domain: domainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
