import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { StyledTableCell } from '../customStyling/table';
import { OrderResponse } from '../../misc/types';

interface OrdersTableProps {
  orderData: OrderResponse[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orderData }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell align='left'>Price</StyledTableCell>
              <StyledTableCell align='center'>Quantity</StyledTableCell>
              <StyledTableCell align='left'>Total</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell align='center'>Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.map((order) =>
              order.orderProducts.map((product) => (
                <TableRow key={`${order.id}-${product.productId}`}>
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
                  <StyledTableCell>{order.address}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {new Date(order.updatedDate).toLocaleDateString()}
                  </StyledTableCell>
                </TableRow>
              )),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrdersTable;
