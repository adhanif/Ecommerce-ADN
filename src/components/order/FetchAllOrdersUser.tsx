import React from 'react';
import { useFetchOrdersQuery } from '../../redux/orderQuery';
import OrdersTable from './OrdersTable';
import { Box, Divider, Typography } from '@mui/material';
import Loading from '../loading/Loading';

interface FetchAllOrdersUserProps {
  userId: string;
}

const FetchAllOrdersUser: React.FC<FetchAllOrdersUserProps> = ({ userId }) => {
  const { data, error, isLoading } = useFetchOrdersQuery(userId);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      <Box marginBottom='2rem'>
        <Typography component='h2' variant='h4' fontWeight='700'>
          Order History
        </Typography>
        <Divider />
      </Box>
      {data && data.length > 0 ? (
        <OrdersTable orderData={data} />
      ) : (
        <Typography>No orders found</Typography>
      )}
    </>
  );
};

export default FetchAllOrdersUser;
