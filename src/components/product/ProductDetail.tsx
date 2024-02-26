import React, { useState } from 'react';
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
  Box,
  Divider,
  CardMedia,
  Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import visa from '../images/visa.png';
import master from '../images/master.png';
import discover from '../images/discover.png';
import american from '../images/american.png';

import Loading from '../loading/Loading';
import { ArrowGroupButton, SquareButton } from '../customStyling/buttons';
import { useAppDispatch } from '../../redux/store';
import { addToCart } from '../../redux/slices/cartSlice';
import QuantityControlButton from '../cart/QuantityControlButton';
import { setNotification } from '../../redux/slices/notificationSlice';

export default function ProductDetail() {
  const productId = useParams();
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [count, setCount] = useState(0);

  const [previousId, setPreviousId] = useState(Number(productId.id));

  const { data, isLoading } = useGetOneProductQuery(previousId);

  const handleNext = () => {
    setPreviousId(previousId + 1);
  };

  const handlePrevious = () => {
    setPreviousId(previousId - 1);
  };

  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleMinus = () => {
    if (count >= 1) {
      setCount(count - 1);
    }
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // console.log(data);
  const handleCart = () => {
    if (data && count >= 1) {
      dispatch(addToCart({ product: data, count }));
      setCount(0);
      dispatch(
        setNotification({
          open: true,
          message: `${count} item${
            count !== 1 ? 's have' : ' has'
          } been added to the cart!`,
          severity: 'success',
        }),
      );
    }
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
            marginBottom='10rem'
          >
            <Grid item xs={12} sm={12} md={5} lg={5} marginRight={1}>
              <ImageList cols={2} gap={6} rowHeight={200}>
                {data.images.map((image, index) => (
                  <ImageListItem
                    key={index}
                    cols={index === 0 ? 2 : 1}
                    rows={index === 0 ? 2 : 1}
                  >
                    <img
                      src={image}
                      style={{
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
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

            <Grid
              container
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={{ mt: { xs: '5rem', sm: '5rem', md: '0' } }}
            >
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
                  <ArrowGroupButton
                    aria-label='Basic button group'
                    size='medium'
                  >
                    <SquareButton size='small' onClick={handlePrevious}>
                      <ArrowBackIosNewIcon fontSize='small' />
                    </SquareButton>
                    <SquareButton size='small' onClick={handleNext}>
                      <ArrowForwardIosIcon fontSize='small' />
                    </SquareButton>
                  </ArrowGroupButton>
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

                <QuantityControlButton
                  count={count}
                  handleMinus={handleMinus}
                  handlePlus={handlePlus}
                  handleCart={handleCart}
                />
                <Divider />
                <Typography variant='caption'>
                  Category: {data.category.name}
                </Typography>
                <Box>
                  <Typography variant='body1' marginTop={1}>
                    Free shipping on orders over €50!
                  </Typography>

                  <Box display='flex' alignItems='center'>
                    <Checkbox disabled checked size='small' />
                    <Typography variant='body2'>
                      No-Risk Money Back Guarantee!
                    </Typography>
                  </Box>
                  <Box display='flex' alignItems='center'>
                    <Checkbox disabled checked size='small' />
                    <Typography variant='body2'>No Hassle Refunds</Typography>
                  </Box>
                  <Box display='flex' alignItems='center'>
                    <Checkbox disabled checked size='small' />
                    <Typography variant='body2'>Secure Payments</Typography>
                  </Box>
                </Box>
                <Box
                  component='fieldset'
                  textAlign='center'
                  sx={{ display: 'flex', borderRadius: '5px' }}
                  justifyContent='center'
                  alignItems='center'
                  marginTop={2}
                >
                  <legend>
                    <Typography
                      variant='body1'
                      color='grey.600'
                      fontWeight={600}
                    >
                      Guaranteed Safe Checkout
                    </Typography>
                  </legend>

                  <CardMedia
                    sx={{
                      height: 53,
                      width: 50,
                      margin: '0 8px',
                      borderRadius: '10px',
                    }}
                    image={visa}
                  />

                  <CardMedia
                    sx={{
                      height: 37,
                      width: 60,
                      margin: '0 8px',
                      borderRadius: '5px',
                    }}
                    image={master}
                  />
                  <CardMedia
                    sx={{
                      height: 37,
                      width: 60,
                      margin: '0 8px',
                      borderRadius: '5px',
                    }}
                    image={american}
                  />
                  <CardMedia
                    sx={{
                      height: 37,
                      width: 60,
                      margin: '0 8px',
                      borderRadius: '5px',
                    }}
                    image={discover}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
