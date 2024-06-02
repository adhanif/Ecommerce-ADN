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
  Grid,
  Pagination,
  Modal,
  Stack,
} from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Delete,
} from '@mui/icons-material';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { StyledTableCell } from '../customStyling/table';
import {
  useDeleteOrderMutation,
  useFetchAllOrdersQuery,
} from '../../redux/orderQuery';
import Loading from '../loading/Loading';
import { useAppDispatch } from '../hooks/useDispatchApp';
import { setNotification } from '../../redux/slices/notificationSlice';
import { OrderResponse } from '../../misc/types';
import CustomPagination from '../pagination/CustomPagination';
import AdminOrderStatusEditForm from './AdminOrderStatusEditForm';

const AdminOrdersTable: React.FC = () => {
  const [openOrderIds, setOpenOrderIds] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<OrderResponse | null>(null);

  const { data: allOrders, isLoading } = useFetchAllOrdersQuery();
  const [deleteOrder, { isLoading: deleteIsLoading }] =
    useDeleteOrderMutation();
 

  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = Math.min(startIndex + itemsPerPage, allOrders?.length ?? 0);
  const slicedData = allOrders?.slice(startIndex, endIndex);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  const handleToggle = (orderId: string) => {
    setOpenOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  };

  const handleDelete = async (orderId: string) => {
    const res = await deleteOrder(orderId);
    if ('data' in res) {
      dispatch(
        setNotification({
          open: true,
          message: `Order has been deleted!`,
          severity: 'success',
        }),
      );
    }
  };

  const handleEditOrder = (order: OrderResponse) => {
    setSelectedItem(order);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  if (isLoading || deleteIsLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <CustomPagination
        totalItems={allOrders?.length ?? 0}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        startIndex={startIndex}
        endIndex={endIndex}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell />
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell align='left'>ADDRESS</StyledTableCell>
              <StyledTableCell align='center'>ORDER PLACED</StyledTableCell>
              <StyledTableCell align='center'>STATUS</StyledTableCell>
              <StyledTableCell align='center'>TOTAL (€)</StyledTableCell>
              <StyledTableCell align='center'>ACTIONS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData &&
              slicedData.map((order) => (
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
                          <Avatar
                            sx={{ width: 32, height: 32, marginRight: 1 }}
                          >
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
                      {order.orderStatus}
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
                    <StyledTableCell align='right'>
                      <IconButton
                        aria-label='edit'
                        color='inherit'
                        onClick={() => handleEditOrder(order)}
                      >
                        <BorderColorIcon />
                      </IconButton>
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

      {/* Modal for editing status of order */}
      <Modal open={Boolean(selectedItem)} onClose={handleCloseModal}>
        <Stack
          display='flex'
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
        >
          {selectedItem && (
            <AdminOrderStatusEditForm
              handleCloseModal={handleCloseModal}
              item={selectedItem}
            />
          )}
        </Stack>
      </Modal>
    </>
  );
};

export default AdminOrdersTable;
