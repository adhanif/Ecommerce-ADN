import React, { useCallback, useEffect, useState } from 'react';
import { useUserProfileMutation } from '../../redux/userQuery';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { AppState } from '../../redux/store';
import Loading from '../loading/Loading';
import { saveUserInfo } from '../../redux/slices/userSlice';

export default function UserProfile() {
  const dispatch = useDispatch();
  const [userProfile, { isLoading, data, error }] = useUserProfileMutation();
  const token = useSelector((state: AppState) => state.user.token);

  const fetchUserProfile = useCallback(async () => {
    try {
      if (token) {
        const response = await userProfile(token);
        if ('data' in response) {
          dispatch(saveUserInfo(response.data));
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, [token, userProfile, dispatch]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {data && (
        <Grid
          container
          display='flex'
          justifyContent='center'
          marginBottom='10rem'
          marginTop='10rem'
        >
          <Grid item xs={12} sm={8} md={8}>
            <Card>
              <CardContent>
                <Grid display='flex' alignItems='center'>
                  <Stack marginRight={2}>
                    <Avatar
                      alt={data.name}
                      src={data.avatar}
                      sx={{ width: 100, height: 100, marginBottom: 2 }}
                    />
                  </Stack>

                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant='h5' gutterBottom fontWeight='1000'>
                          {data.name.toLocaleUpperCase()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {' '}
                        <Typography variant='body1'>
                          Email: {data.email}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography variant='body1'>
                          Role: {data.role}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='body1'>
                          Created At:{' '}
                          {new Date(data.creationAt).toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='body1'>
                          Updated At:{' '}
                          {new Date(data.updatedAt).toLocaleString()}
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
