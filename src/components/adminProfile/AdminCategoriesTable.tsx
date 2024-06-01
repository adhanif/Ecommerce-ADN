import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
  Modal,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { StyledTableCell, StyledTableRow } from '../customStyling/table';

import {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
} from '../../redux/categoryQuery';
import Loading from '../loading/Loading';
import { CategoryResponse } from '../../misc/types';
import AdminCategoryEditForm from './AdminCategoryEditForm';
import { setNotification } from '../../redux/slices/notificationSlice';
import { useAppDispatch } from '../hooks/useDispatchApp';

const AdminCategoriesTable = () => {
  const { data: allCategories, isLoading } = useGetAllCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [selectedItem, setSelectedItem] = useState<CategoryResponse | null>(
    null,
  );
  const dispatch = useAppDispatch();

  // if (allCategories) {
  //   console.log(allCategories);
  // }

  const handleEditCategory = (item: CategoryResponse) => {
    setSelectedItem(item);
  };

  const handleDeleteCategory = async (item: CategoryResponse) => {
    try {
      const response = await deleteCategory(item.id);
      if (response) {
        dispatch(
          setNotification({
            open: true,
            message: `Category ${item.name} has been deleted!`,
            severity: 'success',
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>CATEGORY</StyledTableCell>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align='right'>ACTIONS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allCategories &&
              allCategories.map((item) => (
                <StyledTableRow key={item.id}>
                  <TableCell component='th' scope='row'>
                    <Grid display='flex' alignItems='center'>
                      <img
                        src={item.image}
                        alt={item.name}
                        width='40'
                        height='40'
                        style={{ borderRadius: '50%', marginRight: '1rem' }}
                      />
                      <Typography
                        variant='subtitle2'
                        noWrap
                        sx={{ fontSize: '0.875rem' }}
                        fontWeight={700}
                        color='text.primary'
                      >
                        {item.name}
                      </Typography>
                    </Grid>
                  </TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell align='right'>
                    <IconButton
                      aria-label='edit'
                      color='inherit'
                      onClick={() => handleEditCategory(item)}
                    >
                      <BorderColorIcon />
                    </IconButton>
                    <IconButton
                      aria-label='delete'
                      color='inherit'
                      onClick={() => handleDeleteCategory(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for editing category */}
      <Modal open={Boolean(selectedItem)} onClose={handleCloseModal}>
        <Stack
          display='flex'
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
        >
          {selectedItem && (
            <AdminCategoryEditForm
              handleCloseModal={handleCloseModal}
              item={selectedItem}
            />
          )}
        </Stack>
      </Modal>
    </>
  );
};

export default AdminCategoriesTable;
