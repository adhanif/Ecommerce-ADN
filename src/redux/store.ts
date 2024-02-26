import { useDispatch } from 'react-redux';
import { UnknownAction, configureStore } from '@reduxjs/toolkit';

import productReducer from './slices/productSlice';
import { userReducer } from './slices/userSlice';
import { userQueries } from './userQuery';
import { productQueries } from './productsQuery';
import cartReducer from './slices/cartSlice';

import notificationSlice from './slices/notificationSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    user: userReducer,
    notification: notificationSlice,
    [userQueries.reducerPath]: userQueries.reducer,
    [productQueries.reducerPath]: productQueries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userQueries.middleware,
      productQueries.middleware,
    ),
});

// Subscribe to store changes and update local storage for cart slice
// store.subscribe(() => {
//   const currentState = store.getState();
//   const cartState = currentState.cart;
//   localStorage.setItem('cartProducts', JSON.stringify(cartState.products));
// });

export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export default store;

// function cartReducer(state: unknown, action: UnknownAction): unknown {
//   throw new Error('Function not implemented.');
// }
