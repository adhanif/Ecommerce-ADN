import React from 'react';
import styled from '@emotion/styled';
import { Box, Grid, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import { SearchButton } from '../customStyling/buttons';
import { useNavigate } from 'react-router-dom';



const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

const StyledTitle = styled.div`
  font-size: 1.4666666666667rem;
  line-height: 1.2em;
  font-weight: 600;
  text-transform: none;
  margin-top: 7px;
`;

const StyledOfferBox = styled.div`
  background-color: #cde2d9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10rem;
  min-height: 10rem;
`;
// width: 100%;
const WhyChooseUs = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/products');
  };

  return (
    <>
      <Box minHeight='40rem' marginBottom='5rem' marginTop='5rem'>
        <Box display='flex' alignItems='center'>
          <StyledBox>
            <Typography>Best products</Typography>
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
              Why choose us
            </Typography>
            <Box borderBottom={2} width='5%' my={1} color='#cde2d9' />

            <Grid container display='flex' marginTop='2rem'>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <StyledBox>
                  <LocalShippingIcon
                    sx={{ fontSize: '3rem', color: 'text.secondary' }}
                  />
                  <StyledTitle>Fast Delivery</StyledTitle>
                  <Typography
                    variant='body1'
                    color='grey.600'
                    textAlign='center'
                    marginTop='7px'
                  >
                    Efficient dispatch for your contentment. Obtain your order
                    promptly, ensuring a smooth experience.
                  </Typography>
                </StyledBox>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StyledBox>
                  <CreditCardIcon
                    sx={{ fontSize: '3rem', color: 'text.secondary' }}
                  />
                  <StyledTitle>Free Shipping</StyledTitle>
                  <Typography
                    variant='body1'
                    color='grey.600'
                    textAlign='center'
                    marginTop='7px'
                  >
                    Enjoy cost-free shipping for a delightful shopping journey.
                    Your items will reach you without additional charges.
                  </Typography>
                </StyledBox>
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StyledBox>
                  <EnhancedEncryptionIcon
                    sx={{ fontSize: '3rem', color: 'text.secondary' }}
                  />
                  <StyledTitle>Secure Checkout</StyledTitle>
                  <Typography
                    variant='body1'
                    color='grey.600'
                    textAlign='center'
                    marginTop='7px'
                  >
                    Relax with our secure checkout process. Your transactions
                    are protected, ensuring a worry-free purchase.
                  </Typography>
                </StyledBox>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StyledBox>
                  <AssignmentReturnedIcon
                    sx={{ fontSize: '3rem', color: 'text.secondary' }}
                  />
                  <StyledTitle>Easy Returns</StyledTitle>
                  <Typography
                    variant='body1'
                    color='grey.600'
                    textAlign='center'
                    marginTop='7px'
                  >
                    Returns made easy for your convenience. If needed, our
                    return process is straightforward and hassle-free.
                  </Typography>
                </StyledBox>
              </Grid>
            </Grid>
          </StyledBox>
        </Box>
        <StyledOfferBox>
          <Grid
            container
            display='flex'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
          >
            <Grid>
              <Typography
                fontWeight='900'
                sx={{
                  textAlign: 'center',
                  typography: {
                    xs: { fontSize: '1.5rem' },
                  },
                  marginRight: {
                    xs: '0rem',
                    sm: '1rem',
                    md: '5rem',
                  },
                }}
                color='black'
              >
                GRAB THIS LIMITED TIME OFFER
              </Typography>
            </Grid>
            <Grid>
              <SearchButton variant='contained' onClick={handleNavigate}>
                ORDER NOW
              </SearchButton>
            </Grid>
          </Grid>
        </StyledOfferBox>
      </Box>
    </>
  );
};

export default WhyChooseUs;
