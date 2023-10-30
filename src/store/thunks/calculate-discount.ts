import Big from 'big.js';

import { AppThunk } from '..';
import { setItemDiscountAmount } from '../slices/invoice-form';

const calculateDiscountThunk = (productID: string): AppThunk => (dispatch, getState) => {
  const { invoiceForm: { currency, discount, items }, products } = getState();
  if (!discount) return;

  const discountValue = new Big(discount);
  if (discountValue.eq(0)) return;

  const product = products[productID];
  const item = items.find((x) => x.productID === productID)!;
  const totalAmount = new Big(product.price[currency]).times(item.quantity || 0);
  const discountAmount = totalAmount.times(discountValue).div(100);

  dispatch(setItemDiscountAmount({ productID, discountAmount: discountAmount.toFixed(2) }));
};

export default calculateDiscountThunk;
