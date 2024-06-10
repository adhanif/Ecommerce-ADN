import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Container,
  Grid,
  TextField,
  Typography,
  Modal,
  Stack,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

import { StandardButton } from '../customStyling/buttons';
import { useAppDispatch } from '../../redux/store';
import { setNotification } from '../../redux/slices/notificationSlice';
import { useCreateCategoryMutation } from '../../redux/categoryQuery';
import { Category } from '../../misc/types';
import Loading from '../loading/Loading';

export type Inputs = {
  name: string;
  image: string;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

const AdminCreateCategoryForm = () => {
  const [open, setOpen] = useState(false);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      image: '',
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateCategory: SubmitHandler<Category> = async (data) => {
    try {
      const res = await createCategory(data);
      if ('data' in res) {
        dispatch(
          setNotification({
            open: true,
            message: 'Category has been created!',
            severity: 'success',
          }),
        );
      }
      reset();
      handleClose();
    } catch (error) {
      console.error('Error creating category:', error);
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
      <Grid>
        <Grid marginBottom={2}>
          <StandardButton
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Add Category
          </StandardButton>
        </Grid>
        <Modal open={open} onClose={handleClose}>
          <Stack display='flex' sx={style}>
            <IconButton
              aria-label='close'
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                color: 'text.primary',
              }}
            >
              <CloseIcon />
            </IconButton>
            <Container>
              <Grid>
                <form onSubmit={handleSubmit(handleCreateCategory)}>
                  <Grid>
                    <Typography variant='subtitle2' color='text.primary'>
                      Name
                    </Typography>
                    <TextField
                      size='small'
                      fullWidth
                      variant='outlined'
                      {...register('name', {
                        required: 'Name is required',
                        maxLength: 20,
                      })}
                    />
                    <Typography
                      variant='caption'
                      sx={{ color: 'red' }}
                      role='alert'
                    >
                      {errors.name?.message}
                    </Typography>
                  </Grid>
                  <Grid marginTop={1}>
                    <Typography variant='subtitle2' color='text.primary'>
                      Image
                    </Typography>
                    <TextField
                      size='small'
                      fullWidth
                      variant='outlined'
                      {...register('image', {
                        required: 'Image url is required',
                      })}
                    />
                    <Typography
                      variant='caption'
                      sx={{ color: 'red' }}
                      role='alert'
                    >
                      {errors.image?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} marginTop='2rem'>
                    <StandardButton variant='contained' type='submit' fullWidth>
                      Save
                    </StandardButton>
                  </Grid>
                </form>
              </Grid>
            </Container>
          </Stack>
        </Modal>
      </Grid>
    </>
  );
};

export default AdminCreateCategoryForm;
