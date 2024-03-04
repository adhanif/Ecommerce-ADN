import { Product } from '../../misc/types';
import cartReducer, {
  addToCart,
  decreseQuantity,
  increseQuantity,
  removeFromCart,
} from '../../redux/slices/cartSlice';
import { createNewStore } from '../../redux/store';
import { InitialCartState } from '../../misc/types';

let store = createNewStore();

const initialCartState: InitialCartState = {
  products: [],
  loading: false,
};

beforeEach(() => {
  store = createNewStore();
});

beforeEach(() => {});

describe('cart reducer', () => {
  //mock data
  const product: Product[] = [
    {
      id: 1,
      title: 'Test Product',
      price: 20,
      description: 'Product description',
      images: ['image1.jpg'],
      creationAt: '2022-01-01',
      updatedAt: '2022-01-02',
      category: {
        id: 1,
        name: 'TestCategory',
        image: 'category.jpg',
        creationAt: '2022-01-01',
        updatedAt: '2022-01-02',
      },
    },
    {
      id: 2,
      title: 'Another Product',
      price: 30,
      description: 'Another product description',
      images: ['image2.jpg'],
      creationAt: '2022-02-01',
      updatedAt: '2022-02-02',
      category: {
        id: 2,
        name: 'AnotherCategory',
        image: 'another_category.jpg',
        creationAt: '2022-02-01',
        updatedAt: '2022-02-02',
      },
    },
    {
      id: 3,
      title: 'Yet Another Product',
      price: 25,
      description: 'Yet another product description',
      images: ['image3.jpg'],
      creationAt: '2022-03-01',
      updatedAt: '2022-03-02',
      category: {
        id: 3,
        name: 'YetAnotherCategory',
        image: 'yet_another_category.jpg',
        creationAt: '2022-03-01',
        updatedAt: '2022-03-02',
      },
    },
  ];

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
      addToCart({ product: product[0], count }),
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
      addToCart({ product: product[0], count }),
    );

    const deleteItemState = cartReducer(state, removeFromCart(product[0].id));
    console.log(deleteItemState);
    expect(deleteItemState.products).toHaveLength(0);
  });

  // test3: increase the the quantity of an item in the cart
  test('Should increase the the quantity of item', () => {
    const count = 2;
    const state = cartReducer(
      initialCartState,
      addToCart({ product: product[1], count }),
    );
    const increaseState = cartReducer(state, increseQuantity(product[1].id));
    expect(increaseState.products[0].quantity).toEqual(3);
  });

  // test4: decrease the the quantity of an item in the cart
  test('Should decrease the the quantity', () => {
    const count = 6;
    const state = cartReducer(
      initialCartState,
      addToCart({ product: product[2], count }),
    );
    const decreaseState = cartReducer(state, decreseQuantity(product[2].id));
    expect(decreaseState.products[0].quantity).toEqual(5);
  });
});
