import store from '../../redux/store';
import { productServer } from '../shared/productServer';
import { productQueries } from '../../redux/productsQuery';
import { CreateProduct, Product } from '../../misc/types';

beforeAll(() => productServer.listen());
afterAll(() => productServer.close());

describe('test ProductQuery component', () => {
  //test1 fetch all the products
  test('Should fetch all products from the api', async () => {
    const { data } = await store.dispatch(
      productQueries.endpoints.fetchAllProducts.initiate(),
    );
    // console.log('API response:', data); /
    // console.log(store.getState().api.queries['fetchAllProducts(undefined)']);
    expect(data).toHaveLength(3);
  });

  //test2 create a product
  test('Should create a product', async () => {
    const newProduct: CreateProduct = {
      title: 'New Product',
      price: 202,
      description: 'New Product description',
      images: ['image1.jpg'],
      categoryId: 1,
    };
    let result = await store.dispatch(
      productQueries.endpoints.createProduct.initiate(newProduct),
    );
    if ('data' in result) {
      //   console.log(result.data.description);
      expect(result.data.description).toBe('New Product description');
    }
  });

  //test3 delete a product
  test('Should delete a product', async () => {
    let result = await store.dispatch(
      productQueries.endpoints.deleteProduct.initiate(2),
    );

    if ('data' in result) {
      const productResult = result.data as unknown as Product[];
      const item = productResult.find((item) => item.id === 2);
      expect(item).toBe(undefined);
    }
  });
});
