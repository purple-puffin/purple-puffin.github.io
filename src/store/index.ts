import { AnyAction, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import customerForm from './slices/customer-form';
import customers from './slices/customers';
import directory from './slices/directory';
import invoiceForm from './slices/invoice-form';
import invoices from './slices/invoices';
import products from './slices/products';

export const store = configureStore({
  reducer: {
    customerForm: customerForm.reducer,
    customers: customers.reducer,
    directory: directory.reducer,
    invoiceForm: invoiceForm.reducer,
    invoices: invoices.reducer,
    products: products.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
