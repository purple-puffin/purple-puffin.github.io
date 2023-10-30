import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Customer } from '../../models';

export type NewCustomer = Omit<Customer, 'id'>;

export interface State extends NewCustomer {
  disabled: boolean;
}

const initialState: State = {
  disabled: false,
  name: '',
};

type SetFieldAction = PayloadAction<{ name: keyof NewCustomer, value: string; }>;

const customerForm = createSlice({
  name: 'customerForm',
  initialState,
  reducers: {
    clearForm(state) {
      state.name = '';
      delete state.phone;
      delete state.inn;
      delete state.document;
      delete state.note;
    },
    setDisabled(state, action: PayloadAction<boolean>) {
      state.disabled = action.payload;
    },
    setField(state, { payload: { name, value } }: SetFieldAction) {
      state[name] = value;
    },
  },
});

export default customerForm;
export const { clearForm, setDisabled, setField } = customerForm.actions;
