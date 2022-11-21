import { createSlice } from '@reduxjs/toolkit';
import { complexity, priority } from '../../constants/categories';

export interface IDomain {
  id: string;
  name: string;
  description: string;
  priority: priority;
  complexity: complexity;
}

export interface IHistoricValue {
  value: complexity | priority;
  date: string;
  changeReason?: string;
}

interface IInitialState {
  // domains ordered by project
  domains: {
    [keys: string]: IDomain[];
  };
  // history ordered by domain id
  historyComplexity: {
    [keys: string]: IHistoricValue[];
  };
  historyPriority: {
    [keys: string]: IHistoricValue[];
  };
}

export const initialState: IInitialState = {
  domains: {},
  historyComplexity: {},
  historyPriority: {},
};

const domainSlice = createSlice({
  name: 'domain',
  initialState: initialState,
  reducers: {},
});

export const domainReducer = domainSlice.reducer;
export const {} = domainSlice.actions;
