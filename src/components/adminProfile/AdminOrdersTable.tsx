import React, { useState, useEffect } from 'react';
import {
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Avatar,
  TableCell,
} from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Delete,
} from '@mui/icons-material';
import { StyledTableCell } from '../customStyling/table';
import { useFetchAllOrdersQuery } from '../../redux/orderQuery';


const AdminOrdersTable: React.FC = () => {
  const [openOrderIds, setOpenOrderIds] = useState<string[]>([]);
  const { data: allOrders } = useFetchAllOrdersQuery();

  const handleToggle = (orderId: string) => {
    setOpenOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  };

  const handleDelete = (orderId: string) => {
    
    console.log(`Delete order with ID: ${orderId}`);
    
  };



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Customer</StyledTableCell>
            <StyledTableCell align='left'>Address</StyledTableCell>
            <StyledTableCell align='center'>Order Placed</StyledTableCell>
            <StyledTableCell align='center'>Total (€)</StyledTableCell>
            <StyledTableCell align='center'>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders &&
            allOrders.map((order) => (
              <React.Fragment key={order.id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label='expand row'
                      size='small'
                      onClick={() => handleToggle(order.id)}
                    >
                      {openOrderIds.includes(order.id) ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <StyledTableCell component='th' scope='row'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {order.user.avatar ? (
                        <Avatar
                          sx={{ width: 32, height: 32, marginRight: 1 }}
                          alt={order.user.name}
                          src={order.user.avatar}
                        />
                      ) : (
                        <Avatar sx={{ width: 32, height: 32, marginRight: 1 }}>
                          {order.user.name.charAt(0).toUpperCase()}
                        </Avatar>
                      )}
                      {order.user.name}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {order.address}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {new Date(order.updatedDate).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {(
                      order.orderProducts.reduce(
                        (acc, product) =>
                          acc + product.price * product.quantity,
                        0,
                      ) / 100
                    ).toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <IconButton
                      aria-label='delete'
                      color='inherit'
                      onClick={() => handleDelete(order.id)}
                    >
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={openOrderIds.includes(order.id)}
                      timeout='auto'
                      unmountOnExit
                    >
                      <Box margin={1}>
                        <Typography variant='h6' gutterBottom component='div'>
                          Products
                        </Typography>
                        <Table size='small' aria-label='products'>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Product</StyledTableCell>
                              <StyledTableCell align='left'>
                                Price
                              </StyledTableCell>
                              <StyledTableCell align='center'>
                                Quantity
                              </StyledTableCell>
                              <StyledTableCell align='left'>
                                Total
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.orderProducts.map((product) => (
                              <TableRow key={product.productId}>
                                <StyledTableCell component='th' scope='row'>
                                  {product.title}
                                </StyledTableCell>
                                <StyledTableCell align='left'>
                                  {product.price / 100} €
                                </StyledTableCell>
                                <StyledTableCell align='center'>
                                  {product.quantity}
                                </StyledTableCell>
                                <StyledTableCell align='left'>
                                  {(product.price * product.quantity) / 100} €
                                </StyledTableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminOrdersTable;
