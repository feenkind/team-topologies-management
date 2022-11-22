import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { complexity, priority } from '../../constants/categories';

export interface IDomain {
  id: string;
  name: string;
  description: string;
  priority: priority;
  complexity: complexity;
}

interface IDomainHistory extends IDomain {
  domainId: string;
  createdAt: string;
  changeNote: string;
}

interface IDomainDataWithHistory extends IDomain {
  projectId: string;
  DomainHistory: IDomainHistory[];
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
        const domain = {
          id: domainData.id,
          name: domainData.name,
          description: domainData.description,
          priority: domainData.priority,
          complexity: domainData.complexity,
        };

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

        if (domainData.DomainHistory.length > 0) {
          state.historyComplexity = {
            ...state.historyComplexity,
            [domainData.id]: [],
          };
          state.historyPriority = {
            ...state.historyPriority,
            [domainData.id]: [],
          };
        }

        for (let i = 0; i < domainData.DomainHistory.length; i++) {
          // first history value is always relevant
          if (i === 0) {
            state.historyComplexity[domainData.id].push({
              value: domainData.DomainHistory[i].complexity,
              date: domainData.DomainHistory[i].createdAt,
              changeReason: domainData.DomainHistory[i].changeNote,
            });

            state.historyPriority[domainData.id].push({
              value: domainData.DomainHistory[i].priority,
              date: domainData.DomainHistory[i].createdAt,
              changeReason: domainData.DomainHistory[i].changeNote,
            });

            continue;
          }

          // check if complexity value changed and save to history, if so
          if (
            domainData.DomainHistory[i - 1].complexity !==
            domainData.DomainHistory[i].complexity
          ) {
            state.historyComplexity[domainData.id].push({
              value: domainData.DomainHistory[i].complexity,
              date: domainData.DomainHistory[i].createdAt,
              changeReason: domainData.DomainHistory[i].changeNote,
            });
          }

          // check if priority value changed and save to history, if so
          if (
            domainData.DomainHistory[i - 1].priority !==
            domainData.DomainHistory[i].priority
          ) {
            state.historyPriority[domainData.id].push({
              value: domainData.DomainHistory[i].priority,
              date: domainData.DomainHistory[i].createdAt,
              changeReason: domainData.DomainHistory[i].changeNote,
            });
          }
        }
      });

      return state;
    },
  },
});

export const domainReducer = domainSlice.reducer;
export const { addAllDomainsWithHistory } = domainSlice.actions;
