import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SaveIcon from '@mui/icons-material/Save';

import { StyledLink, StyledTableCell } from '../customStyling/table';
import { AppState, useAppDispatch } from '../../redux/store';
import { convertBinaryToDataUrl } from '../utils/products';
import { StandardButton } from '../customStyling/buttons';
import { Order } from '../../misc/types';
import { setNotification } from '../../redux/slices/notificationSlice';
import { useCreateOrderMutation } from '../../redux/orderQuery';
import { emptyCart } from '../../redux/slices/cartSlice';

interface Address {
  street: string;
  city: string;
  zip: string;
  country: string;
}

const CheckOutOrder = () => {
  const initialAddress: Address = {
    street: '',
    city: '',
    zip: '',
    country: '',
  };

  const cartData = useSelector((state: AppState) => state.cart.products);
  const [address, setAddress] = useState<Address>(initialAddress);
  const [editable, setEditable] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();

  const total = cartData.reduce((total, curr) => {
    return curr.price * curr.quantity + total;
  }, 0);

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  const handleSave = () => {
    setEditable(false); // Exit edit mode after saving
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const formatAddress = (address: Address): string => {
    const { street, city, zip, country } = address;
    let formattedAddress = '';

    if (street) formattedAddress += street;
    if (city) formattedAddress += formattedAddress ? `, ${city}` : city;
    if (zip) formattedAddress += formattedAddress ? `, ${zip}` : zip;
    if (country)
      formattedAddress += formattedAddress ? `, ${country}` : country;

    return formattedAddress || 'No address provided';
  };

  const handleOrder = async () => {
    if (!address.street || !address.city || !address.zip || !address.country) {
      dispatch(
        setNotification({
          open: true,
          message: 'Please provide the correct address',
          severity: 'success',
        }),
      );
      return;
    }

    const orderData: Order = {
      Total: total,
      Address: formatAddress(address),
      OrderProducts: cartData.map((item) => ({
        ProductId: item.id,
        Quantity: item.quantity,
      })),
    };

    try {
      const res = await createOrder(orderData);
      if ('data' in res && 'orderProducts' in res.data) {
        dispatch(
          setNotification({
            open: true,
            message: 'Your order was successfull',
            severity: 'success',
          }),
        );
        dispatch(emptyCart());
        setAddress(initialAddress);
        setEditable(false);
        navigate('/products');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      dispatch(
        setNotification({
          open: true,
          message: 'Failed to place order',
          severity: 'error',
        }),
      );
    }
  };

  const shippingAddressContent = () => {
    if (!editable) {
      return (
        <Typography variant='body1' gutterBottom>
          {formatAddress(address)}
        </Typography>
      );
    } else {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size='small'
              fullWidth
              id='street'
              name='street'
              label='Street Address'
              value={address.street}
              onChange={handleChange}
              disabled={!editable}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='city'
              name='city'
              label='City'
              size='small'
              value={address.city}
              onChange={handleChange}
              disabled={!editable}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='zip'
              name='zip'
              label='ZIP Code'
              size='small'
              value={address.zip}
              onChange={handleChange}
              disabled={!editable}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='country'
              name='country'
              label='Country'
              size='small'
              value={address.country}
              onChange={handleChange}
              disabled={!editable}
              required
            />
          </Grid>
        </Grid>
      );
    }
  };
  return (
    <>
      <Box marginBottom='15rem'>
        <Container>
          <Grid item xs={12} sm={12} md={12}>
            <Box display='flex' marginTop='2rem'>
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

              <Link to='/cart' style={{ textDecoration: 'none' }}>
                <Typography variant='body2' color='grey.600'>
                  {'  '}/{'  '}
                  Cart
                </Typography>
              </Link>
              <Typography variant='body2' color='grey.600'>
                {'  '}/{'  '}
                Checkout
              </Typography>
            </Box>
            <Grid item marginTop='2rem'>
              <Grid>
                <Card>
                  <CardContent>
                    <Grid container spacing={2} alignItems='center'>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          gutterBottom
                          variant='h6'
                          component='div'
                          fontWeight={1000}
                        >
                          Shipping Address
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} style={{ textAlign: 'end' }}>
                        {!editable ? (
                          <IconButton
                            aria-label='edit'
                            onClick={handleEditToggle}
                            color='inherit'
                          >
                            <BorderColorIcon />
                          </IconButton>
                        ) : (
                          <IconButton
                            aria-label='save'
                            onClick={handleSave}
                            color='inherit'
                          >
                            <SaveIcon />
                          </IconButton>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        {shippingAddressContent()}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item marginTop='2rem'>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell
                          sx={{ padding: '5px' }}
                        ></StyledTableCell>
                        <StyledTableCell sx={{ padding: '5px' }} align='left'>
                          Product
                        </StyledTableCell>
                        <StyledTableCell sx={{ padding: '5px' }} align='center'>
                          Price
                        </StyledTableCell>
                        <StyledTableCell sx={{ padding: '5px' }} align='center'>
                          Quantity
                        </StyledTableCell>
                        <StyledTableCell sx={{ padding: '5px' }} align='center'>
                          Subtotal
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartData !== null && cartData.length > 0 ? (
                        cartData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell
                              sx={{ width: '3px', padding: '8px' }}
                              align='center'
                            >
                              <img
                                src={convertBinaryToDataUrl(
                                  item.images[0].data,
                                )}
                                alt={item.title}
                                width='40'
                                height='40'
                                style={{ borderRadius: '50%' }}
                              />
                            </TableCell>
                            <TableCell
                              sx={{ width: '5px', padding: '2px' }}
                              align='left'
                            >
                              <StyledLink to={`/products/${item.id}`}>
                                <Typography
                                  variant='subtitle2'
                                  noWrap
                                  color='text.primary'
                                  sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 700,
                                  }}
                                >
                                  {item.title}
                                </Typography>
                              </StyledLink>
                            </TableCell>
                            <TableCell
                              sx={{ width: '7px', padding: '2px' }}
                              align='center'
                            >
                              {`€${item.price}`}
                            </TableCell>
                            <TableCell
                              sx={{ width: '3px', padding: '2px' }}
                              align='center'
                            >
                              <Typography>x{item.quantity}</Typography>
                            </TableCell>
                            <TableCell
                              sx={{ width: '2px', padding: '0px' }}
                              align='center'
                            >
                              {`€${
                                item.quantity && item.price * item.quantity
                              }`}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            sx={{ padding: '5px' }}
                            colSpan={5}
                            align='center'
                          >
                            There is no item in the cart
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid marginTop='2rem'>
                <TableContainer component={Paper}>
                  <Table>
                    {/* <TableHead>
                      <TableRow>
                        <StyledTableCell
                          sx={{ padding: '5px' }}
                          align='center'
                          colSpan={2}
                        >
                          Cart Total
                        </StyledTableCell>
                      </TableRow>
                    </TableHead> */}
                    <TableBody>
                      <TableRow>
                        <TableCell align='center'>Subtotal</TableCell>

                        <TableCell align='center'> €{total}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align='center'>Postage & Packing </TableCell>
                        <TableCell align='center'>€10</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          align='center'
                          sx={{
                            color: '#b12704',
                            fontSize: '14px',
                            fontWeight: '700',
                          }}
                        >
                          Order Total:
                        </TableCell>
                        <TableCell
                          align='center'
                          sx={{
                            color: '#b12704',
                            fontSize: '14px',
                            fontWeight: '700',
                          }}
                        >
                          {' '}
                          €{total + 10}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align='center' colSpan={2}>
                          <Grid
                            container
                            item
                            xs={12}
                            display='flex'
                            justifyContent='center'
                          >
                            <StandardButton
                              variant='contained'
                              fullWidth
                              onClick={handleOrder}
                            >
                              Order Now
                            </StandardButton>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CheckOutOrder;
