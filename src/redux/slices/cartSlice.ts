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

const initialCartState: InitialCartState = {
  products: cartProducts,
  loading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { count, product } = action.payload;
      const existingProduct = state.products.find(
        (cartProduct) => cartProduct.id === product.id,
      );
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 0) + count;
      } else {
        const newProduct: CartProduct = {
          ...product,
          quantity: count || 0,
        };
        state.products.push(newProduct);
      }
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (cartProduct) => cartProduct.id !== action.payload,
      );

      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },

    increseQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      const existingProduct = state.products.find(
        (cartProduct) => cartProduct.id === id,
      );
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;
      }
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },

    deccreseQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      const existingProduct = state.products.find(
        (cartProduct) => cartProduct.id === id,
      );
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 0) - 1;
      }
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
  },
});

export const { addToCart, increseQuantity, deccreseQuantity, removeFromCart } =
  cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
