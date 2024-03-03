import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';

import ProductsDataFetch from './components/product/ProductsDataFetch';
import NavBar from './components/navBar/NavBar';
import Home from './pages/Home';
import LoginForm from './components/user/LoginForm';
import RegisterForm from './components/user/RegisterForm';
import ProductDetail from './components/product/ProductDetail';
import Cart from './components/cart/Cart';
import NotificationSnackBars from './components/notification/NotificationSnackBars';
import Footer from './components/footer/Footer';
import PrivateRoutes from './components/utils/PrivateRoutes';
import NoAuthorization from './components/utils/NoAuthorization';

function App() {
  return (
    <Container maxWidth='xl'>
      <NavBar />
      <NotificationSnackBars />
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/products' element={<ProductsDataFetch />}></Route>
        <Route path='/products/:id' element={<ProductDetail />}></Route>
        <Route path='/register' element={<RegisterForm />}></Route>
        <Route path='/login' element={<LoginForm />}></Route>
        <Route path='/admin' element={<PrivateRoutes path='/admin' />} />
        <Route path='/profile' element={<PrivateRoutes path='/profile' />} />
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/no-access' element={<NoAuthorization />}></Route>
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
