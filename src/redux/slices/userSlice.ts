import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthState, Tokens, UserInitialState } from '../../misc/types';

// let token: Tokens | null = null;
let token: string | null = null;

let googleToken: string | null = null;

const alreadyGoogleToken = localStorage.getItem('googleToken');

if (alreadyGoogleToken) {
  googleToken = JSON.parse(alreadyGoogleToken);
}

const alreadyToken = localStorage.getItem('token');

if (alreadyToken) {
  token = JSON.parse(alreadyToken);
}

let user: UserInitialState | null = null;
const alreadyUser = localStorage.getItem('user');
if (alreadyUser) {
  user = JSON.parse(alreadyUser);
}

const initialState: AuthState = {
  user: user,
  token: token,
  googleToken: googleToken,
  error: null,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      try {
        localStorage.setItem('token', JSON.stringify(action.payload));
        state.token = action.payload;
      } catch (error) {
        console.error('Error storing token in local storage:', error);
      }
    },

    setGoogleToken: (state, action: PayloadAction<string>) => {
      try {
        localStorage.setItem('googleToken', JSON.stringify(action.payload));
        state.googleToken = action.payload;
      } catch (error) {
        console.error('Error storing googleToken in local storage:', error);
      }
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    logOut: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('googleToken');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.googleToken = null;
    },
    saveUserInfo: (state, action: PayloadAction<UserInitialState | null>) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
    },
    removeUserInfo: (state) => {
      state.user = null;
    },
  },
});

export const {
  setToken,
  setError,
  logOut,
  saveUserInfo,
  removeUserInfo,
  setGoogleToken,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
