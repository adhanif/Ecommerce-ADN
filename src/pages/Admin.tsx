import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUserProfileQuery } from '../redux/userQuery';
import CloseIcon from '@mui/icons-material/Close';

import { AppState } from '../redux/store';
import Loading from '../components/loading/Loading';
import { skipToken } from '@reduxjs/toolkit/query';

import AddIcon from '@mui/icons-material/Add';
import AdminTable from '../components/adminProfile/AdminProductTable';
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { StandardButton } from '../components/customStyling/buttons';
import ProductForm from '../components/product/ProductCreateForm';
import AdminUsersTable from '../components/adminProfile/AdminUsersTable';
import UserProfileCard from '../components/userProfile/UserProfileCard';
import AdminProfileCard from '../components/adminProfile/AdminProfileCard';

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
};

export default function Admin() {
  const token = useSelector((state: AppState) => state.user.token);
  const { isLoading, data } = useUserProfileQuery(token ?? skipToken);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container sx={{ marginTop: '3rem' }}>
        <Box marginBottom='10rem'>
          <Box display='flex' justifyContent='center'>
            <Grid item>
              <Typography variant='h4' fontWeight='700' textAlign='center'>
                Admin Dashboard
              </Typography>
              <Divider />
            </Grid>
          </Box>
          {/* {data && <UserProfileCard data={data} />} */}
          {data && <AdminProfileCard data={data} />}
        </Box>
      </Container>
    </>
  );
}
