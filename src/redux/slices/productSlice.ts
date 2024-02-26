import {  createSlice } from '@reduxjs/toolkit';


import { InitialState } from '../../misc/types';

const initialState: InitialState = {
  products: [],
  loading: false,
};

//API url
const url = 'https://api.escuelajs.co/api/v1/products';

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilteredData: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setFilteredData } = productSlice.actions;
const productReducer = productSlice.reducer;
export default productReducer;
