import React, { useCallback, useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  TableCell,
  IconButton,
  Typography,
  Grid,
  Modal,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import {
  StyledLink,
  StyledTableCell,
  StyledTableRow,
} from '../customStyling/table';
import {
  useDeleteProductMutation,
  useFetchAllProductsQuery,
} from '../../redux/productsQuery';
import { Product } from '../../misc/types';
import { setNotification } from '../../redux/slices/notificationSlice';
import { useAppDispatch } from '../hooks/useDispatchApp';
import ProductEditForm from '../product/ProductEditForm';
import { convertBinaryToDataUrl } from '../utils/products';
import Loading from '../loading/Loading';
import CustomPagination from '../pagination/CustomPagination';

export default function AdminProductTable() {
  const { data: allProducts, isLoading } = useFetchAllProductsQuery();
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [deleteProduct] = useDeleteProductMutation();
  const dispatch = useAppDispatch();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = Math.min(
    startIndex + itemsPerPage,
    allProducts?.length ?? 0,
  );
  const slicedData = allProducts?.slice(startIndex, endIndex);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage],
  );

  const handleDelete = async (item: Product) => {
    const res = await deleteProduct(item.id);
    if ('data' in res) {
      dispatch(
        setNotification({
          open: true,
          message: `Product has been deleted!`,
          severity: 'success',
        }),
      );
    }
  };

  //for Edit
  const handleEdit = useCallback(
    (item: Product) => {
      setSelectedItem(item);
    },
    [setSelectedItem],
  );

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <CustomPagination
        totalItems={allProducts?.length ?? 0}
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
              <StyledTableCell>TITLE</StyledTableCell>
              <StyledTableCell align='left'>CATEGORY</StyledTableCell>
              <StyledTableCell align='left'>PRICE</StyledTableCell>
              <StyledTableCell align='left'>STOCK</StyledTableCell>
              <StyledTableCell align='center'></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData ? (
              slicedData.map((item: Product) => (
                <StyledTableRow key={item.id}>
                  <TableCell align='left'>
                    <Grid display='flex' alignItems='center'>
                      <img
                        src={convertBinaryToDataUrl(item.images[0].data)}
                        alt={item.title}
                        width='40'
                        height='40'
                        style={{ borderRadius: '50%', marginRight: '1rem' }}
                      />

                      <StyledLink to={`/products/${item.id}`}>
                        <Typography
                          variant='subtitle2'
                          noWrap
                          sx={{
                            fontSize: '0.875rem',
                          }}
                          fontWeight={700}
                          color='text.primary'
                        >
                          {item.title}
                        </Typography>
                      </StyledLink>
                    </Grid>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography variant='subtitle2'>
                      {item.category.name}
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>{`€${item.price}`}</TableCell>
                  <TableCell align='left'>{item.inventory}</TableCell>
                  <TableCell align='right'>
                    <IconButton
                      type='button'
                      size='large'
                      aria-label='show 17 new notifications'
                      color='inherit'
                      onClick={() => handleEdit(item)}
                    >
                      <BorderColorIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton
                      type='button'
                      size='large'
                      aria-label='show 17 new notifications'
                      color='inherit'
                      onClick={() => handleDelete(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell sx={{ padding: '5px' }} colSpan={6} align='center'>
                  There is no item in the cart
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <Modal open={Boolean(selectedItem)} onClose={handleCloseModal}>
            <Stack
              display='flex'
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            >
              {selectedItem && (
                <>
                  <ProductEditForm
                    handleCloseModal={handleCloseModal}
                    item={selectedItem}
                  />
                </>
              )}
            </Stack>
          </Modal>
        </Table>
      </TableContainer>
    </>
  );
}
