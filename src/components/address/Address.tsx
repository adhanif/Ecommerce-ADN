import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useCreateAddressMutation } from '../../redux/addressQuery';
import { useForm, Controller } from 'react-hook-form';
import { StandardButton } from '../customStyling/buttons';
import { setNotification } from '../../redux/slices/notificationSlice';
import { useAppDispatch } from '../hooks/useDispatchApp';

export interface AddressProps {
  userId: string;
}

export interface _Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

const initialAddress: _Address = {
  street: '',
  city: '',
  zipCode: '',
  country: '',
  phoneNumber: '',
};

export const Address: React.FC<AddressProps> = ({ userId }) => {
  const [editable, setEditable] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<_Address>({
    defaultValues: initialAddress,
  });

  const [createAddress] = useCreateAddressMutation();

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  const handleClose = () => {
    setEditable(false);
    reset(); // Reset form to default values
  };

  const onSubmit = async (data: _Address) => {
    const newAddress = { ...data, userId };
    const res = await createAddress(newAddress);
    if ('data' in res) {
      dispatch(
        setNotification({
          open: true,
          message: `New Address has been created`,
          severity: 'success',
        }),
      );
    }
    setEditable(false); // Exit edit mode after saving
    reset(); // Reset form to default values
  };

  return (
    <Grid>
      <Card>
        <CardContent>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} sm={6}>
              <Typography
                gutterBottom
                variant='h6'
                component='div'
                fontWeight={1000}
              >
                Address
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} style={{ textAlign: 'end' }}>
              {!editable ? (
                <StandardButton variant='contained' onClick={handleEditToggle}>
                  Create
                </StandardButton>
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
            {editable && (
              <Grid item xs={12}>
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {errors.street && (
                        <Typography
                          variant='caption'
                          sx={{ color: 'red' }}
                          marginTop={1}
                          role='alert'
                        >
                          {errors.street.message}
                        </Typography>
                      )}
                      <Controller
                        name='street'
                        control={control}
                        rules={{ required: '*street address*' }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            size='small'
                            fullWidth
                            label='Street Address'
                            disabled={!editable}
                            required
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {errors.city && (
                        <Typography
                          variant='caption'
                          sx={{ color: 'red' }}
                          marginTop={1}
                          role='alert'
                        >
                          {errors.city.message}
                        </Typography>
                      )}
                      <Controller
                        name='city'
                        control={control}
                        rules={{ required: 'City is required' }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='City'
                            size='small'
                            disabled={!editable}
                            required
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {errors.zipCode && (
                        <Typography
                          variant='caption'
                          sx={{ color: 'red' }}
                          marginTop={1}
                          role='alert'
                        >
                          {errors.zipCode.message}
                        </Typography>
                      )}
                      <Controller
                        name='zipCode'
                        control={control}
                        rules={{ required: '*zip code*' }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='ZIP Code'
                            size='small'
                            disabled={!editable}
                            required
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {errors.country && (
                        <Typography
                          variant='caption'
                          sx={{ color: 'red' }}
                          marginTop={1}
                          role='alert'
                        >
                          {errors.country.message}
                        </Typography>
                      )}
                      <Controller
                        name='country'
                        control={control}
                        rules={{ required: '*country*' }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='Country'
                            size='small'
                            disabled={!editable}
                            required
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {errors.phoneNumber && (
                        <Typography
                          variant='caption'
                          sx={{ color: 'red' }}
                          marginTop={1}
                          role='alert'
                        >
                          {errors.phoneNumber.message}
                        </Typography>
                      )}
                      <Controller
                        rules={{ required: '*phone number*' }}
                        name='phoneNumber'
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='Phone Number'
                            size='small'
                            disabled={!editable}
                            required
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

