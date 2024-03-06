import React from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StandardButton } from '../customStyling/buttons';

type Inputs = {
  name: string;
  email: string;
  message: string;
};

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.target.reset();
  };

  return (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />

      <Grid container justifyContent='center' alignItems='center'>
        <Box
          paddingX='40px'
          paddingY='40px'
          sx={{
            border: '1px solid #ddd',
            borderRadius: '8px',
          }}
        >
          <Typography
            component='h1'
            variant='h4'
            marginBottom={1}
            textAlign='center'
          >
            Contact Us
          </Typography>
          {errors.name && (
            <Typography
              variant='caption'
              sx={{ color: 'red' }}
              role='alert'
              textAlign='left'
            >
              {errors.name.message}
            </Typography>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin='normal'
              fullWidth
              label='Name'
              {...register('name', {
                required: 'Name is required',
                maxLength: 20,
              })}
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
            <TextField
              label='Email '
              margin='normal'
              variant='outlined'
              fullWidth
              {...register('email', {
                required: 'Email Address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />

            {errors.message && (
              <Typography
                variant='caption'
                sx={{ color: 'red' }}
                marginTop={1}
                role='alert'
              >
                {errors.message.message}
              </Typography>
            )}
            <TextField
              margin='normal'
              label='Message'
              fullWidth
              multiline
              rows={7}
              variant='outlined'
              {...register('message', {
                required: 'Message is required',
                maxLength: 200,
              })}
            />

            <StandardButton
              variant='contained'
              type='submit'
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </StandardButton>
          </form>
        </Box>
      </Grid>
    </Container>
  );
};
