import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import ProductsDataFetch from './components/product/ProductsDataFetch';
import NavBar from './components/navBar/NavBar';
import Home from './pages/Home';
import UserProfile from './components/userProfile/UserProfile';
import LoginForm from './components/user/LoginForm';
import RegisterForm from './components/user/RegisterForm';
import Admin from './components/adminProfile/Admin';
import ProductDetail from './components/product/ProductDetail';
import { Container } from '@mui/material';
import Cart from './components/cart/Cart';
import NotificationSnackBars from './components/notification/NotificationSnackBars';
import Footer from './components/footer/Footer';
import PrivateRoutes from './components/utils/PrivateRoutes';

function App() {
  return (
    <Container maxWidth='xl'>
      <NavBar />
      <NotificationSnackBars />
      {/* <UserProfile /> */}
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/products' element={<ProductsDataFetch />}></Route>
        <Route path='/products/:id' element={<ProductDetail />}></Route>
        <Route path='/register' element={<RegisterForm />}></Route>
        <Route path='/login' element={<LoginForm />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/profile' element={<UserProfile />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
        </Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
