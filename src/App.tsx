import React from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { ScopedCssBaseline, Button, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import ProductsDataFetch from './components/product/ProductsDataFetch';
import Loading from './components/loading/Loading';
import NavBar from './components/navBar/NavBar';
import { themeDark, themeLight } from './components/theme/ThemeContext';
import Home from './pages/Home';
import UserProfile from './components/userProfile/UserProfile';
import LoginForm from './components/user/LoginForm';
import RegisterForm from './components/user/RegisterForm';
import Admin from './components/adminProfile/Admin';
import ProductDetail from './components/product/ProductDetail';

function App() {
  const [light, setLight] = React.useState(true);

  const toggleTheme = () => {
    setLight((prev) => !prev);
  };
  return (
    <Container maxWidth='xl'>
      <NavBar />
      {/* <UserProfile /> */}
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/products' element={<ProductsDataFetch />}></Route>
        <Route path='/products/:id' element={<ProductDetail />}></Route>
        <Route path='/register' element={<RegisterForm />}></Route>
        <Route path='/login' element={<LoginForm />}></Route>
        <Route path='/profile' element={<UserProfile />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
