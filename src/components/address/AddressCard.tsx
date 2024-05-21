import React, { useState } from 'react';
import { Card, CardContent, Grid, TextField, Typography } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm, Controller } from 'react-hook-form';

import { useAppDispatch } from '../hooks/useDispatchApp';
import { setNotification } from '../../redux/slices/notificationSlice';
import { StandardButton } from '../customStyling/buttons';
import {
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useFetchAllAddressesQuery,
} from '../../redux/addressQuery';

export interface AddressProps {
  userId: string;
}
export interface Address {
  id: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

export interface _Address {
  id: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

export const AddressCard: React.FC<AddressProps> = ({ userId }) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<_Address | null>(null);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<_Address>({
    defaultValues: {
      id: '',
      street: '',
      city: '',
      zipCode: '',
      country: '',
      phoneNumber: '',
    },
  });

  const {
    data: addresses,
    isLoading,
    error,
  } = useFetchAllAddressesQuery(userId);

  const [updateAddress] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();

  const handleEditToggle = (address: Address) => {
    setEditable(!editable);
    setCurrentAddress(address);
    reset(address); // Reset the form with current address data
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteAddress(id);
      if ('data' in res) {
        dispatch(
          setNotification({
            open: true,
            message: `Address deleted successfully`,
            severity: 'success',
          }),
        );
      }
    } catch (error) {
      dispatch(
        setNotification({
          open: true,
          message: `Error deleting address`,
          severity: 'error',
        }),
      );
    }
  };

  const handleClose = () => {
    setEditable(false);
    reset(); // Reset form to default values
  };

  const onSubmit = async (data: _Address) => {
    try {
      const res = await updateAddress(data);
      if ('data' in res) {
        dispatch(
          setNotification({
            open: true,
            message: `Address updated successfully`,
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
          message: `Error updating address: `,
          severity: 'error',
        }),
      );
    }
  };

  return (
    <Grid container spacing={2}>
      {addresses &&
        addresses.map((address, i) => (
          <Grid item xs={12} key={address.id}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems='center'>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      gutterBottom
                    //   variant='h6'
                      component='div'
                      fontWeight={1000}
                    >
                      Address {i+1}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} style={{ textAlign: 'end' }}>
                    {!editable ? (
                      <IconButton
                        aria-label='edit'
                        onClick={() => handleEditToggle(address)}
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
                    <IconButton
                      aria-label='delete'
                      onClick={() => handleDelete(address.id)}
                      color='inherit'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                  {editable && currentAddress?.id === address.id && (
                    <Grid item xs={12}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Controller
                              name='street'
                              control={control}
                              defaultValue={address.street}
                              rules={{ required: 'Street address is required' }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  size='small'
                                  fullWidth
                                  label='Street Address'
                                  disabled={!editable}
                                  error={!!errors.street}
                                  helperText={
                                    errors.street ? errors.street.message : ''
                                  }
                                  required
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Controller
                              name='city'
                              control={control}
                              defaultValue={address.city}
                              rules={{ required: 'City is required' }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label='City'
                                  size='small'
                                  disabled={!editable}
                                  error={!!errors.city}
                                  helperText={
                                    errors.city ? errors.city.message : ''
                                  }
                                  required
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Controller
                              name='zipCode'
                              control={control}
                              defaultValue={address.zipCode}
                              rules={{ required: 'ZIP Code is required' }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label='ZIP Code'
                                  size='small'
                                  disabled={!editable}
                                  error={!!errors.zipCode}
                                  helperText={
                                    errors.zipCode ? errors.zipCode.message : ''
                                  }
                                  required
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Controller
                              name='country'
                              control={control}
                              defaultValue={address.country}
                              rules={{ required: 'Country is required' }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label='Country'
                                  size='small'
                                  disabled={!editable}
                                  error={!!errors.country}
                                  helperText={
                                    errors.country ? errors.country.message : ''
                                  }
                                  required
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Controller
                              name='phoneNumber'
                              control={control}
                              defaultValue={address.phoneNumber}
                              rules={{ required: 'Phone Number is required' }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label='Phone Number'
                                  size='small'
                                  disabled={!editable}
                                  error={!!errors.phoneNumber}
                                  helperText={
                                    errors.phoneNumber
                                      ? errors.phoneNumber.message
                                      : ''
                                  }
                                  required
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </form>
                    </Grid>
                  )}
                  {!editable && (
                    <Grid item xs={12}>
                      <Typography>{`${address.street}, ${address.city}, ${address.zipCode}, ${address.country}`}</Typography>
                      <Typography>{`Phone Number: ${address.phoneNumber}`}</Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};
