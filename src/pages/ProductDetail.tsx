import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  useFetchAllProductsQuery,
  useGetOneProductQuery,
} from '../redux/productsQuery';
import {
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
import visa from '../../src/components/images/visa.png';
import master from '../../src/components/images/master.png';
import discover from '../../src/components/images/discover.png';
import american from '../../src/components/images/american.png';

import Loading from '../components/loading/Loading';
import {
  ArrowGroupButton,
  SquareButton,
} from '../components/customStyling/buttons';
import { AppState, useAppDispatch } from '../redux/store';
import { addToCart } from '../redux/slices/cartSlice';
import QuantityControlButton from '../components/cart/QuantityControlButton';
import { setNotification } from '../redux/slices/notificationSlice';
import { convertBinaryToDataUrl } from '../components/utils/products';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [isId, setIsId] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const { data, isLoading } = useGetOneProductQuery(productId || '');
  const { data: allProducts } = useFetchAllProductsQuery();

  useEffect(() => {
    if (id) {
      setProductId(id);
    }
  }, [id]);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const currentIndex = allProducts.findIndex(
        (product) => product.id === isId,
      );
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % allProducts.length;
        setIsId(allProducts[nextIndex].id);
      }
    }
  }, [allProducts, isId]);

  const handleNext = () => {
    if (allProducts && allProducts.length > 0 && productId) {
      const currentIndex = allProducts.findIndex(
        (product) => product.id === productId,
      );
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % allProducts.length;
        setProductId(allProducts[nextIndex].id);
      }
    }
  };

  const handlePrevious = () => {
    if (allProducts && allProducts.length > 0 && productId) {
      const currentIndex = allProducts.findIndex(
        (product) => product.id === productId,
      );
      if (currentIndex !== -1) {
        const previousIndex =
          (currentIndex - 1 + allProducts.length) % allProducts.length;
        setProductId(allProducts[previousIndex].id);
      }
    }
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

  if (!id) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  // console.log(data);

  return (
    <>
      {data && data.images && data.category && (
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
                {data.images &&
                  data.images.map((image, index) => (
                    <ImageListItem
                      key={index}
                      cols={index === 0 ? 2 : 1}
                      rows={index === 0 ? 2 : 1}
                    >
                      <img
                        src={convertBinaryToDataUrl(image.data)}
                        style={{
                          cursor: 'pointer',
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        alt={data.title}
                        onClick={() => handleImageClick(image.data)}
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
                      src={convertBinaryToDataUrl(selectedImage)}
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
                  {data.title && data.title.toLocaleUpperCase()}
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
                <Typography
                  variant='body2'
                  color='grey.600'
                  mt={1}
                  sx={{
                    color: '#b12704',
                    fontSize: '14px',
                    fontWeight: '700',
                  }}
                >
                  Only {data.inventory} left in stock.
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
