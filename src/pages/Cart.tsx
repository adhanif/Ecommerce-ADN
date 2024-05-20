import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import IconButton from '@mui/material/IconButton';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { AppState, useAppDispatch } from '../redux/store';
import {
  decreseQuantity,
  emptyCart,
  increseQuantity,
  removeFromCart,
} from '../redux/slices/cartSlice';
import {
  QuantityGroupButton,
  StandardButton,
  SquareButton,
} from '../components/customStyling/buttons';
import { setNotification } from '../redux/slices/notificationSlice';
import { Link } from 'react-router-dom';
import { StyledLink, StyledTableCell } from '../components/customStyling/table';
import { convertBinaryToDataUrl } from '../components/utils/products';
import { useCreateOrderMutation } from '../redux/orderQuery';
import { Order } from '../misc/types';

interface Address {
  street: string;
  city: string;
  // state: string;
  zip: string;
  country: string;
}

export default function Cart() {
  const initialAddress: Address = {
    street: '',
    city: '',
    zip: '',
    country: '',
  };

  const cartData = useSelector((state: AppState) => state.cart.products);
  const token = useSelector((state: AppState) => state.user.token);
  const dispatch = useAppDispatch();
  const [createOrder] = useCreateOrderMutation();
  const [address, setAddress] = useState<Address>(initialAddress);
  const [editable, setEditable] = useState<boolean>(false);

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

  const total = cartData.reduce((total, curr) => {
    return curr.price * curr.quantity + total;
  }, 0);

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increseQuantity(id));
    dispatch(
      setNotification({
        open: true,
        message: 'Item has been increased',
        severity: 'success',
      }),
    );
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreseQuantity(id));
    dispatch(
      setNotification({
        open: true,
        message: 'Item has been decreased',
        severity: 'success',
      }),
    );
  };

  const handleDelete = (id: string) => {
    dispatch(removeFromCart(id));
    dispatch(
      setNotification({
        open: true,
        message: 'Item has been deleted',
        severity: 'error',
      }),
    );
  };

  const formatAddress = (address: Address): string => {
    return `${address.street}, ${address.city}, ${address.zip}, ${address.country}`;
  };

  const handleCheckOut = async () => {
    if (token) {
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
        dispatch(
          setNotification({
            open: true,
            message: 'Your order was successfull',
            severity: 'success',
          }),
        );
        dispatch(emptyCart());
        setAddress(initialAddress);
        // Optionally, reset cart state or navigate to a success page
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
    } else {
      dispatch(
        setNotification({
          open: true,
          message: 'Please login First before checkout!',
          severity: 'error',
        }),
      );
    }
  };

  return (
    <>
      <Box marginBottom='15rem'>
        <Container>
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

            <Typography variant='body2' color='grey.600'>
              {'  '}/{'  '}
              Cart
            </Typography>
          </Box>
          <Box marginTop='2rem'>
            <Typography component='h2' variant='h4' fontWeight='700'>
              Cart
            </Typography>
            <Divider />
          </Box>
          <Grid container marginTop='2rem' spacing={5}>
            <Grid item xs={12} sm={12} md={9}>
              <Grid item xs={12} sm={12} md={12}>
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
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartData !== null && cartData.length > 0 ? (
                        cartData &&
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
                                  }}
                                  fontWeight={700}
                                >
                                  {item.title}
                                </Typography>
                              </StyledLink>
                            </TableCell>
                            <TableCell
                              sx={{ width: '7px', padding: '2px' }}
                              align='center'
                            >{`€${item.price}`}</TableCell>
                            <TableCell
                              sx={{ width: '3px', padding: '2px' }}
                              align='center'
                            >
                              <Box marginTop={1} marginBottom={1}>
                                <QuantityGroupButton
                                  size='medium'
                                  aria-label='Basic button group'
                                >
                                  <SquareButton
                                    onClick={() =>
                                      handleDecreaseQuantity(item.id)
                                    }
                                  >
                                    -
                                  </SquareButton>
                                  <SquareButton>{item.quantity}</SquareButton>
                                  <SquareButton
                                    onClick={() =>
                                      handleIncreaseQuantity(item.id)
                                    }
                                  >
                                    +
                                  </SquareButton>
                                </QuantityGroupButton>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{ width: '2px', padding: '0px' }}
                              align='center'
                            >
                              {`€${
                                item.quantity && item.price * item.quantity
                              }`}
                            </TableCell>
                            <TableCell
                              sx={{ width: '2px', padding: '0px' }}
                              align='center'
                            >
                              <IconButton
                                type='button'
                                size='large'
                                aria-label='show 17 new notifications'
                                color='inherit'
                                onClick={() => handleDelete(item.id)}
                              >
                                <RemoveShoppingCartIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            sx={{ padding: '5px' }}
                            colSpan={6}
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
              <Grid item xs={12} sm={12} md={12} marginTop='2rem'>
                <Card>
                  <CardContent>
                    <Grid container spacing={2} alignItems='center'>
                      <Grid item>
                        <Typography gutterBottom variant='h6' component='div'>
                          Shipping Address
                        </Typography>
                      </Grid>
                      <Grid item>
                        {!editable ? (
                          <IconButton
                            // edge='end'
                            aria-label='edit'
                            onClick={handleEditToggle}
                            color='inherit'
                          >
                            <BorderColorIcon />
                          </IconButton>
                        ) : (
                          <IconButton
                            edge='end'
                            aria-label='save'
                            onClick={handleSave}
                            color='inherit'
                          >
                            <SaveIcon />
                          </IconButton>
                        )}
                      </Grid>
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
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        sx={{ padding: '5px' }}
                        align='center'
                        colSpan={2}
                      >
                        Cart Total
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align='center'>Subtotal</TableCell>
                      <TableCell align='center'> €{total}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align='center'>Order Total:</TableCell>
                      <TableCell align='center'> €{total}</TableCell>
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
                            onClick={handleCheckOut}
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
        </Container>
      </Box>
    </>
  );
}
