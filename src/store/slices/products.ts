import { createSlice } from '@reduxjs/toolkit';

import { Product } from '../../models';
import { products } from '../fake-data';

const initialState = {} as Record<string, Product>;
products.forEach((product) => initialState[product.id] = product);

export default createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
});
