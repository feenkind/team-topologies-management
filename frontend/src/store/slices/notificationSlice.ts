import { createSlice } from '@reduxjs/toolkit';
import {
  notificationArea,
  notificationType,
} from '../../constants/notifications';

interface INotification {
  id: string;
  type: notificationType;
  area: notificationArea;
  summary: string;
  reason: string;
  date: Date;
  read: boolean;
}

interface IInitialState {
  notifications: INotification[];
}

export const initialState: IInitialState = {
  notifications: [
    {
      id: '1',
      type: notificationType.REMINDER,
      area: notificationArea.TEAM_INTERACTIONS,
      summary: 'Check the priority of domain "registration"',
      reason:
        'The priority of a domain should be checked at least every 6 months. ',
      date: new Date('2022-03-29'),
      read: true,
    },
    {
      id: '2',
      type: notificationType.REMINDER,
      area: notificationArea.TEAM_INTERACTIONS,
      summary:
        'Check the interaction mode between AwesomeTeam and SomeRandomTeam',
      reason:
        'The interaction mode “facilitating” already exists for more than 3' +
        ' weeks.',
      date: new Date('2022-05-21'),
      read: false,
    },
    {
      id: '3',
      type: notificationType.WARNING,
      area: notificationArea.TEAM_INTERACTIONS,
      summary:
        'Check the interaction mode between AwesomeTeam and SomeRandomTeam',
      reason:
        'The interaction mode “facilitating” already exists for more than 6 months.',
      date: new Date('2022-11-01'),
      read: false,
    },
    {
      id: '4',
      type: notificationType.REMINDER,
      area: notificationArea.DOMAIN,
      summary: 'Check the complexity of domain "registration"',
      reason: 'A regular complexity check of domains is recommended.',
      date: new Date('2022-10-07'),
      read: false,
    },
  ],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {},
});

export const notificationReducer = notificationSlice.reducer;
export const {} = notificationSlice.actions;
