import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppState } from '../../redux/store';

import UserProfile from '../../pages/UserProfile';
import Admin from '../../pages/Admin';
import {
  useGoogleUserProfileQuery,
  useUserProfileQuery,
} from '../../redux/userQuery';
import { skipToken } from '@reduxjs/toolkit/query';
import GoogleUSerProfile from '../../pages/GoogleUSerProfile';
import Loading from '../loading/Loading';

interface PrivateRouteProps {
  path?: string;
}

export default function PrivateRoutes({
  path,
}: PrivateRouteProps): JSX.Element {
  const token = useSelector((state: AppState) => state.user.token);

  const { data, isLoading } = useUserProfileQuery(token ?? skipToken);

  // const role = useSelector((state: AppState) => state.user.user?.role);
  const googleToken = useSelector((state: AppState) => state.user.googleToken);
  const { data: googleUserRole } = useGoogleUserProfileQuery(
    googleToken ?? skipToken,
  );
  const role = data?.role;

  if (isLoading) {
    return <Loading />;
  }

  if (googleUserRole && path !== 'admin' && path !== 'profile') {
    return <GoogleUSerProfile />;
  } else if (role === 'admin') {
    if (path === '/admin') {
      return <Admin />;
    } else {
      return <Navigate to='/no-access' replace />;
    }
  } else if (role === 'customer') {
    if (path === '/profile') {
      return <UserProfile />;
    } else {
      return <Navigate to='/no-access' replace />;
    }
  } else if (!role && !googleUserRole) {
    return <Navigate to='/login' replace />;
  } else {
    return <Navigate to='/no-access' replace />;
  }
}
