import React, { useCallback, useEffect, useMemo } from 'react';

import { Box, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useFetchAllProductsQuery } from '../../redux/productsQuery';
import ProductCard from './ProductCard';
import Loading from '../loading/Loading';

export default function ProductsDataFetch() {
  const { data, error, isLoading } = useFetchAllProductsQuery();

  const memoizedData = useMemo(() => data, [data]);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
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
              spacing={2.5}
              // gap={1}
            >
              {memoizedData &&
                memoizedData.map((product, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={index}
                    rowGap={5}
                  >
                    <ProductCard product={product} />
                  </Grid>
                ))}
            </Grid>
          </Container>
        </Box>
      </>
    </>
  );
}
