import React from 'react';
import { useSelector } from 'react-redux';
import { useUserProfileQuery } from '../../redux/userQuery';

import { AppState } from '../../redux/store';
import Loading from '../loading/Loading';
import ProfileCard from '../profileCard/ProfileCard';
import { skipToken } from '@reduxjs/toolkit/query';
import { useFetchAllProductsQuery } from '../../redux/productsQuery';
import AddIcon from '@mui/icons-material/Add';
import AdminTable from './AdminTable';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { SearchButton } from '../customStyling/buttons';
import ProductForm from '../product/ProductCreateForm';
import ProductEditForm from '../product/ProductEditForm';

export default function Admin() {
  const token = useSelector((state: AppState) => state.user.token);
  const { isLoading, data } = useUserProfileQuery(token ?? skipToken);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container>
        {/* <ProductEditForm /> */}
        <ProductForm />
        <Box display='flex' justifyContent='center'>
          <Grid item>
            <Typography variant='h4' fontWeight='700'>
              Admin Dashboard
            </Typography>
            <Divider />
          </Grid>
        </Box>

        {data && <ProfileCard data={data} />}

        <Grid
          marginBottom='4rem'
          container
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item>
            <Typography variant='h4' fontWeight='700'>
              All Products
            </Typography>
          </Grid>
          <Grid item>
            <SearchButton variant='contained' startIcon={<AddIcon />}>
              Add Product
            </SearchButton>
          </Grid>
        </Grid>

        <AdminTable />
      </Container>
    </>
  );
}
