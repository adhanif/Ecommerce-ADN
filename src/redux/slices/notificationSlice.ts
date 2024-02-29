import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type InitialState = {
  open: boolean;
  message: string;
  severity: string;
};

const initialState: InitialState = {
  open: false,
  message: '',
  severity: 'success',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<InitialState>) => {
      const { open, message, severity } = action.payload;
      return { ...state, open, message, severity };
    },
  },
});

const errorReducer = notificationSlice.reducer;
export const { setNotification } = notificationSlice.actions;
export default errorReducer;
