import Big from 'big.js';

import { AppThunk } from '..';
import { setItemDiscountAmount, clearItemDiscountAmount } from '../slices/invoice-form';

const calculateDiscountThunk = (productID: string): AppThunk => (dispatch, getState) => {
  const { invoiceForm: { currency, discount, items }, products } = getState();
  const index = items.findIndex(x => x.productID === productID);

  const discountValue = new Big(discount || 0);
  if (discountValue.eq(0)) {
    dispatch(clearItemDiscountAmount(index));
    return;
  }

  const totalAmount = new Big(products[productID].price[currency]).times(items[index].quantity || 0);
  const discountAmount = totalAmount.times(discountValue).div(100);

  dispatch(setItemDiscountAmount({ index, discountAmount: discountAmount.toFixed(2) }));
};

export default calculateDiscountThunk;
