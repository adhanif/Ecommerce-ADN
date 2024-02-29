import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import IconButton from '@mui/material/IconButton';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { AppState, useAppDispatch } from '../../redux/store';
import {
  deccreseQuantity,
  increseQuantity,
  removeFromCart,
} from '../../redux/slices/cartSlice';
import { styled } from '@mui/material/styles';
import {
  QuantityGroupButton,
  SearchButton,
  SquareButton,
} from '../customStyling/buttons';
import { setNotification } from '../../redux/slices/notificationSlice';
import { Link } from 'react-router-dom';
import { StyledTableCell } from '../customStyling/table';

export default function Cart() {
  const cartData = useSelector((state: AppState) => state.cart.products);
  const token = useSelector((state: AppState) => state.user.token);

  const dispatch = useAppDispatch();

  const total = cartData.reduce((total, curr) => {
    return curr.price * curr.quantity + total;
  }, 0);

  const handlePlus = (id: number) => {
    dispatch(increseQuantity(id));
    dispatch(
      setNotification({
        open: true,
        message: 'Item has been increased',
        severity: 'success',
      }),
    );
  };

  const handleMinus = (id: number) => {
    dispatch(deccreseQuantity(id));
    dispatch(
      setNotification({
        open: true,
        message: 'Item has been decreased',
        severity: 'success',
      }),
    );
  };

  const handleDelete = (id: number) => {
    dispatch(removeFromCart(id));
    dispatch(
      setNotification({
        open: true,
        message: 'Item has been deleted',
        severity: 'error',
      }),
    );
  };

  const handleCheckOut = () => {
    if (token) {
      dispatch(
        setNotification({
          open: true,
          message: 'Please pay the payment!',
          severity: 'success',
        }),
      );
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
          <Typography
            component='h2'
            variant='h4'
            // textAlign='center'
            fontWeight='700'
          >
            Cart
          </Typography>
          <Divider />
        </Box>
        <Grid container marginTop='2rem' spacing={5}>
          <Grid item xs={12} sm={12} md={9}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ padding: '5px' }}></StyledTableCell>
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
                            src={item.images[0]}
                            alt={item.title}
                            width='40'
                            height='40'
                            style={{ borderRadius: '50%' }}
                          />
                        </TableCell>
                        <TableCell
                          sx={{ width: '5px', padding: '2px' }}
                          align='center'
                        >
                          <Typography
                            variant='subtitle2'
                            noWrap
                            sx={{ maxWidth: '50px' }}
                          >
                            {item.title}
                          </Typography>
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
                                onClick={() => handleMinus(item.id)}
                              >
                                -
                              </SquareButton>
                              <Button disabled sx={{ color: 'black' }}>
                                {item.quantity}
                              </Button>
                              <SquareButton onClick={() => handlePlus(item.id)}>
                                +
                              </SquareButton>
                            </QuantityGroupButton>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{ width: '2px', padding: '0px' }}
                          align='center'
                        >
                          {`€${item.quantity && item.price * item.quantity}`}
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
                    <TableCell align='center'>Total</TableCell>
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
                        <SearchButton
                          variant='contained'
                          fullWidth
                          onClick={handleCheckOut}
                        >
                          Checkout
                        </SearchButton>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
