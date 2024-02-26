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
import { ToastContainer } from 'react-toastify';
import NotificationSnackBars from './components/notification/NotificationSnackBars';

function App() {
  // const [light, setLight] = React.useState(true);

  // const toggleTheme = () => {
  //   setLight((prev) => !prev);
  // };
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
        <Route path='/profile' element={<UserProfile />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
