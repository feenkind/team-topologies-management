import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { complexity, priority } from '../../../constants/categories';
import { IDomainDataWithHistory } from './interfacesDomainImport';
import {
  createDomain,
  createHistoricComplexityValue,
  createHistoricPriorityValue,
} from './mappingsDomainImport';

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
  reducers: {
    addAllDomainsWithHistory: (
      state,
      { payload }: PayloadAction<IDomainDataWithHistory[]>,
    ) => {
      state = { ...initialState };

      payload.forEach((domainData) => {
        const domain = createDomain(domainData);

        if (!state.domains[domainData.projectId]) {
          state.domains = { ...state.domains, [domainData.projectId]: [] };
        }

        if (
          !state.domains[domainData.projectId].find(
            (domain) => domain.id === domainData.id,
          )
        ) {
          state.domains[domainData.projectId].push(domain);
        }

        // order historic values asc by date
        domainData.DomainHistory.sort((a, b) =>
          new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1,
        );

        for (let i = 0; i < domainData.DomainHistory.length; i++) {
          const currentHistory = domainData.DomainHistory[i];

          // first history value is always relevant
          if (i === 0) {
            state.historyComplexity = {
              ...state.historyComplexity,
              [domainData.id]: [],
            };
            state.historyPriority = {
              ...state.historyPriority,
              [domainData.id]: [],
            };

            state.historyComplexity[domainData.id].push(
              createHistoricComplexityValue(currentHistory),
            );

            state.historyPriority[domainData.id].push(
              createHistoricPriorityValue(currentHistory),
            );

            continue;
          }

          const previousHistory = domainData.DomainHistory[i - 1];
          // check if complexity value changed and save to history, if so
          if (previousHistory.complexity !== currentHistory.complexity) {
            state.historyComplexity[domainData.id].push(
              createHistoricComplexityValue(currentHistory),
            );
          }

          // check if priority value changed and save to history, if so
          if (previousHistory.priority !== currentHistory.priority) {
            state.historyPriority[domainData.id].push(
              createHistoricPriorityValue(currentHistory),
            );
          }
        }
      });

      return state;
    },
  },
});

export const domainReducer = domainSlice.reducer;
export const { addAllDomainsWithHistory } = domainSlice.actions;
