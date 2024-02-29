import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthState, Tokens, UserProfileData } from '../../misc/types';

let token: Tokens | null = null;

const alreadyToken = localStorage.getItem('token');

if (alreadyToken) {
  token = JSON.parse(alreadyToken);
}

let user: UserProfileData | null = null;

const initialState: AuthState = {
  user: user,
  token: token,
  error: null,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Tokens>) => {
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
      state.user = null;
    },
    saveUserInfo: (state, action: PayloadAction<UserProfileData | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setError, logOut, saveUserInfo } = userSlice.actions;

export const userReducer = userSlice.reducer;
