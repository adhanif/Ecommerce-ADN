import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { AppState } from '../../redux/store';

export default function PrivateRoutes() {
  // const user = useSelector((state: AppState) => state.user.user?.role);
  const token = useSelector(
    (state: AppState) => state.user.token?.access_token,
  );
  //   const userRole = useSelector(user?.role);

  return token ? <Outlet /> : <Navigate to={'/login'} />;
}

// import { Navigate } from "react-router-dom";

// interface PrivateRouteType {
//   Component: React.ComponentType<any>;
// }

// const PrivateRoute = ({ Component }: PrivateRouteType) => {
//   const isAuthenticated = localStorage.getItem("access-token") ? true : false;
//   return isAuthenticated ? <Component /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;
