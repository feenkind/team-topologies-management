import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { complexity, priority } from '../../constants/categories';

export interface IDomain {
  id: string;
  name: string;
  description: string;
  priority: priority;
  complexity: complexity;
}

interface IDomainData extends IDomain {
  projectId: string;
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
  reducers: {
    addAllDomains: (state, { payload }: PayloadAction<IDomainData[]>) => {
      payload.forEach((domainData) => {
        const domain = {
          id: domainData.id,
          name: domainData.name,
          description: domainData.description,
          priority: domainData.priority,
          complexity: domainData.complexity,
        };

        if (!state.domains[domainData.projectId]) {
          state.domains[domainData.projectId] = [];
        }

        if (
          !state.domains[domainData.projectId].find(
            (domain) => domain.id === domainData.id,
          )
        ) {
          state.domains[domainData.projectId].push(domain);
        }
      });
    },
  },
});

export const domainReducer = domainSlice.reducer;
export const { addAllDomains } = domainSlice.actions;
