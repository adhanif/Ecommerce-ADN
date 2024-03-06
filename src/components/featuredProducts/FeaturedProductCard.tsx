import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardContent, CardMedia, Rating, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const SaleBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: auto;
  background-color: #80b1a0;
  transform: 'translateY(-50%)';
  color: white;
  border-radius: 999px;
  min-width: 3em;
  min-height: 3em;
  font-size: 0.8em;
  text-align: center;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -0.5em -0.5em 0 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

type FeaturedProductCardProp = {
  category: string;
  image: string;
  title: string;
  featuredPrice: number;
  price: number;
};

const FeaturedProductCard = ({
  product,
}: {
  product: FeaturedProductCardProp;
}) => {
  return (
    <>
      <StyledLink to={'/products'}>
        <Card
          sx={{
            height: '100%',
            border: 'none',
            background: 'background.default',
            position: 'relative',
          }}
        >
          <SaleBox>Sale!</SaleBox>
          <Box>
            <CardMedia
              component='img'
              height='230'
              image={product.image}
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
          </Box>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography
              variant='caption'
              component='div'
              color='grey.600'
              marginBottom='10px'
            >
              {product.category}
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
              marginBottom='5px'
              gap={1}
            >
              <Typography
                variant='body2'
                fontWeight={700}
                alignItems='center'
                color='grey.400'
                sx={{ textDecoration: 'line-through' }}
              >
                €{product.featuredPrice}.00
              </Typography>

              <Typography
                variant='body2'
                fontWeight={700}
                alignItems='center'
                color='text.primary'
              >
                €{product.price}.00
              </Typography>
            </Box>
            <Rating name='no-value' readOnly size='small' />
          </CardContent>
        </Card>
      </StyledLink>
    </>
  );
};

export default FeaturedProductCard;
