import { configure } from '@testing-library/react';

const store = configure({
  reducer: {
    products: productReducer,
  },
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
