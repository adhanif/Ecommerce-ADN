import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { products } from '../shared/mockData';

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  inventory: number;
  images: {
    productId: string;
    data: string;
    id: string;
    createdDate: string;
    updatedDate: string;
  }[];
  category: {
    id: string;
    name: string;
    image: string;
  };
  createdDate: string;
  updatedDate: string;
}

export interface CreateProductMockServer {
  id?: string; // Make id optional and of type string
  title: string;
  price: number;
  description: string;
  inventory: number;
  images: {
    productId: string;
    data: string;
    id: string;
    createdDate: string;
    updatedDate: string;
  }[];
  category: {
    id: string;
    name: string;
    image: string;
  };
  createdDate: string;
  updatedDate: string;
}

let mockProducts = products;
let baseUrl = 'https://fashion-adn.azurewebsites.net/api/v1/';

export const handler = [
  http.get(`${baseUrl}/products`, async ({ request }) => {
    return new HttpResponse(JSON.stringify(mockProducts), {
      status: 200,
      headers: {
        'X-total-count': '15',
      },
    });
  }),

  // http.post(`${baseUrl}/products`, async ({ request }) => {
  //   const product = (await request.json()) as CreateProductMockServer;
  //   const createdProduct: CreateProductMockServer = {
  //     ...product,
  //     id: (mockProducts.length + 1).toString(),
  //   };
  //   mockProducts.push(createdProduct as Product); // Add new product to mock data
  //   return HttpResponse.json(createdProduct as Product, { status: 201 });
  // }),

  // http.delete(`${baseUrl}products/:productId`, async (req) => {
  //   const id = Number(req.params.productId);
  //   const productIndex = mockProducts.findIndex(
  //     (product) => Number(product.id) === id,
  //   );

  //   if (productIndex !== -1) {
  //     mockProducts.splice(productIndex, 1); // Remove product from mock data
  //     return HttpResponse.json(mockProducts, { status: 200 });
  //   }

  //   return HttpResponse.json(null, { status: 404 });
  // }),
];

export const productServer = setupServer(...handler);

// import { HttpResponse, http } from 'msw';
// import { setupServer } from 'msw/node';
// import { products } from '../shared/mockData';
// import { CreateProductMockServer } from '../../misc/types';

// let mockProducts = products;
// let baseUrl = 'https://fashion-adn.azurewebsites.net/api/v1/';
// export const handler = [
//   http.get('products', () => {
//     return HttpResponse.json(mockProducts, { status: 200 });
//   }),
//   http.post('https://api.escuelajs.co/api/v1/products', async ({ request }) => {
//     const product = (await request.json()) as CreateProductMockServer;
//     const createdProduct: CreateProductMockServer = {
//       ...product,
//       id: mockProducts.length + 1,
//     };
//     return HttpResponse.json(createdProduct, { status: 201 });
//   }),

//   http.delete(
//     'https://api.escuelajs.co/api/v1/products/:productId',
//     async (req) => {
//       const id = Number(req.params.productId);

//       const productToBeDeleted = mockProducts.find(
//         (product) => Number(product.id) === id,
//       );

//       if (productToBeDeleted) {
//         mockProducts = mockProducts.filter(
//           (product) => Number(product.id) !== id,
//         );
//         return HttpResponse.json(mockProducts, { status: 200 });
//       }

//       return HttpResponse.json(null, { status: 404 });
//     },
//   ),
// ];

// export const productServer = setupServer(...handler);
