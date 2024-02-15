import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { InitialState, Product } from '../../misc/types';

const initialState: InitialState = {
  products: [],
  loading: false,
};

//API url
const url = 'https://api.escuelajs.co/api/v1/products';

//fetching all the data/products from API
export const fetchAllProducts = createAsyncThunk(
  'fetchAllProducts',
  async () => {
    try {
      const response: AxiosResponse = await axios.get(url);
      const data: Product[] = await response.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  // extrabuilder for fetchAllProducts
  extraReducers(builder) {
    //fetching data successfully
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      // storing data in redus state
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
          loading: false,
        };
      }
    });

    //loading logic
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });

    // error logic
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
  },
});

const productReducer = productSlice.reducer;
export default productReducer;
