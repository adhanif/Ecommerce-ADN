import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppState } from '../../redux/store';

import UserProfile from '../userProfile/UserProfile';
import Admin from '../adminProfile/Admin';

interface PrivateRouteProps {
  path?: string;
}

export default function PrivateRoutes({
  path,
}: PrivateRouteProps): JSX.Element {
  const userProfile = useSelector((state: AppState) => state.user.user?.role);

  if (!userProfile) {
    return <Navigate to='/login' replace />;
  }

  if (userProfile === 'admin') {
    if (path === '/admin') {
      return <Admin />;
    } else {
      return <Navigate to='/no-access' replace />;
    }
  } else if (userProfile === 'customer') {
    if (path === '/profile') {
      return <UserProfile />;
    } else {
      return <Navigate to='/no-access' replace />;
    }
  } else {
    return <Navigate to='/no-access' replace />;
  }
}
