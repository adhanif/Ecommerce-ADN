import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import {
  Tokens,
  UserFormProps,
  UserLogin,
  UserRegister,
} from '../../misc/types';

import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from '../../redux/userQuery';

import Loading from '../loading/Loading';
import { setToken } from '../../redux/slices/userSlice';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

interface ErrorResponse {
  status: number;
  data: {
    message: string;
    statusCode: number;
  };
}

export default function UserForm() {
  const navigate = useNavigate();
  const [loginUser, { isLoading, data, error,  }] = useLoginUserMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const tokens: Tokens = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      };
      dispatch(setToken(tokens));
    }
  }, [data, dispatch]);

  // dispatch(setToken(data));

  const notify = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegister>();

  //user login

  const login: SubmitHandler<UserLogin> = async (data) => {
    const response = await loginUser(data);

    console.log(response);
    if ('error' in response) {
      if ('status' in response.error) {
        if (response.error.status === 401) {
          // console.log('401 unauthorized');
          setTimeout(() => {
            notifyError('401 unauthorized');
          }, 500);
        }
      }
    } else {
      setTimeout(() => {
        notify('Login Successfull');
      }, 500);

      setTimeout(() => {
        navigate('/home');
      }, 2000);
      reset();
    }
  };

  // loading
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <ToastContainer
        position='top-right'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
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

                <Button
                  type='submit'
                  variant='contained'
                  fullWidth
                  style={{ marginTop: '1rem', backgroundColor: 'black' }}
                >
                  {' '}
                  login
                </Button>
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
                  <Typography variant='body2' fontWeight='bold'>
                    Create an account
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* </ThemeProvider> */}
    </>
  );
}
