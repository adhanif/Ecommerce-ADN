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
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { StyledLink, StyledTableCell } from '../customStyling/table';
import { AppState } from '../../redux/store';
import { convertBinaryToDataUrl } from '../utils/products';
import { QuantityGroupButton, SquareButton } from '../customStyling/buttons';

const CheckOutOrder = () => {
  const cartData = useSelector((state: AppState) => state.cart.products);

  return (
    <>
      <Grid item xs={12} sm={12} md={12}>
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
                        src={convertBinaryToDataUrl(item.images[0].data)}
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
                            // onClick={() => handleDecreaseQuantity(item.id)}
                          >
                            -
                          </SquareButton>
                          <SquareButton>{item.quantity}</SquareButton>
                          <SquareButton
                            // onClick={() => handleIncreaseQuantity(item.id)}
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
                        // onClick={() => handleDelete(item.id)}
                      >
                        <RemoveShoppingCartIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell sx={{ padding: '5px' }} colSpan={6} align='center'>
                    There is no item in the cart
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default CheckOutOrder;
