import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthState, Tokens, UserInitialState } from '../../misc/types';

let token: Tokens | null = null;

const alreadyToken = localStorage.getItem('token');

if (alreadyToken) {
  token = JSON.parse(alreadyToken);
}
// UserProfileData

let user: UserInitialState | null = null;
const alreadyUser = localStorage.getItem('user');
if (alreadyUser) {
  user = JSON.parse(alreadyUser);
}

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
      localStorage.removeItem('user');

      state.token = null;
    },
    saveUserInfo: (state, action: PayloadAction<UserInitialState | null>) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
    },
    removeUserInfo: (state) => {
      localStorage.removeItem('token');
      state.user = null;
    },
  },
});

export const { setToken, setError, logOut, saveUserInfo, removeUserInfo } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
