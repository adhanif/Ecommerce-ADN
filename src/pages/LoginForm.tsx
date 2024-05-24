import React from 'react';
import {
  Box,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { UserLogin, UserRegister } from '../misc/types';
import { useLoginUserMutation } from '../redux/userQuery';
import { setToken } from '../redux/slices/userSlice';
import { useAppDispatch } from '../components/hooks/useDispatchApp';
import { setNotification } from '../redux/slices/notificationSlice';
import Loading from '../components/loading/Loading';
import { StandardButton } from '../components/customStyling/buttons';
import GoogleLogIn from '../components/googleLogin/GoogleLogIn';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const errorMessage = (error: FetchBaseQueryError | SerializedError) => {
  if ('data' in error && typeof error.data === 'string') {
    try {
      const parsedData = JSON.parse(error.data);
      return parsedData.error || 'An unknown error occurred';
    } catch (e) {
      return error.data;
    }
  } else if ('message' in error) {
    return error.message;
  }
  return 'An unknown error occurred';
};

export default function UserForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<UserRegister>();

  const login: SubmitHandler<UserLogin> = async (data) => {
    const response = await loginUser(data);
    if ('data' in response) {
      dispatch(setToken(response.data));

      navigate('/');
      dispatch(
        setNotification({
          open: true,
          message: 'Login Successfull',
          severity: 'success',
        }),
      );
    }
    if ('error' in response && 'status' in response.error) {
      if (response.error.data) {
        const error = response.error;
        setTimeout(() => {
          dispatch(
            setNotification({
              open: true,
              message: `${error.status}` + errorMessage(error),
              severity: 'error',
            }),
          );
        }, 1000);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container maxWidth='sm'>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          height='100vh'
        >
          <Grid item xs={12}>
            <Box
              textAlign='center'
              paddingX='40px'
              paddingY='40px'
              sx={{
                border: '1px solid #ddd',
                borderRadius: '8px',
              }}
            >
              <Box textAlign='center'>
                <Typography variant='h4'>Sign in</Typography>
              </Box>
              <form onSubmit={handleSubmit(login)}>
                <Typography
                  variant='caption'
                  sx={{ color: 'red' }}
                  marginTop={1}
                  role='alert'
                >
                  {errors.email?.message}
                </Typography>

                <TextField
                  fullWidth
                  label='Email'
                  margin='normal'
                  variant='outlined'
                  color='primary'
                  {...register('email', {
                    required: 'Email Address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />

                <Typography
                  variant='caption'
                  sx={{ color: 'red' }}
                  marginTop={1}
                  role='alert'
                >
                  {errors.password?.message}
                </Typography>

                <TextField
                  fullWidth
                  label='Password'
                  margin='normal'
                  variant='outlined'
                  type='password'
                  {...register('password', {
                    required: 'Password is required',
                    minLength: 6,
                  })}
                />

                <StandardButton
                  type='submit'
                  variant='contained'
                  fullWidth
                  style={{ marginTop: '1rem' }}
                >
                  {' '}
                  login
                </StandardButton>
              </form>
              <Box
                textAlign='center'
                marginTop='1rem'
                display='flex'
                justifyContent='center'
                gap={1}
              >
                <Typography variant='body2'>First time in?</Typography>
                <Link
                  underline='hover'
                  component='button'
                  onClick={() => {
                    navigate('/register');
                  }}
                >
                  <Typography
                    variant='body2'
                    fontWeight='bold'
                    color='text.primary'
                  >
                    Create an account
                  </Typography>
                </Link>
              </Box>
              <GoogleLogIn />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
