import { createSlice } from '@reduxjs/toolkit';
import { complexity, priority } from '../../constants/categories';

export interface IDomain {
  id: string;
  name: string;
  description: string;
  priority: priority;
  complexity: complexity;
}

interface IComplexityHistoricValue {
  value: complexity;
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
    [keys: string]: IComplexityHistoricValue[];
  };
}

export const initialState: IInitialState = {
  domains: {
    '1': [
      {
        id: '1',
        name: 'Shopping Cart',
        description: 'Description for the domain "Shopping Cart"',
        priority: priority.SUPPORTING,
        complexity: complexity.COMPLICATED,
      },
      {
        id: '2',
        name: 'Checkout',
        description:
          'Description for the domain "Checkout" with some more' +
          ' information... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\n' +
          '        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim\n' +
          '        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n' +
          '        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate\n' +
          '        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint\n' +
          '        occaecat cupidatat non proident, sunt in culpa qui officia deserunt\n' +
          '        mollit anim id est laborum.',
        priority: priority.CORE,
        complexity: complexity.COMPLEX,
      },
      {
        id: '3',
        name: 'Products',
        description: 'Some product domain description',
        priority: priority.SUPPORTING,
        complexity: complexity.SIMPLE,
      },
      {
        id: '4',
        name: 'Registration',
        description: 'Registration is super easy.',
        priority: priority.GENERIC,
        complexity: complexity.SIMPLE,
      },
    ],
    '2': [
      {
        id: '5',
        name: 'Domain A',
        description: 'More information for a domain should be provided...',
        priority: priority.SUPPORTING,
        complexity: complexity.COMPLICATED,
      },
      {
        id: '6',
        name: 'Domain B',
        description: 'Domain B information',
        priority: priority.GENERIC,
        complexity: complexity.SIMPLE,
      },
    ],
  },
  historyComplexity: {
    '1': [
      {
        value: complexity.COMPLICATED,
        date: '2022-11-02',
        changeReason:
          'Complex sitation was resolved, so complexity switched' +
          ' to complicated.',
      },
      {
        value: complexity.COMPLEX,
        date: '2022-10-05',
        changeReason: 'Something happened and complexity increased.',
      },
      {
        value: complexity.COMPLICATED,
        date: '2022-06-15',
        changeReason: 'It just got more complicated.',
      },
      {
        value: complexity.SIMPLE,
        date: '2022-03-24',
      },
    ],
    '3': [
      {
        value: complexity.SIMPLE,
        date: '2022-09-10',
      },
    ],
  },
};

const domainSlice = createSlice({
  name: 'domain',
  initialState: initialState,
  reducers: {},
});

export const domainReducer = domainSlice.reducer;
export const {} = domainSlice.actions;
