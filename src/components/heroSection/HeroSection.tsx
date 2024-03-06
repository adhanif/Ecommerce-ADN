import React from 'react';
import styled from '@emotion/styled';
import hero from '../images/hero1.jpg';
import { Grid, Typography } from '@mui/material';
import { StandardButton } from '../customStyling/buttons';
import { useNavigate } from 'react-router-dom';

interface StyledBoxProps {
  hero: string;
}
// min-height: 100vh;
const StyledBox = styled.div<StyledBoxProps>`
  position: relative;
  width: 100%;
  height: 45rem;
  background-image: url(${(props) => props.hero});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: right;
  margin: 5rem;
`;

const HeroSection = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/products');
  };

  return (
    <>
      <StyledBox hero={hero}>
        <MainBox>
          <Typography>Black Friday in March</Typography>
          <Typography
            fontWeight='700'
            sx={{
              typography: {
                xs: { fontSize: '1.5rem' },
                sm: { fontSize: '2.5rem' },
                md: { fontSize: '3.5rem' },
              },
            }}
            letterSpacing={1}
          >
            Up to 70% off
          </Typography>
          <Typography>Hundreds of items available</Typography>
          <Grid item xs={3} sm={6} marginTop='1rem'>
            <StandardButton variant='contained' onClick={handleNavigate}>
              SHOP NOW
            </StandardButton>
          </Grid>
        </MainBox>
      </StyledBox>
    </>
  );
};

export default HeroSection;
