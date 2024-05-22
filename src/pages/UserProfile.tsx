import React from 'react';
import { useUserProfileQuery } from '../redux/userQuery';
import { useSelector } from 'react-redux';

import { AppState } from '../redux/store';
import Loading from '../components/loading/Loading';
import UserProfileCard from '../components/userProfile/UserProfileCard';
import { skipToken } from '@reduxjs/toolkit/query';
import { Container, Grid } from '@mui/material';

export default function UserProfile() {
  const token = useSelector((state: AppState) => state.user.token);

  const { isLoading, data } = useUserProfileQuery(token ?? skipToken);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container>
        <Grid marginTop='8rem' marginBottom='8rem' container>
          {data && <UserProfileCard data={data} />}
        </Grid>
      </Container>
    </>
  );
}
