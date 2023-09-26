import React from 'react';
import { Route, Redirect, Navigate ,Outlet} from 'react-router-dom';
import Cookies from 'js-cookie';

// You can replace this with your authentication logic
const isAuthenticated = () => {
  // Check if the user is authenticated (e.g., by checking a token in localStorage)
  return Cookies.getItem('auth') !== null;
};

// PrivateRoute component
export default function PrivateRoutes() {
  const refreshToken = Cookies.get('token');
  let auth = { token: refreshToken};
  return auth.token ? <Outlet /> : <Navigate to="/" />;
}
