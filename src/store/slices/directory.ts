import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { directory as structure } from '../fake-data';
import { Group } from '../../models';

export interface State {
  structure: Group;
  currentPath: string[];
  selectedProductID?: string;
}

const directory = createSlice({
  name: 'directory',
  initialState: { structure, currentPath: [] } as State,
  reducers: {
    goForward(state, action: PayloadAction<string>) {
      state.currentPath.push(action.payload);
    },
    goBackward(state, action: PayloadAction<number>) {
      state.currentPath.splice(action.payload);
    },
    selectProduct(state, action: PayloadAction<string>) {
      state.selectedProductID = action.payload;
    },
    deselectProduct(state) {
      state.selectedProductID = undefined;
    },
  },
});

export default directory;
export const { goForward, goBackward, selectProduct, deselectProduct } = directory.actions;
