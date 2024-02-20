import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthState, Tokens, User, UserLogin } from '../../misc/types';


let token: Tokens | null = null;

const alreadyToken = localStorage.getItem('token');

if (alreadyToken) {
  token = JSON.parse(alreadyToken);
}

const initialState: AuthState = {
  token: token,
  error: null,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Tokens | null>) => {
      try {
        localStorage.setItem('token', JSON.stringify(action.payload));
        state.token = action.payload;
      } catch (error) {
        console.error('Error storing token in local storage:', error);
      }
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    logOut: (state) => {
      localStorage.removeItem('token');
      state.token = null;
    },
  },
});

export const { setToken, setError, logOut } = userSlice.actions;

export const userReducer = userSlice.reducer;
