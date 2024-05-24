import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { InitialState, Product } from '../../misc/types';

const initialState: InitialState = {
  products: [],
  loading: false,
};

//API url

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilteredData: (state, action) => {
      state.products = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setFilteredData, setProducts, setLoading, setError } =
  productSlice.actions;
const productReducer = productSlice.reducer;
export default productReducer;
