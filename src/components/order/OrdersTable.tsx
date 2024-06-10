import React, { useState } from 'react';
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
  TableCell,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { StyledTableCell } from '../customStyling/table';
import { OrderResponse } from '../../misc/types';

interface OrdersTableProps {
  orderData: OrderResponse[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orderData }) => {
  const [openOrderIds, setOpenOrderIds] = useState<string[]>([]);

  const handleToggle = (orderId: string) => {
    setOpenOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  };

  const formatOrderNumber = (id: string) => {
    return `Order-${id.substring(0, 4)}...${id.substring(id.length - 4)}`;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Order Number</StyledTableCell>
            <StyledTableCell align='left'>Address</StyledTableCell>
            <StyledTableCell align='center'>Order Placed</StyledTableCell>
            <StyledTableCell align='center'>STATUS</StyledTableCell>
            <StyledTableCell align='center'>Total (€)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData.map((order) => (
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
                  {formatOrderNumber(order.id)}
                </StyledTableCell>
                <StyledTableCell align='left'>{order.address}</StyledTableCell>
                <StyledTableCell align='center'>
                  {new Date(order.updatedDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align='left'>
                  {order.orderStatus}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {(
                    order.orderProducts.reduce(
                      (acc, product) => acc + product.price * product.quantity,
                      0,
                    ) / 100
                  ).toFixed(2)}
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

export default OrdersTable;
