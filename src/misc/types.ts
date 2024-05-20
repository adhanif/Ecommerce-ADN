export type Category = {
  id: string;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type AddressUser = {
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  addresses: string[];
  id: string;
  createdDate: string;
  updatedDate: string;
};

export type OrderProduct = {
  productId: string;
  title: string;
  price: number;
  quantity: number;
};

export type ProductItem = {
  ProductId: string;
  Quantity: number;
};

export type Order = {
  Total: number;
  Address: string;
  OrderProducts: ProductItem[];
};

export type OrderResponse = {
  user: AddressUser;
  orderProducts: OrderProduct[];
  address: string;
  total: number;
  id: string;
  createdDate: string;
  updatedDate: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
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
};

export type UpdateProduct = {
  title?: string;
  price?: number;
  description?: string;
  images?: string[];
  category?: Category;
};

export type CreateProduct = {
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: number;
};

export type CreateProductMockServer = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[] | string;
  categoryId: number;
};

export type InitialState = {
  products: Product[];
  loading: boolean;
  error?: string | null;
};

export type UserFormProps = {
  type: 'login' | 'register';
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = UserLogin & {
  name?: string;
  avatar: string;
};

export type User = UserRegister & {
  role: 'customer' | 'admin';
  id: number;
};

export type InitialStateUser = {
  user: User;
  loading: boolean;
  error: string;
};

export type UserProfileData = {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserInitialState = {
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
};

export type Tokens = {
  access_token?: string;
  refresh_token?: string;
};
export type AuthState = {
  user: UserInitialState | null;
  token: string | null;
  googleToken?: string | null;
  error: string | null;
};

export type LoginResponse = {
  access_token: string;
  // refresh_token: string;
  // error?: any;
};

export type Available = {
  userExists: boolean | Available | undefined;
  isAvailable: boolean;
};

export type Email = {
  email: string;
};

export type TokenRequestBody = {
  access_token: string;
  refresh_token: string;
};

export type productCategory = {
  id: string;
  name: string;
  image: string;
  // creationAt: string;
  // updatedAt: string;
};

export type QuantityControlButtonProps = {
  count: number;
  handleMinus: () => void;
  handlePlus: () => void;
  handleCart: () => void;
};

export type SelectOptions = {
  id: number;
  label: string;
};

// export type CartProduct = {
//   id: string;
//   title: string;
//   price: number;
//   description: string;
//   images: string[];
//   createdDate: string;
//   updatedDate: string;
//   inventory: number;
//   category: {
//     id: number;
//     name: string;
//     image: string;
//     // creationAt: string;
//     // updatedAt: string;
//   };
//   quantity: number;
// };

export type CartProduct = {
  id: string;
  title: string;
  price: number;
  description: string;
  images: {
    productId: string;
    data: string;
    id: string;
    createdDate: string;
    updatedDate: string;
  }[];
  createdDate: string;
  updatedDate: string;
  inventory: number;
  category: {
    id: string;
    name: string;
    image: string;
  };
  quantity: number;
};

export type AddToCartPayload = {
  product: Product;
  count: number;
};

export type increaseCartPayload = {
  id: number;
  count: number;
};
export type InitialCartState = {
  products: CartProduct[];
  loading: boolean;
};

export type InitialNotificationState = {
  open: boolean;
  message: string;
  severity: string;
};

export type UserGoogleProfile = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};
