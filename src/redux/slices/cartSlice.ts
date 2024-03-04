import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../misc/types';

export type CartProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
  quantity: number;
};

export type AddToCartPayload = {
  product: Product;
  count: number;
};

export type increaseCartPayload = {
  id: number;
  count: number;
};

export type InitialCartState = {
  products: CartProduct[];
  loading: boolean;
};

let cartProducts: CartProduct[] = [];

const alreadyCartProducts = localStorage.getItem('cartProducts');

if (alreadyCartProducts) {
  cartProducts = JSON.parse(alreadyCartProducts);
}

const initialState: InitialCartState = {
  products: cartProducts,
  loading: false,
};
// console.log(initialState);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { count, product } = action.payload;
      const existingProduct = state.products.find((cartProduct) => {
        console.log(cartProduct.id);
        return cartProduct.id === product.id;
      });

      if (existingProduct) {
        state.products = state.products.map((item) => {
          return item.id === product.id ? { ...item, quantity: count } : item;
        });
      } else {
        state.products = [
          ...state.products,
          { ...product, quantity: count || 0 },
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
  },
});

export const { addToCart, increseQuantity, decreseQuantity, removeFromCart } =
  cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
