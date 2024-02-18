import { useDispatch } from 'react-redux';
import { UnknownAction, configureStore } from '@reduxjs/toolkit';

import productReducer from './slices/productSlice';
import { authReducer } from './slices/authSlice';
import { authQueries } from './authQuery';

const store = configureStore({
  reducer: {
    products: productReducer,
    authentication: authReducer,
    [authQueries.reducerPath]: authQueries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authQueries.middleware),
});

// store.subscribe(() => {
//   const currentState = store.getState();
//   const userInfo = currentState.authentication.token;
//   localStorage.setItem('userData', JSON.stringify(userInfo));
// });

export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export default store;
