import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import { UserLogin, UserRegister } from '../../misc/types';
import {
  useLoginUserMutation,
  useUserProfileMutation,
} from '../../redux/userQuery';
import { saveUserInfo, setToken } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../hooks/useDispatchApp';
import { setNotification } from '../../redux/slices/notificationSlice';

interface ErrorResponse {
  status: number;
  data: {
    message: string;
    statusCode: number;
  };
}

export default function UserForm() {
  const navigate = useNavigate();
  const [loginUser, { isLoading, data, error }] = useLoginUserMutation();

  const [userProfile, { isLoading: _isLoading, data: _data, error: _error }] =
    useUserProfileMutation();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegister>();

  //user login
  // const token = useSelector((state: AppState) => state.user.token);

  const login: SubmitHandler<UserLogin> = async (data) => {
    const response = await loginUser(data);
    if ('data' in response && 'access_token' in response.data) {
      dispatch(setToken(response.data));
      const res = await userProfile(response.data);
      if ('data' in res) {
        dispatch(saveUserInfo(res.data));
        if (res.data.role === 'customer') {
          dispatch(
            setNotification({
              open: true,
              message: 'Login Successfull',
              severity: 'success',
            }),
          );
          navigate('/profile');
        } else {
          dispatch(
            setNotification({
              open: true,
              message: 'Login Successfull',
              severity: 'success',
            }),
          );
          navigate('/admin');
        }
      }
    }

    if ('error' in response && 'status' in response.error) {
      setTimeout(() => {
        dispatch(
          setNotification({
            open: true,
            message: '401 unauthorized',
            severity: 'error',
          }),
        );
      }, 1000);
    }

    // else {
    //   notify('Login Successfull');
    //   navigate('/profile');
    // }
  };

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
    </>
  );
}
