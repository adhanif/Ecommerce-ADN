import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetOneProductQuery } from '../../redux/productsQuery';
import {
  Button,
  Container,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
  Modal,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EuroIcon from '@mui/icons-material/Euro';
import styled from 'styled-components';
import { Button as MuiButton } from '@mui/material';
import Loading from '../loading/Loading';
export const ArrowButton = styled(MuiButton)`
  && {
    paddingx: 0px;
    width: 1px;
    background-color: black;
    margin-right: 6px;
    &:hover {
      background-color: gray;
    }
  }
`;

export default function ProductDetail() {
  const productId = useParams();
  const { data, isLoading } = useGetOneProductQuery(Number(productId.id));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // const [nextId, setNextId] = useState(Number(productId.id));
  // const [previousId, setPreviousId] = useState(Number(productId.id));

  console.log(Number(productId.id));
  // const handleNext = () => {};
  // const handlePrevious = () => {
  //   setPreviousId(previousId - 1);
  // };

  console.log(data);
  // useEffect(() => {
  //   // getOneProduct(Number(productId));
  // }, []);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {data && (
        <Container>
          <Grid
            container
            display='flex'
            justifyContent='space-between'
            alignItems='flex-start'
            marginTop='10rem'
          >
            <Grid item xs={12} sm={5} md={5} lg={5} marginRight={1}>
              <ImageList cols={2} gap={6} rowHeight={240}>
                {data.images.map((image, i) => (
                  <ImageListItem key={i}>
                    <img
                      src={image}
                      style={{ cursor: 'pointer' }}
                      alt={data.title}
                      onClick={() => handleImageClick(image)}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              <Modal open={Boolean(selectedImage)} onClose={handleCloseModal}>
                <Stack display='flex'>
                  <IconButton
                    aria-label='close'
                    onClick={handleCloseModal}
                    style={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      color: 'white',
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt={selectedImage}
                      style={{
                        maxWidth: '50%',
                        maxHeight: '40%',
                        margin: '2rem auto',
                      }}
                    />
                  )}
                </Stack>
              </Modal>
            </Grid>

            <Grid container item xs={12} sm={6} md={6} lg={6}>
              <Grid container item display='flex' alignItems='center'>
                <Grid
                  item
                  sm={8}
                  md={8}
                  lg={8}
                  display='flex'
                  alignItems='center'
                >
                  <Link to='/home' style={{ textDecoration: 'none' }}>
                    <Typography variant='body2' color='grey.600'>
                      Home
                    </Typography>
                  </Link>

                  <Link to='/products' style={{ textDecoration: 'none' }}>
                    <Typography variant='body2' color='grey.600'>
                      / Products
                    </Typography>
                  </Link>

                  <Typography variant='body2' color='grey.600'>
                    {'  '}/{'  '}
                    {data.title}
                  </Typography>
                </Grid>

                <Grid
                  item
                  sm={4}
                  md={4}
                  lg={4}
                  display='flex'
                  alignItems='center'
                >
                  <ArrowButton
                    size='small'
                    variant='contained'
                    // onClick={handlePrevious}
                  >
                    <ArrowBackIosNewIcon />
                  </ArrowButton>
                  <ArrowButton
                    size='small'
                    variant='contained'
                    // onClick={handleNext}
                  >
                    <ArrowForwardIosIcon />
                  </ArrowButton>
                </Grid>
              </Grid>
              <Grid>
                <Typography variant='h4' marginTop={5} marginBottom={5}>
                  {data.title.toLocaleUpperCase()}
                </Typography>
                <Typography
                  variant='h6'
                  fontWeight={700}
                  sx={{ color: 'red' }}
                  display='flex'
                  alignItems='center'
                >
                  €{data.price}.00{' '}
                  <Typography variant='body2' color='grey.600' marginLeft={1}>
                    & Free Shipping
                  </Typography>
                </Typography>
                <Typography variant='body2' color='grey.600'>
                  {data.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
