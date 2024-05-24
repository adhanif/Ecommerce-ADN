

export type ProductImage = {
  productId: string;
  data: string;
  id: string;
  createdDate: string;
  updatedDate: string;
};

export type Category = {
  id: string;
  name: string;
  image: string;
};

export type Product = {
  title: string;
  description: string;
  price: number;
  inventory: number;
  images: ProductImage[];
  category: Category;
  id: string;
  createdDate: string;
  updatedDate: string;
};

export type ProductsResponse = Product[];

export const products: Product[] = [
  {
    title: 'Electronic Product 1',
    description: 'Description for Electronic Product 1',
    price: 200,
    inventory: 100,
    images: [
      {
        productId: '35e09e82-f8c1-481e-bc38-e2e82abc21e2',
        data: 'DOx6yszxCCNqlF7JL53AwEVSI1gk3tSmLXHUaBdxLxLUGH03yI33hwbLByNgCy8S9SfqPO2vand3PP2Ia5qe97GM/8i5OpOnolAX53cH0TNmEVNqeq9AZ+nmeYqlYmYcwwNWfQ==',
        id: 'aea8608c-48ed-4304-af46-f2912190a1f3',
        createdDate: '2024-05-22',
        updatedDate: '2024-05-22',
      },
      {
        productId: '35e09e82-f8c1-481e-bc38-e2e82abc21e2',
        data: 'ZNjyN+ejR7ZV8UVHCUNJP623Nc6zKsUeRNQJ7lP7212VnNvhXxwSnHKFMTBT+sgMmyNlOlXNd/+cK+59Az5xc4JlmUfK0zY4hDTzxgqXY7hU/f0LCesh85T4mTdMj+cV82RIlg==',
        id: 'eb9eec9d-619c-4f92-a9bd-7c7ec6a285a7',
        createdDate: '2024-05-22',
        updatedDate: '2024-05-22',
      },
      {
        productId: '35e09e82-f8c1-481e-bc38-e2e82abc21e2',
        data: 'ia8KddmeMjr4FyzdEyl6qtlv4x51SUUp2Ew/b1cT0oIP4UxyQf+3jliEl3EDiYTf3Ryv4TKJDYKl3HBjdZjiQGHv/RjD/ri6qDdfmQvFC6jm+0Cf8TDUVQSACNG0I6nPnSAvlA==',
        id: '0b10f017-aa0f-4518-b0bc-4b3682b9c863',
        createdDate: '2024-05-22',
        updatedDate: '2024-05-22',
      },
    ],
    category: {
      id: 'd409c004-cf79-4198-bff4-47901850c581',
      name: 'Electronic',
      image: 'https://picsum.photos/200/?random=6',
    },
    id: '35e09e82-f8c1-481e-bc38-e2e82abc21e2',
    createdDate: '2024-05-22',
    updatedDate: '2024-05-22',
  },
  {
    title: 'Books Product 1',
    description: 'Description for Books Product 1',
    price: 600,
    inventory: 100,
    images: [
      {
        productId: '50b0be44-c149-4bd1-8f35-6d8445910b00',
        data: 'AK9fAGD4EEg0lAGYUiRCPBvFLc0U4eesF2a/yy0cDUJLH3RI/k/TpGox3tbSoGwiwQavx+GMgAMOE6IT6upbi2B/M1mTiqs+3Q8b+ZvKZy/x/hzIAZs+y7P0YuHGY5FIxHAMBA==',
        id: 'f557376d-b0c2-4fb3-91a8-ea4ae1d1db34',
        createdDate: '2024-05-22',
        updatedDate: '2024-05-22',
      },
      {
        productId: '50b0be44-c149-4bd1-8f35-6d8445910b00',
        data: '4hBuoVpZBHt//TJkmdO73pn0M4V9LHxWEXb70AYsYSa0BfEedWpsurO2HZhXLAiiKyPx5dZrJKLgG44PiNPFhm3VOhmaa8NQ0jvNrAcwL6g48Njt5J47owNphePazFr0qBsEcw==',
        id: '203d02f4-6dff-4f61-bacb-5850e7250dd5',
        createdDate: '2024-05-22',
        updatedDate: '2024-05-22',
      },
      {
        productId: '50b0be44-c149-4bd1-8f35-6d8445910b00',
        data: 'xzYNva+LLUIB80MOwQeEsMXPU5XrsZMzwdwOFwRoyVZQVQEawzUf02JTUiZWbnXkvF4KiDeLkSFWjpKV19jqyoyNg0WMBKJTM6JoCCP+9tlDg9ZjvCZrvBDUIJDPrw/Zbab/Tg==',
        id: 'bd494cbc-e783-4522-bd3e-088655f867ea',
        createdDate: '2024-05-22',
        updatedDate: '2024-05-22',
      },
    ],
    category: {
      id: '029f17c3-11fb-46a4-ac76-f2271dca62c7',
      name: 'Books',
      image: 'https://picsum.photos/200/?random=2',
    },
    id: '50b0be44-c149-4bd1-8f35-6d8445910b00',
    createdDate: '2024-05-22',
    updatedDate: '2024-05-22',
  },
  {
    title: 'Clothing Product 1',
    description: 'Description for Clothing Product 1',
    price: 400,
    inventory: 100,
    images: [
      {
        productId: '8f5a76a5-7b3c-4006-925f-bf326f729e91',
        data: 'Rd9tkK4cltMjM/ubSMdTe9Whk5y5182W5l0NyGbrNefQ9dX5sRNwNIvdANdhy3B6otwLMK8AHnI3pz40spAY31oZCHD5Im63/gSQEgbYThHsxWqP7kJf5or11RcvzdKAg0e3Tg==',
        id: 'e2bb3e58-b822-48fa-b9a8-68ed17f17fad',
        createdDate: '2024-05-22',
        updatedDate: '2024-05-22',
      },
      {
        productId: '8f5a76a5-7b3c-4006-925f-bf326f729e91',
        data: '8EmdmT5nhKNnbqLlu0SOqaohpWzszjB2b/Imx3tXjce7+orhtwQ4MKqTSdO6+eSN/+OKWH4z70f7O1WBR88g2Js5K4oppDi+pKeNvGQJYdPmgpar1iOXxQJeSYfG4HN2LVGi0g==',
        id: 'e4e8f1b2-3716-4dd7-87bd-58b04ca9e0d6',
        createdDate: '2024-05-22',
        updatedDate: '2024-05-22',
      },
      {
        productId: '8f5a76a5-7b3c-4006-925f-bf326f729e91',
        data: 'GysRRoGrUt1zdlY5i+LnBQ6pv0hM03YmmFlbM++HRKgtbcKkZUhIx+X425mssiN2ZTEOEYQZMHpXr7LeuKoC2BEcNIDUAQtGMm2AzOsh1noBnT18GchmeDXJjzTxrUYplyEOlA==',
        id: '91873563-3623-42ba-b7a8-e6f7abfd4026',
        createdDate: '2024-05-22',
        updatedDate: '2024-05-22',
      },
    ],
    category: {
      id: '19a1b81c-6982-4579-9690-5e01004cc5a0',
      name: 'Clothing',
      image: 'https://picsum.photos/200/?random=1',
    },
    id: '8f5a76a5-7b3c-4006-925f-bf326f729e91',
    createdDate: '2024-05-22',
    updatedDate: '2024-05-22',
  },
  {
    title: 'Furniture Product 1',
    description: 'Description for Furniture Product 1',
    price: 1000,
    inventory: 100,
    images: [
      {
        productId: 'cd016f01-fe89-4e68-901c-4282727a2bbf',
        data: '/vicKlA/z1DgNh3gKD4orbXBbHwzBf7AtXNLrlMax3Go1qdl8BBkah4a+neecShal1BO2haCGTJKkQqujlpmonPbJtyvC5kyhOR05df0xPOlCkzUAemFGUvNWhs8wEMFcpXxYA==',
        id: 'e6fbc2d7-9169-4cc0-a455-8b017047e0e5',
        createdDate: '2024-05-22',
        updatedDate: '2024-05-22',
      },
      {
        productId: 'cd016f01-fe89-4e68-901c-4282727a2bbf',
        data: '3ChhwMeLVuVAtvX9jW+rCXYN9J5m0erVqCZ5JnAD8r4YJbt9sLFMK3UEnrdpu/GCw2ip/sanFjwgVKsC/7mudJHosUsyCtkWtVrp14l0ejFjTfoQi/fgC3AzDz6q9l7cL6R93A==',
        id: 'ba113946-16e2-4b6d-8dd9-8c17fc29ee91',
        createdDate: '2024-05-22',
        updatedDate: '2024-05-22',
      },
      {
        productId: 'cd016f01-fe89-4e68-901c-4282727a2bbf',
        data: 'zNmuo0diU9g4g3qyj/s7YxQ4hNgaBdIjVNsInCL4zuOP8v6OZNBL4gNIsdisL+UvNMKj9LkEettT1Vyqgkne6nQ729osAcco7X/oxIRcZDH2sC9oQo5QKLWQvwPqE5a8tg2EUg==',
        id: 'ec5132fd-af00-410e-a4d2-999be7c81940',
        createdDate: '2024-05-22',
        updatedDate: '2024-05-22',
      },
    ],
    category: {
      id: 'c8ce938c-1128-4925-99d9-244558d03378',
      name: 'Furniture',
      image: 'https://picsum.photos/200/?random=1',
    },
    id: 'cd016f01-fe89-4e68-901c-4282727a2bbf',
    createdDate: '2024-05-22',
    updatedDate: '2024-05-22',
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
