import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Invoice, InvoiceState } from '../../models';

const invoices = createSlice({
  name: 'products',
  initialState: {
    draft: [],
    issued: [],
  } as Record<InvoiceState, Invoice[]>,
  reducers: {
    saveInvoice: (state, { payload: invoice }: PayloadAction<Invoice>) => {
      state[invoice.state].push(invoice);
    },
  },
});

export default invoices;
export const { saveInvoice } = invoices.actions;
