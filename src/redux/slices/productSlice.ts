import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { InitialState, Product } from '../../misc/types';

const initialState: InitialState = {
  products: [],
  loading: false,
};

//API url
const url = 'https://api.escuelajs.co/api/v1/products';

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

const productReducer = productSlice.reducer;
export default productReducer;
