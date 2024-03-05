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
