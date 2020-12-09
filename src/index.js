import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import jwt_decode from 'jwt-decode';
import { setAuthToken, logoutUser } from './components/util/auth_user';


document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const user = jwt_decode(localStorage.jwtToken);
    window.currentUser = user;

    const currentTime = Date.now() /1000;
    if(user.exp < currentTime) {
      logoutUser();
      window.location.href='/';
    }
  }

  const root = document.getElementById('root');
  ReactDOM.render(<App />, root);
});
