import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useFetchAllProductsQuery } from '../../redux/productsQuery';
import ProductCard from './ProductCard';
import Loading from '../loading/Loading';
import { Product } from '../../misc/types';

export default function ProductsDataFetch() {
  const { data, error, isLoading } = useFetchAllProductsQuery();
  const [sortBy, setSortBy] = useState('');

  // Pagination logic

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const memoizedData = useMemo(() => {
    if (!data) return [];
    if (sortBy === 'lowToHigh') {
      return [...data].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'highToLow') {
      return [...data].sort((a, b) => b.price - a.price);
    } else {
      return data;
    }
  }, [data, sortBy]);

  const slicedData = memoizedData.slice(startIndex, endIndex);

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <Box
        id='highlights'
        sx={{
          pb: { xs: 8, sm: 16 },
        }}
      >
        <Container
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 3, sm: 6 },
          }}
        >
          <Box
            sx={{
              width: { sm: '100%', md: '60%' },
              textAlign: { sm: 'left', md: 'center' },
            }}
          >
            <Typography component='h2' variant='h4'>
              Products
            </Typography>
            <Typography variant='body1'>
              Explore why our product stands out: adaptability, durability,
              user-friendly design, and innovation. Enjoy reliable customer
              support and precision in every detail.
            </Typography>
          </Box>

          <Grid
            container
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            marginBottom='3rem'
          >
            <Grid item>
              <Typography>{`Showing all ${memoizedData.length} results`}</Typography>
            </Grid>
            <Grid item>
              <FormControl sx={{ minWidth: 230, border: 'none' }} size='small'>
                <Select
                  value={sortBy}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value=''>Default sorting</MenuItem>
                  <MenuItem value='lowToHigh'>
                    Sort by price: low to high
                  </MenuItem>
                  <MenuItem value='highToLow'>
                    Sort by price: high to low
                  </MenuItem>
                  {/* <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2.5}
            // gap={1}
          >
            {slicedData &&
              slicedData.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index} rowGap={5}>
                  <ProductCard product={product} />
                </Grid>
              ))}
          </Grid>
          <Box marginTop='5rem'>
            <Pagination
              count={Math.ceil(memoizedData.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
