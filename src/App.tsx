import React from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { ScopedCssBaseline, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UserForm from './components/user/UserForm';

const themeLight = createTheme({
  palette: {
    background: {
      default: '#fff',
    },
    text: {
      primary: '#000',
    },
  },
});

const themeDark = createTheme({
  palette: {
    background: {
      default: '#1d1d1d',
    },
    text: {
      primary: '#fff',
    },
  },
});

function App() {
  const [light, setLight] = React.useState(true);

  const toggleTheme = () => {
    setLight((prev) => !prev);
  };
  return (
    <div>
      <ThemeProvider theme={light ? themeLight : themeDark}>
        <ScopedCssBaseline enableColorScheme>
          <Button onClick={toggleTheme}>Toggle Theme</Button>

          <nav>
            <ul>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </ul>
          </nav>
          {/* <ProductsDataFetch /> */}
          {/* <UserLoginForm />
           */}
          {/* <UserForm /> */}
          <Routes>
            <Route
              path='/register'
              element={<UserForm type='register' />}
            ></Route>
            <Route path='/login' element={<UserForm type='login' />}></Route>
          </Routes>
        </ScopedCssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
