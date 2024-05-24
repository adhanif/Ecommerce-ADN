import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Order } from '../../misc/types';

export type InitialStateOrder = {
  orders: Order[];
  loading: boolean;
  error?: string | null;
};

const initialState: InitialStateOrder = {
  orders: [],
  loading: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setOrders, setLoading, setError } = orderSlice.actions;
const orderReducer = orderSlice.reducer;
export default orderReducer;
