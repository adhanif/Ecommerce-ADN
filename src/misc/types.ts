export type Category = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category;
};

export type InitialState = {
  products: Product[];
  loading: boolean;
  error?: string;
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
  user: User | null;
  loading: boolean;
  error: string;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type AuthState = {
  token: Tokens | null;
  error: string | null;
};

