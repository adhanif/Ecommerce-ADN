import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';

import { CreateProductMockServer } from '../../misc/types';
import { products } from './mockData';

let mockProducts = products;

export const handler = [
  http.get('https://api.escuelajs.co/api/v1/products', () => {
    return HttpResponse.json(mockProducts, { status: 200 });
  }),
  http.post('https://api.escuelajs.co/api/v1/products', async ({ request }) => {
    const product = (await request.json()) as CreateProductMockServer;
    const createdProduct: CreateProductMockServer = {
      ...product,
      id: mockProducts.length + 1,
    };
    return HttpResponse.json(createdProduct, { status: 201 });
  }),

  http.delete(
    'https://api.escuelajs.co/api/v1/products/:productId',
    async (req) => {
      const id = Number(req.params.productId);

      // const productToBeDeleted = mockProducts.find(
      //   // (product) => product.id === id,
      // );

      // if (productToBeDeleted) {
      //   mockProducts = mockProducts.filter((product) => product.id !== id);
      //   return HttpResponse.json(mockProducts, { status: 200 });
      // }

      return HttpResponse.json(null, { status: 404 });
    },
  ),
];

export const productServer = setupServer(...handler);
