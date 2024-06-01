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
import { useAppDispatch } from '../hooks/useDispatchApp';
import { setNotification } from '../../redux/slices/notificationSlice';
import { useUpdateCategoryMutation } from '../../redux/categoryQuery';

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
  image: string;
};

type Category = {
  id: string;
  name: string;
  image: string;
};

type CategoryEditFormProps = {
  handleCloseModal: () => void;
  item: Category;
};

export default function AdminCategoryEditForm(props: CategoryEditFormProps) {
  const { handleCloseModal, item } = props;
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: item.name,
      image: item.image,
    },
  });

  const onSubmit = async (data: Inputs) => {
    try {
        const res = await updateCategory({ id: item.id, ...data });
      //   if ('data' in res) {
      //     dispatch(
      //       setNotification({
      //         open: true,
      //         message: `Category ${item.name} has been updated!`,
      //         severity: 'success',
      //       }),
      //     );
      //   }
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
                <Grid item xs={12} sm={12} md={12}>
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

                <Grid item xs={12} sm={12} md={12} marginTop='1rem'>
                  <Typography variant='subtitle2' color='text.primary'>
                    Image URL
                  </Typography>
                  <Controller
                    name='image'
                    control={control}
                    rules={{ required: 'Image URL is required' }}
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
                  {errors.image && (
                    <Typography
                      variant='caption'
                      sx={{ color: 'red' }}
                      marginTop={1}
                      role='alert'
                    >
                      {errors.image.message}
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
