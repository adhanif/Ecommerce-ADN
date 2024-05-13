import React from 'react';
import { useSelector } from 'react-redux';
import { useGoogleUserProfileQuery } from '../redux/userQuery';
import { skipToken } from '@reduxjs/toolkit/query';
import { AppState } from '../redux/store';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import Loading from '../components/loading/Loading';

function GoogleUSerProfile() {
  const googleToken = useSelector((state: AppState) => state.user.googleToken);

  const { data: googleProfileData, isLoading } = useGoogleUserProfileQuery(
    googleToken ?? skipToken,
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {googleProfileData && (
        <Grid
          container
          display='flex'
          justifyContent='center'
          marginBottom='5rem'
          marginTop='3rem'
        >
          <Grid item xs={12} sm={8} md={8}>
            <Card>
              <CardContent>
                <Grid
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                >
                  <Stack marginRight={2}>
                    <Avatar
                      alt={googleProfileData.name}
                      src={googleProfileData.picture}
                      sx={{ width: 100, height: 100, marginBottom: 2 }}
                    />
                  </Stack>

                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant='h5' gutterBottom fontWeight='1000'>
                          {googleProfileData.name.toLocaleUpperCase()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        {' '}
                        <Typography variant='body1'>
                          Email: {googleProfileData.email}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default GoogleUSerProfile;
