import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Tokens,
  UserFormProps,
  UserLogin,
  UserRegister,
} from '../../misc/types';

import { useAppDispatch } from '../../redux/store';
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from '../../redux/authQuery';
import { RttRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/slices/authSlice';
// import { signIn } from '../../redux/slices/authSlice';

export default function UserForm({ type }: UserFormProps) {
  const navigate = useNavigate();
  const [loginUser, { isError, error, isLoading, data }] =
    useLoginUserMutation();

  const [
    UserRegister,
    {
      isError: regIsError,
      error: regError,
      isLoading: regIsLoading,
      data: regData,
    },
  ] = useRegisterUserMutation();

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

  const defaultVariant = type === 'login' ? 'login' : 'register';
  const notify = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  //
  const [variant, setVariant] = useState<'login' | 'register'>(defaultVariant);

  useEffect(() => {
    setVariant(defaultVariant);
  }, [defaultVariant]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegister>();

  const toggleVariant = useCallback(() => {
    setVariant((currVariant) =>
      currVariant === 'login' ? 'register' : 'login',
    );
    reset();
  }, [reset]);

  //user register
  const registerUser: SubmitHandler<UserRegister> = useCallback(
    async (data) => {
      const response = await UserRegister(data);
      console.log(response);
      if (response) {
        notify('The user has registered successfully');
      }
    },
    [],
  );

  //user login
  const login: SubmitHandler<UserLogin> = useCallback(async (data) => {
    const response = await loginUser(data);

    if ('error' in response) {
      if ('status' in response.error) {
        if (response.error.status === 401) {
          notifyError('401 unauthorized');
        }
      }
    }

    notify('Login Successfull');
    reset();
  }, []);

  // loading
  // if (isLoading) {
  //   return <div> Loading</div>;
  // }

  return (
    <>
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
                // paddingX: '40px',
                // paddingY: '30px 20px',
              }}
            >
              <Box textAlign='center'>
                <Typography variant='h4'>
                  {variant === 'login' ? 'Sign in' : 'Sign up'}
                </Typography>
              </Box>
              <form
                onSubmit={handleSubmit(
                  variant === 'login' ? login : registerUser,
                )}
              >
                {variant === 'register' && (
                  <>
                    {errors.name && (
                      <Typography
                        variant='caption'
                        sx={{ color: 'red' }}
                        marginTop={1}
                        role='alert'
                      >
                        {errors.name.message}
                      </Typography>
                    )}
                    <TextField
                      fullWidth
                      label='Name'
                      margin='normal'
                      variant='outlined'
                      {...register('name', {
                        required: 'Name is required',
                        maxLength: 20,
                        pattern: /^[A-Za-z\s]+$/i,
                      })}
                    />
                  </>
                )}

                {errors.email && (
                  <Typography
                    variant='caption'
                    sx={{ color: 'red' }}
                    marginTop={1}
                    role='alert'
                  >
                    {errors.email.message}
                  </Typography>
                )}
                <TextField
                  fullWidth
                  label='Email'
                  margin='normal'
                  variant='outlined'
                  {...register('email', {
                    required: 'Email Address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />

                {errors.password && (
                  <Typography
                    variant='caption'
                    sx={{ color: 'red' }}
                    marginTop={1}
                    role='alert'
                  >
                    {errors.password.type === 'required'
                      ? 'Password is required'
                      : errors.password.type === 'minLength'
                      ? 'Password must be at least 6 characters long'
                      : ''}
                  </Typography>
                )}
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

                {errors.avatar && (
                  <Typography
                    variant='caption'
                    sx={{ color: 'red' }}
                    marginTop={1}
                    role='alert'
                  >
                    {errors.avatar.message}
                  </Typography>
                )}

                {variant === 'register' && (
                  <TextField
                    fullWidth
                    label='Avatar'
                    margin='normal'
                    variant='outlined'
                    {...register('avatar', {
                      required: 'Avatar link is required',
                      pattern: {
                        value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/i,
                        message: 'Invalid URL format',
                      },
                    })}
                  />
                )}

                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  fullWidth
                  style={{ marginTop: '1rem' }}
                >
                  {' '}
                  {variant === 'login' ? 'login' : 'Sign up'}
                </Button>
              </form>
              <Box textAlign='center' marginTop='1rem'>
                <Typography variant='body2'>
                  {variant === 'login'
                    ? 'First time in?'
                    : 'Already have an account?'}
                  <Link
                    underline='hover'
                    component='button'
                    onClick={toggleVariant}
                  >
                    {variant === 'login' ? 'Create an account' : 'Log in now!'}
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
