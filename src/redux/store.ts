import { useDispatch } from 'react-redux';
import { UnknownAction, configureStore } from '@reduxjs/toolkit';

import productReducer from './slices/productSlice';
import { userReducer } from './slices/userSlice';
import { userQueries } from './userQuery';
import { productQueries } from './productsQuery';

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    [userQueries.reducerPath]: userQueries.reducer,
    [productQueries.reducerPath]: productQueries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userQueries.middleware,
      productQueries.middleware,
    ),
});

// store.subscribe(() => {
//   const currentState = store.getState();
//   const userInfo = currentState.authentication.token;
//   localStorage.setItem('userData', JSON.stringify(userInfo));
// });

export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export default store;
