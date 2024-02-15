import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import UserRegisterForm from './components/user/UserRegisterForm';
import UserLoginForm from './components/user/UserLoginForm';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<UserRegisterForm />}></Route>
        <Route path='/login' element={<UserLoginForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
