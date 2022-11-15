import { configureStore } from '@reduxjs/toolkit';
import { projectReducer } from './slices/projectSlice';
import { domainReducer } from './slices/domainSlice';
import { teamReducer } from './slices/teamSlice';
import { notificationReducer } from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    domain: domainReducer,
    notification: notificationReducer,
    project: projectReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
