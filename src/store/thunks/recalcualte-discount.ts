import { AppThunk } from '../../store';

import calculateDiscountThunk from './calculate-discount';

const recalculateDiscountThunk: AppThunk = (dispatch, getState) => {
  const { invoiceForm: { items } } = getState();
  items.forEach((i) => { dispatch(calculateDiscountThunk(i.productID)); });
};

export default recalculateDiscountThunk;
