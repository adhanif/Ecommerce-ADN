import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import productReducer from './slices/productSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
