import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Customer } from '../../models';
import { customers as initialState } from '../fake-data';

const customers = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    saveCustomer(state, action: PayloadAction<Customer>) {
      state.push(action.payload);
    }
  },
});

export default customers;
export const { saveCustomer } = customers.actions;
