import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { fetchAllProducts } from '../../redux/slices/productSlice';
import { AppState, useAppDispatch } from '../../redux/store';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

// const me = styled(Typography)`font-size= 1rem`;
const CustomTypography = styled(Typography)`
  && {
    font-size: 1rem;
  }
`;
export default function ProductsDataFetch() {
  const dispatch = useAppDispatch();

  const memoizedFetchAllProducts = useCallback(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    memoizedFetchAllProducts();
  }, [memoizedFetchAllProducts]);

  const productList = useSelector((state: AppState) => state.products.products);
  // console.log(productList);
  return (
    <>
      <Typography>It is working</Typography>
    </>
  );
}
