import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Invoice, Currency, currencies } from '../../models';

export interface State extends Omit<Invoice, 'state' | 'createdAt'> {
  disabled: boolean;
  discount: string;
  selectedItemIndex?: number;
}

const initialState: State = {
  disabled: false,
  customerID: 'default',
  currency: currencies[0].code,
  discount: '0',
  items: [],
};

type SetItemDiscountAmountAction = PayloadAction<{ productID: string; discountAmount: string; }>;
type SetItemQuantityAction = PayloadAction<{ index: number; quantity: string; }>;

const invoiceForm = createSlice({
  name: 'invoiceForm',
  initialState,
  reducers: {
    clearForm(state) {
      state.discount = '0';
      state.items = [];
    },
    setDisabled(state, action: PayloadAction<boolean>) {
      state.disabled = action.payload;
    },
    setCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload;
    },
    setCustomer(state, action: PayloadAction<string>) {
      state.customerID = action.payload;
    },
    setDiscount(state, action: PayloadAction<string>) {
      state.discount = action.payload;
    },
    addProduct(state, { payload: productID }: PayloadAction<string>) {
      const item = state.items.find((x) => x.productID === productID);
      if (item) {
        item.quantity = (Number(item.quantity) + 1).toFixed(0);
      } else {
        state.items.push({ productID: productID, quantity: '1' });
      }
    },
    setItemDiscountAmount(state, { payload: { productID, discountAmount } }: SetItemDiscountAmountAction) {
      const item = state.items.find((x) => x.productID === productID)!;
      item.discountAmount = discountAmount;
    },
    clearItemDiscountAmount(state, { payload: productID }: PayloadAction<string>) {
      const item = state.items.find((x) => x.productID === productID)!;
      delete item.discountAmount;
    },
    setItemQuantity(state, { payload: { index, quantity } }: SetItemQuantityAction) {
      state.items[index].quantity = quantity;
    },
    selectItem(state, action: PayloadAction<number>) {
      state.selectedItemIndex = action.payload;
    },
    deselectItem(state) {
      state.selectedItemIndex = undefined;
    },
    removeAllItems(state) {
      state.items = [];
    },
    removeActiveItem(state) {
      if (state.selectedItemIndex !== undefined) {
        state.items.splice(state.selectedItemIndex, 1);
        state.selectedItemIndex = undefined;
      }
    },
  },
});

export default invoiceForm;
export const {
  clearForm,
  setDisabled,
  setCurrency,
  setCustomer,
  setDiscount,
  addProduct,
  setItemDiscountAmount,
  clearItemDiscountAmount,
  setItemQuantity,
  selectItem,
  deselectItem,
  removeAllItems,
  removeActiveItem,
} = invoiceForm.actions;
