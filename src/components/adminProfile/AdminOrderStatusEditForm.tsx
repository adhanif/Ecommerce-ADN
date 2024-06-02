import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Container,
  Grid,
  TextField,
  Typography,
  IconButton,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { StandardButton } from '../customStyling/buttons';
import { useAppDispatch } from '../hooks/useDispatchApp';
import { setNotification } from '../../redux/slices/notificationSlice';
import { useUpdateCategoryMutation } from '../../redux/categoryQuery';
import Loading from '../loading/Loading';
import { Order, OrderResponse, OrderStatus } from '../../misc/types';
import { useUpdateOrderMutation } from '../../redux/orderQuery';

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

type CategoryEditFormProps = {
  handleCloseModal: () => void;
  item: OrderResponse;
};

type Inputs = {
  id: string;
  orderStatus: OrderStatus;
};

export default function AdminOrderStatusEditForm(props: CategoryEditFormProps) {
  const { handleCloseModal, item } = props;
  const dispatch = useAppDispatch();
  const [updateOrder, { isLoading: updateIsLoading }] =
    useUpdateOrderMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      orderStatus: item.orderStatus,
    },
  });

  const onSubmit = async (data: Inputs) => {
    data.id = item.id;
    try {
      const res = await updateOrder(data);
      if ('data' in res) {
        dispatch(
          setNotification({
            open: true,
            message: `Status has been updated!`,
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
                <Grid item xs={12} sm={12} md={12}>
                  <Typography variant='subtitle2' color='text.primary'>
                    Name
                  </Typography>
                  <Controller
                    name='orderStatus'
                    control={control}
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        variant='outlined'
                        fullWidth
                        error={!!errors.orderStatus}
                      >
                        {Object.values(OrderStatus).map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.orderStatus && (
                    <Typography
                      variant='caption'
                      sx={{ color: 'red' }}
                      marginTop={1}
                      role='alert'
                    >
                      {errors.orderStatus.message}
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
