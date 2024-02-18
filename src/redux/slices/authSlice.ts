import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState, Tokens, User, UserLogin } from '../../misc/types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { stringify } from 'querystring';

// let userData: User | null = null;

// if (data) {
//   userData = JSON.parse(data);
// }
let token: Tokens | null = null;

const alreadyToken = localStorage.getItem('token');

if (alreadyToken) {
  token = JSON.parse(alreadyToken);
}

const initialState: AuthState = {
  token: token,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Tokens | null>) => {
      localStorage.setItem('token', JSON.stringify(action.payload));
      state.token = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setToken, setError } = authSlice.actions;

export const authReducer = authSlice.reducer;
