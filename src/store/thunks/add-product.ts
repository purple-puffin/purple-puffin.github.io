import { AppThunk } from '../../store';
import { addProduct } from '../../store/slices/invoice-form';

import calculateDiscountThunk from './calculate-discount';

const addProductThunk: AppThunk<number> = (dispatch, getState) => {
  const { directory: { selectedProductID } } = getState();
  if (!selectedProductID) return -1;

  dispatch(addProduct(selectedProductID));
  dispatch(calculateDiscountThunk(selectedProductID));

  const { invoiceForm: { items } } = getState();
  return items.findIndex((x) => x.productID === selectedProductID);
};

export default addProductThunk;
