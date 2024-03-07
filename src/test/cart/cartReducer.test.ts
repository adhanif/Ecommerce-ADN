import { Product } from '../../misc/types';
import cartReducer, {
  addToCart,
  decreseQuantity,
  emptyCart,
  increseQuantity,
  removeFromCart,
} from '../../redux/slices/cartSlice';
import { createNewStore } from '../../redux/store';
import { InitialCartState } from '../../misc/types';
import { products } from '../shared/mockData';

let store = createNewStore();

const initialCartState: InitialCartState = {
  products: [],
  loading: false,
};

beforeEach(() => {
  store = createNewStore();
});

describe('cart reducer', () => {
  // test0: initial state
  test('should return the initial state', () => {
    const state = cartReducer(initialCartState, { type: '' });
    expect(state).toEqual(initialCartState);
  });

  // test1: item added to cart
  test('Should add to cart', () => {
    const count = 2;
    const state = cartReducer(
      initialCartState,
      addToCart({ product: products[0], count }),
    );
    expect(state.products).toHaveLength(1);
    expect(state.products[0].id).toBe(1);
    expect(state.products[0].quantity).toBe(2);
    expect(state.products[0].price).toBe(20);
  });

  // test2: item should be deleted
  test('Should delete item from cart', () => {
    const count = 2;
    const state = cartReducer(
      initialCartState,
      addToCart({ product: products[0], count }),
    );

    const deleteItemState = cartReducer(state, removeFromCart(products[0].id));
    expect(deleteItemState.products).toHaveLength(0);
  });

  // test3: increase the the quantity of an item in the cart
  test('Should increase the the quantity of item', () => {
    const count = 2;
    const state = cartReducer(
      initialCartState,
      addToCart({ product: products[1], count }),
    );
    const increaseState = cartReducer(state, increseQuantity(products[1].id));
    expect(increaseState.products[0].quantity).toEqual(3);
  });

  // test4: decrease the the quantity of an item in the cart
  test('Should decrease the the quantity', () => {
    const count = 6;
    const state = cartReducer(
      initialCartState,
      addToCart({ product: products[2], count }),
    );
    const decreaseState = cartReducer(state, decreseQuantity(products[2].id));
    expect(decreaseState.products[0].quantity).toEqual(5);
  });

  // test4: empty the cart
  test('Should emty the cart products', () => {
    const count = 6;
    const state = cartReducer(
      initialCartState,
      addToCart({ product: products[2], count }),
    );
    const emptyCartState = cartReducer(state, emptyCart());
    expect(emptyCartState.products.length).toEqual(0);
  });
});
