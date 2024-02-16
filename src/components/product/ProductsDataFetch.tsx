import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { fetchAllProducts } from '../../redux/slices/productSlice';
import { AppState, useAppDispatch } from '../../redux/store';

export default function ProductsDataFetch() {
  const dispatch = useAppDispatch();

  const memoizedFetchAllProducts = useCallback(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    memoizedFetchAllProducts();
  }, [memoizedFetchAllProducts]);

  const productList = useSelector((state: AppState) => state.products.products);
  console.log(productList);
  return <div>ProductsDataFetch</div>;
}
