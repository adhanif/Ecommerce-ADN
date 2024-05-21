import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import productReducer from './slices/productSlice';
import { userReducer } from './slices/userSlice';
import { userQueries } from './userQuery';
import { createUpdateproductQueries, productQueries } from './productsQuery';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import addressReducer from './slices/addressSlice';

import notificationReducer from './slices/notificationSlice';
import { orderQueries } from './orderQuery';
import { addressQueries } from './addressQuery';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
    products: productReducer,
    user: userReducer,
    notification: notificationReducer,
    [userQueries.reducerPath]: userQueries.reducer,
    [productQueries.reducerPath]: productQueries.reducer,
    [createUpdateproductQueries.reducerPath]:
      createUpdateproductQueries.reducer,
    [orderQueries.reducerPath]: orderQueries.reducer,
    [addressQueries.reducerPath]: addressQueries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userQueries.middleware,
      productQueries.middleware,
      createUpdateproductQueries.middleware,
      orderQueries.middleware,
      addressQueries.middleware,
    ),
});

// Subscribe to store changes and update local storage for cart slice

export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
// export default store;

export const createNewStore = () => {
  return configureStore({
    reducer: {
      // counterReducer
      cart: cartReducer,
      products: productReducer,
      users: userReducer,
      notification: notificationReducer,
      // query
      [userQueries.reducerPath]: userQueries.reducer,
      [productQueries.reducerPath]: productQueries.reducer,
    },

    // middleware
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        userQueries.middleware,
        productQueries.middleware,
      ),
  });
};
export default store;
