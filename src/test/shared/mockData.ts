import { Product } from '../../misc/types';

export const products: Product[] = [
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

export const mockUsersData = [
  {
    id: 1,
    email: 'dani@gmail.com',
    password: '123456',
    name: 'dani',
    role: 'customer',
    avatar:
      'https://gravatar.com/avatar/65aefe59c04ad9fcb2e78d80045dd507?s=400&d=robohash&r=x',
    creationAt: '2024-03-06T11:54:44.000Z',
    updatedAt: '2024-03-06T11:54:44.000Z',
  },
  {
    id: 2,
    email: 'dani2@gmail.com',
    password: '123456',
    name: 'dani2',
    role: 'customer',
    avatar:
      'https://gravatar.com/avatar/65aefe59c04ad9fcb2e78d80045dd507?s=400&d=robohash&r=x',
    creationAt: '2024-03-06T11:54:44.000Z',
    updatedAt: '2024-03-06T11:54:44.000Z',
  },
  {
    id: 3,
    email: 'dani3@gmail.com',
    password: '123456',
    name: 'dani3',
    role: 'customer',
    avatar:
      'https://gravatar.com/avatar/65aefe59c04ad9fcb2e78d80045dd507?s=400&d=robohash&r=x',
    creationAt: '2024-03-06T11:54:44.000Z',
    updatedAt: '2024-03-06T11:54:44.000Z',
  },
];

export const mockToken = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg',
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjcyODAyMDI4fQ.P1_rB3hJ5afwiG4TWXLq6jOAcVJkvQZ2Z-ZZOnQ1dZw',
};
