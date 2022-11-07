import { createSlice } from '@reduxjs/toolkit';

interface IDomain {
  id: string;
  name: string;
  description: string;
  priority: 'core' | 'supporting' | 'generic';
  complexity: 'simple' | 'complicated' | 'complex';
}

interface IInitialState {
  domains: {
    [keys: string]: IDomain[];
  };
}

export const initialState: IInitialState = {
  domains: {
    '1': [
      {
        id: '1',
        name: 'Shopping Cart',
        description: 'Description for the domain "Shopping Cart"',
        priority: 'supporting',
        complexity: 'complicated',
      },
      {
        id: '2',
        name: 'Checkout',
        description:
          'Description for the domain "Checkout" with some more' +
          ' information...',
        priority: 'core',
        complexity: 'complex',
      },
      {
        id: '3',
        name: 'Products',
        description: 'Some product domain description',
        priority: 'generic',
        complexity: 'simple',
      },
      {
        id: '4',
        name: 'Registration',
        description: 'Registration is super easy.',
        priority: 'generic',
        complexity: 'simple',
      },
    ],
    '2': [
      {
        id: '1',
        name: 'Domain A',
        description: 'More information for a domain should be provided...',
        priority: 'supporting',
        complexity: 'complicated',
      },
      {
        id: '2',
        name: 'Domain B',
        description: 'Domain B information',
        priority: 'generic',
        complexity: 'simple',
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
