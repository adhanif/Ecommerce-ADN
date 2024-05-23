import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useForm, Controller } from 'react-hook-form';

import { useAppDispatch } from '../hooks/useDispatchApp';
import { setNotification } from '../../redux/slices/notificationSlice';
import {
  useUpdateUserMutation,
  useUserProfileQuery,
} from '../../redux/userQuery';
import { UserUpdate } from '../../misc/types';
import { AppState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query';

export interface UserInfoProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
}

export interface User {
  id: string;
  name?: string;
  email: string;
  password?: string;
  avatar?: string | null;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const [editable, setEditable] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const token = useSelector((state: AppState) => state.user.token);

  const { refetch } = useUserProfileQuery(token ?? skipToken);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      id: user.id,
      name: user.name || '',
      email: user.email || '',
      password: '',
      avatar: user.avatar,
    },
  });

  const [updateUser] = useUpdateUserMutation();

  const handleEditToggle = () => {
    setEditable(!editable);
    reset(user); // Reset the form with current user data
  };

  const handleClose = () => {
    setEditable(false);
    reset(); // Reset form to default values
  };

  const onSubmit = async (data: User) => {
    const updateData: UserUpdate = {
      email: data.email, // Ensure email is always defined
    };

    // Add optional fields if they are provided
    if (data.password) {
      updateData.password = data.password;
    }
    if (
      data.avatar !== null &&
      data.avatar !== undefined &&
      data.avatar !== ''
    ) {
      updateData.avatar = data.avatar;
    }

    if (data.name) {
      updateData.name = data.name;
    }

    try {
      const res = await updateUser(updateData);
      if ('data' in res) {
        refetch();
        dispatch(
          setNotification({
            open: true,
            message: `User updated successfully`,
            severity: 'success',
          }),
        );
      }

      setEditable(false); // Exit edit mode after saving
      reset(); // Reset form to default values
    } catch (error) {
      dispatch(
        setNotification({
          open: true,
          message: `Error updating user: `,
          severity: 'error',
        }),
      );
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box marginBottom='2rem'>
          <Typography component='h2' variant='h4' fontWeight='700'>
            User Profile
          </Typography>
          <Divider />
        </Box>
        <Card>
          <CardContent>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom component='div' fontWeight={1000}>
                  User Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} style={{ textAlign: 'end' }}>
                {!editable ? (
                  <IconButton
                    aria-label='edit'
                    onClick={handleEditToggle}
                    color='inherit'
                  >
                    <EditIcon />
                  </IconButton>
                ) : (
                  <>
                    <IconButton
                      aria-label='save'
                      onClick={handleSubmit(onSubmit)}
                      color='inherit'
                    >
                      <SaveIcon />
                    </IconButton>
                    <IconButton
                      aria-label='close'
                      onClick={handleClose}
                      color='inherit'
                    >
                      <CloseIcon />
                    </IconButton>
                  </>
                )}
              </Grid>
              {editable ? (
                <Grid item xs={12}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Controller
                          name='name'
                          control={control}
                          defaultValue={user.name}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              size='small'
                              fullWidth
                              label='Name'
                              disabled={!editable}
                              error={!!errors.name}
                              helperText={
                                errors.name ? errors.name.message : ''
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Controller
                          name='email'
                          control={control}
                          defaultValue={user.email}
                          rules={{ required: 'Email is required' }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label='Email'
                              size='small'
                              disabled={!editable}
                              error={!!errors.email}
                              helperText={
                                errors.email ? errors.email.message : ''
                              }
                              required
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Controller
                          name='password'
                          control={control}
                          defaultValue=''
                          rules={{
                            minLength: {
                              value: 6,
                              message:
                                'Password must be at least 6 characters long',
                            },
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label='Password'
                              type='password'
                              size='small'
                              disabled={!editable}
                              error={!!errors.password}
                              helperText={
                                errors.password ? errors.password.message : ''
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Controller
                          name='avatar'
                          control={control}
                          defaultValue={user.avatar || ''}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label='Avatar URL'
                              size='small'
                              disabled={!editable}
                              error={!!errors.avatar}
                              helperText={
                                errors.avatar ? errors.avatar.message : ''
                              }
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              ) : (
                <Grid display='flex' item xs={12} alignItems='center'>
                  <Grid item marginRight={2}>
                    {user.avatar && (
                      <img
                        src={user.avatar}
                        alt={`${user.name}'s avatar`}
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                        }}
                      />
                    )}
                  </Grid>
                  <Grid>
                    <Typography>{`Name: ${user.name}`}</Typography>
                    <Typography>{`Email: ${user.email}`}</Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
