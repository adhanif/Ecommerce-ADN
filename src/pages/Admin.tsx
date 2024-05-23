import React from 'react';
import { useSelector } from 'react-redux';
import { useUserProfileQuery } from '../redux/userQuery';

import { AppState } from '../redux/store';
import Loading from '../components/loading/Loading';
import { skipToken } from '@reduxjs/toolkit/query';

import { Box, Container, Divider, Grid, Typography } from '@mui/material';

import AdminProfileCard from '../components/adminProfile/AdminProfileCard';

export default function Admin() {
  const token = useSelector((state: AppState) => state.user.token);
  const { isLoading, data } = useUserProfileQuery(token ?? skipToken);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container sx={{ marginTop: '3rem' }}>
        <Box marginBottom='10rem'>
          <Box display='flex' justifyContent='center'>
            <Grid item>
              <Typography variant='h4' fontWeight='700' textAlign='center'>
                Admin Dashboard
              </Typography>
              <Divider />
            </Grid>
          </Box>
          {/* {data && <UserProfileCard data={data} />} */}
          {data && <AdminProfileCard data={data} />}
        </Box>
      </Container>
    </>
  );
}
