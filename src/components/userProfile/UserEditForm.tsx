import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Container,
  Grid,
  TextField,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { StandardButton } from '../customStyling/buttons';
import { UserUpdate } from '../../misc/types';
import { useAppDispatch } from '../hooks/useDispatchApp';
import { setNotification } from '../../redux/slices/notificationSlice';
import {
  UserAddress,
  useUpdateUserByAdminMutation,
} from '../../redux/userQuery';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Inputs = {
  name: string;
  email: string;
  role: string;
  avatar: string | null;
};

type PropUser = {
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  password?: string;
  addresses: UserAddress[];
  id: string;
  createdDate: string;
  updatedDate: string;
};

type UserEditFormProps = {
  handleCloseModal: () => void;
  item: PropUser;
};

export default function UserEditForm(props: UserEditFormProps) {
  const { handleCloseModal, item } = props;
  const [updateUserByAdmin] = useUpdateUserByAdminMutation();

  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: item.name,
      email: item.email,
      role: item.role,
      avatar: item.avatar,
    },
  });

  const onSubmit = async (data: Inputs) => {
    const updateData: UserUpdate = {
      email: data.email,
    };

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
      const res = await updateUserByAdmin([item.id, data]);
      if ('data' in res) {
        dispatch(
          setNotification({
            open: true,
            message: `User ${item.name} has been updated!`,
            severity: 'success',
          }),
        );
      }
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Box>
          <IconButton
            aria-label='close'
            onClick={handleCloseModal}
            style={{
              position: 'absolute',
              top: 50,
              right: 50,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={style}>
          <Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                display='flex'
                justifyContent='center'
                spacing='10'
              >
                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant='subtitle2' color='text.primary'>
                    Name
                  </Typography>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size='small'
                        variant='outlined'
                        color='primary'
                        fullWidth
                      />
                    )}
                  />
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
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant='subtitle2' color='text.primary'>
                    Email
                  </Typography>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: 'Email is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size='small'
                        variant='outlined'
                        color='primary'
                        fullWidth
                      />
                    )}
                  />
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
                </Grid>

                <Grid item xs={12} sm={12} md={12} marginTop='1rem'>
                  <Typography variant='subtitle2' color='text.primary'>
                    Role
                  </Typography>
                  <Controller
                    name='role'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size='small'
                        variant='outlined'
                        color='primary'
                        fullWidth
                      />
                    )}
                  />
                  {errors.role && (
                    <Typography
                      variant='caption'
                      sx={{ color: 'red' }}
                      marginTop={1}
                      role='alert'
                    >
                      {errors.role.message}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} sm={12} md={12} marginTop='2rem'>
                  <Typography variant='subtitle2' color='text.primary'>
                    Avatar
                  </Typography>
                  <Controller
                    name='avatar'
                    control={control}
                    defaultValue={item.avatar || ''}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        error={!!errors.avatar}
                        helperText={errors.avatar ? errors.avatar.message : ''}
                      />
                    )}
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
                </Grid>
                <Grid item xs={12} sm={12} md={3} marginTop='2rem'>
                  <StandardButton variant='contained' type='submit' fullWidth>
                    Save
                  </StandardButton>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
