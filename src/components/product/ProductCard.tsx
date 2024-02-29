import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import EuroIcon from '@mui/icons-material/Euro';
import { CardContent, CardMedia, Rating, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import { Product } from '../../misc/types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      sx={{
        height: '100%',
        border: 'none',
        background: 'transparent',
      }}
    >
      <Box>
        <Link to={`/products/${product.id}`}>
          <CardMedia
            component='img'
            height='230'
            image={product.images[0]}
            alt={product.title}
            sx={{
              objectFit: 'cover',
              backgroundPosition: 'center',
              transition: ' transform 0.6s',
              transformOrigin: 'center center',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
        </Link>
      </Box>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant='caption' component='div' color='grey.600'>
          {product.category.name}
        </Typography>
        <Typography
          variant='subtitle2'
          component='div'
          fontWeight='800'
          noWrap
          marginBottom='5px'
        >
          {product.title}
        </Typography>

        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          color='grey.800'
          marginBottom='5px'
        >
          <EuroIcon sx={{ fontSize: '15px' }} />
          <Typography variant='body2' fontWeight={700} alignItems='center'>
            {product.price}.00
          </Typography>
        </Box>
        <Rating
          name='no-value'
          readOnly
          size='small'
          value={Math.floor(Math.random() * 5)}
        />
      </CardContent>
    </Card>
  );
}
