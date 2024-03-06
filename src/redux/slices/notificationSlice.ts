import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitialNotificationState } from '../../misc/types';

const initialState: InitialNotificationState = {
  open: false,
  message: '',
  severity: 'success',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<InitialNotificationState>,
    ) => {
      const { open, message, severity } = action.payload;
      return { ...state, open, message, severity };
    },
  },
});

const notificationReducer = notificationSlice.reducer;
export const { setNotification } = notificationSlice.actions;
export default notificationReducer;
