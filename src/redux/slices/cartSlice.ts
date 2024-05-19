import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  AddToCartPayload,
  CartProduct,
  InitialCartState,
} from '../../misc/types';

let cartProducts: CartProduct[] = [];

const alreadyCartProducts = localStorage.getItem('cartProducts');

if (alreadyCartProducts) {
  cartProducts = JSON.parse(alreadyCartProducts);
}

const initialState: InitialCartState = {
  products: cartProducts,
  loading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { count, product } = action.payload;
      const existingProduct = state.products.find((cartProduct) => {
        return cartProduct.id === Number(product.id);
      });

      if (existingProduct) {
        state.products = state.products.map((item) => {
          return item.id === Number(product.id) ? { ...item, quantity: count } : item;
        });
      } else {
        state.products = [
          ...state.products,
          // { ...product, quantity: count || 0 },
        ];
      }
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.products = state.products.filter(
        (cartProduct) => cartProduct.id !== id,
      );

      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },

    increseQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      const existingProduct = state.products.find(
        (cartProduct) => cartProduct.id === id,
      );
      if (existingProduct) {
        state.products = state.products.map((item) => {
          return item.id === existingProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },

    decreseQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      const existingProduct = state.products.find(
        (cartProduct) => cartProduct.id === id,
      );
      if (existingProduct) {
        state.products = state.products.map((item) => {
          return item.id === existingProduct.id
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        });
      }

      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },

    emptyCart: (state) => {
      state.products = [];
      localStorage.removeItem('cartProducts');
    },
  },
});

export const {
  addToCart,
  increseQuantity,
  decreseQuantity,
  removeFromCart,
  emptyCart,
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
