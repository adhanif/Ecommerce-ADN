import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { ContactForm } from './ContactForm';
import MapDetail from './MapDetail';

export const Contact = () => {
  return (
    <>
      <Container maxWidth='xl'>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          marginTop='5rem'
        >
          {/* <Typography>Best products</Typography> */}
          <Typography
            fontWeight='900'
            sx={{
              typography: {
                xs: { fontSize: '1.5rem' },
                sm: { fontSize: '2.5rem' },
                md: { fontSize: '3rem' },
              },
            }}
          >
           Get in touch
          </Typography>
          <Box borderBottom={2} width='5%' my={1} color='#cde2d9' />
        </Box>

        <Grid
          container
          display='flex'
          justifyContent='center'
          alignItems='center'
          direction='row'
          // minHeight='100vh'
          marginTop='5rem'
          marginBottom='12rem'
        >
          <Grid item xs={12} md={6}>
            <ContactForm />
          </Grid>
          <Grid item xs={12} md={6}>
            <MapDetail />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
