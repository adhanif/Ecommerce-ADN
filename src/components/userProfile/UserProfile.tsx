import React from 'react';
import { useUserProfileQuery } from '../../redux/userQuery';
import { useSelector } from 'react-redux';

import { AppState } from '../../redux/store';
import Loading from '../loading/Loading';
import ProfileCard from '../profileCard/ProfileCard';
import { skipToken } from '@reduxjs/toolkit/query';

export default function UserProfile() {
  const token = useSelector((state: AppState) => state.user.token);
  const { isLoading, data } = useUserProfileQuery(token ?? skipToken);


  if (isLoading) {
    return <Loading />;
  }

  return <>{data && <ProfileCard data={data} />}</>;
}
