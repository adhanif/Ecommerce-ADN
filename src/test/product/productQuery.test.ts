import store from '../../redux/store';
import { productServer } from '../shared/productServer';
import { productQueries } from '../../redux/productsQuery';
import { CreateProduct, Product } from '../../misc/types';

beforeAll(() => {
  productServer.listen();
  jest.setTimeout(50000);
});
afterAll(() => productServer.close());

describe('test ProductQuery component', () => {
  //test1 fetch all the products
  test('Should fetch all products from the api', async () => {
    const result = await store.dispatch(
      productQueries.endpoints.fetchAllProducts.initiate(),
    );
    const data = result.data;
    expect(data).toHaveLength(4);
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
    // let result = await store.dispatch(
    //   productQueries.endpoints.createProduct.initiate(newProduct),
    // );
    // if ('data' in result) {
    //   //   console.log(result.data.description);
    //   expect(result.data.description).toBe('New Product description');
    // }
  });

  //test3 delete a product
  test('Should delete a product', async () => {
    // let result = await store.dispatch(
    //   productQueries.endpoints.deleteProduct.initiate(2),
    // );
    // if ('data' in result) {
    //   const productResult = result.data as unknown as Product[];
    // const item = productResult.find((item) => item.id === 2);
    // expect(item).toBe(undefined);
    // }
  });
});
