import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from './components/contextAPI/ThemeContext';

import ProductsDataFetch from './pages/ProductsDataFetch';
import NavBar from './components/navBar/NavBar';
import Home from './pages/Home';
import LoginForm from './components/user/LoginForm';
import RegisterForm from './components/user/RegisterForm';
import ProductDetail from './pages/ProductDetail';
import Cart from './components/cart/Cart';
import NotificationSnackBars from './components/notification/NotificationSnackBars';
import Footer from './components/footer/Footer';
import PrivateRoutes from './components/utils/PrivateRoutes';
import NoAuthorization from './components/utils/NoAuthorization';
import { Contact } from './components/contact/Contact';
import Scroller from './components/scroller/Scroller';

function App() {
  const { mode } = useTheme();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <NavBar />

        <NotificationSnackBars />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products' element={<ProductsDataFetch />}></Route>
          <Route path='/products/:id' element={<ProductDetail />}></Route>
          <Route path='/register' element={<RegisterForm />}></Route>
          <Route path='/login' element={<LoginForm />}></Route>
          <Route path='/admin' element={<PrivateRoutes path='/admin' />} />
          <Route path='/profile' element={<PrivateRoutes path='/profile' />} />
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/no-access' element={<NoAuthorization />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
        </Routes>
        <Scroller />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
