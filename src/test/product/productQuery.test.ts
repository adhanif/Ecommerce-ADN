import store from '../../redux/store';
import { productServer } from '../shared/productServer';
import {
  createUpdateproductQueries,
  productQueries,
} from '../../redux/productsQuery';
import { CreateProduct, Product } from '../../misc/types';

beforeAll(() => productServer.listen());
afterAll(() => productServer.close());

interface formDataProduct {
  title: string;
  price: number;
  description: string;
  inventory: number;
  categoryId: string;
  images: FileList | null;
}

describe('test ProductQuery component', () => {
  //test1 fetch all the products
  test('Should fetch all products from the api', async () => {
    const { data } = await store.dispatch(
      productQueries.endpoints.fetchAllProducts.initiate(),
    );
    expect(data).toHaveLength(3);
  });

  // test2 create a product
  test('Should create a product', async () => {
    const newProduct: formDataProduct = {
      title: 'New Product',
      price: 202,
      description: 'New Product description',
      images: null,
      categoryId: '1',
      inventory: 10,
    };

    // Create a new FormData object
    const formData = new FormData();

    // Append fields to the FormData object
    formData.append('title', newProduct.title);
    formData.append('price', newProduct.price.toString());
    formData.append('description', newProduct.description);
    formData.append('categoryId', newProduct.categoryId);
    formData.append('inventory', newProduct.inventory.toString());
    let result = await store.dispatch(
      createUpdateproductQueries.endpoints.createProduct.initiate(formData),
    );
    if ('data' in result) {
      //   console.log(result.data.description);
      expect(result.data.description).toBe('New Product description');
    }
  });

  //test3 delete a product
  test('Should delete a product', async () => {
    let result = await store.dispatch(
      productQueries.endpoints.deleteProduct.initiate('2'),
    );

    if ('data' in result) {
      const productResult = result.data as unknown as Product[];
      const item = productResult.find((item) => Number(item.id) === 2);
      expect(item).toBe(undefined);
    }
  });
});
