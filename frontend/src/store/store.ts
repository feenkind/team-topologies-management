import { configureStore } from '@reduxjs/toolkit';
import { projectReducer } from './slices/projectSlice';
import { domainReducer } from './slices/domainSlice';
import { teamReducer } from './slices/teamSlice';

export const store = configureStore({
  reducer: {
    project: projectReducer,
    domain: domainReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
