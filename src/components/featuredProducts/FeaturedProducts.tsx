import React from 'react';
import hoddie from '../../components/images/hoddie.jpeg';
import remote from '../../components/images/remote.jpeg';
import cap from '../../components/images/cap.jpeg';
import car from '../../components/images/car.jpg';

import { Box, Container, Grid, Typography } from '@mui/material';

import FeaturedProductCard from './FeaturedProductCard';

const feauturedData = [
  {
    category: 'clothes',
    image: hoddie,
    title: 'Classic Red Pullover Hoodie',
    featuredPrice: 12,
    price: 10,
  },
  {
    category: 'Electronics',
    image: remote,
    title: 'White & Orange Wireless Remote',
    featuredPrice: 100,
    price: 69,
  },
  {
    category: 'Clothes',
    image: cap,
    title: 'Classic Navy Blue Baseball Cap',
    featuredPrice: 80,
    price: 61,
  },
  {
    category: 'Miscellaneous',
    image: car,
    title: 'Sleek All-Terrain Go-Kart',
    featuredPrice: 200,
    price: 100,
  },
];

const FeaturedProducts = () => {
  return (
    <>
      <Container maxWidth='xl'>
        <Grid
          minHeight='40rem'
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          margin={2}
        >
          <Grid
            item
            marginBottom='3rem'
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
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
              Featured Products
            </Typography>
            <Box borderBottom={2} width='15%' my={1} color='#cde2d9' />
          </Grid>
          <Grid
            container
            item
            display='flex'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            spacing={2.5}
          >
            {feauturedData.map((product, i) => (
              <Grid item xs={12} sm={6} md={3} lg={2.7} key={i}>
                <FeaturedProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FeaturedProducts;
