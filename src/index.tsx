import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Provider } from 'react-redux';
import store from './redux/store';
import ThemeProvider from './components/contextAPI/ThemeContext';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <GoogleOAuthProvider clientId={clientId}>
            <App />
          </GoogleOAuthProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
