import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Address } from '../../misc/types';

export type InitialStateAddress = {
  Addresses: Address[];
  loading: boolean;
  error?: string | null;
};

const initialState: InitialStateAddress = {
  Addresses: [],
  loading: false,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<Address[]>) => {
      state.Addresses = action.payload;
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

export const { setAddress, setLoading, setError } = addressSlice.actions;
const addressReducer = addressSlice.reducer;
export default addressReducer;
