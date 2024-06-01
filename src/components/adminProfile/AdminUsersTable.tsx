import React, { useCallback, useEffect, useState } from 'react';
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
  Pagination,
  Modal,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {
  AdminUsers,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '../../redux/userQuery';
import { StyledTableCell, StyledTableRow } from '../customStyling/table';
import UserEditForm from '../userProfile/UserEditForm';
import { useAppDispatch } from '../hooks/useDispatchApp';
import { setNotification } from '../../redux/slices/notificationSlice';
import Loading from '../loading/Loading';
import CustomPagination from '../pagination/CustomPagination';

export type UserAddress = {
  street: string;
  city: string;
  country: string;
  zipCode: string;
  phoneNumber: string;
  userId: string;
  user: null;
  id: string;
  createdDate: string;
  updatedDate: string;
};
export type User = {
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  addresses: UserAddress[];
  id: string;
  createdDate: string;
  updatedDate: string;
};

export default function AdminUsersTable() {
  const { data: allUsers, isLoading } = useGetAllUsersQuery();
  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const [deleteUser] = useDeleteUserMutation();
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, allUsers?.length ?? 0);
  const slicedData = allUsers?.slice(startIndex, endIndex);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage],
  );

  const handleDelete = async (item: string) => {
    const res = await deleteUser(item);
    if ('data' in res) {
      dispatch(
        setNotification({
          open: true,
          message: `User has been deleted!`,
          severity: 'success',
        }),
      );
    }
  };

  const handleEdit = (item: User) => {
    setSelectedItem(item);
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
      <CustomPagination
        totalItems={slicedData?.length ?? 0}
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
              <StyledTableCell>NAME</StyledTableCell>
              <StyledTableCell>EMAIL</StyledTableCell>
              <StyledTableCell>ROLE</StyledTableCell>
              <StyledTableCell>CREATED DATE</StyledTableCell>
              <StyledTableCell align='right'>ACTIONS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData ? (
              slicedData.map((item) => (
                <StyledTableRow key={item.id}>
                  <TableCell component='th' scope='row'>
                    <Grid display='flex' alignItems='center'>
                      <img
                        src={(item.avatar && item.avatar) || ''}
                        alt={item.name}
                        width='40'
                        height='40'
                        style={{ borderRadius: '50%', marginRight: '1rem' }}
                      />

                      <Typography
                        variant='subtitle2'
                        noWrap
                        sx={{
                          fontSize: '0.875rem',
                        }}
                        fontWeight={700}
                        color='text.primary'
                      >
                        {item.name}
                      </Typography>
                    </Grid>
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>{item.createdDate}</TableCell>
                  <TableCell align='right'>
                    <IconButton
                      aria-label='edit'
                      color='inherit'
                      onClick={() => handleEdit(item)}
                    >
                      <BorderColorIcon />
                    </IconButton>
                    <IconButton
                      aria-label='delete'
                      color='inherit'
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell sx={{ padding: '5px' }} colSpan={6} align='center'>
                  There is no user
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for editing user */}
      <Modal open={Boolean(selectedItem)} onClose={handleCloseModal}>
        <Stack
          display='flex'
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
        >
          {selectedItem && (
            <UserEditForm
              handleCloseModal={handleCloseModal}
              item={selectedItem}
            />
          )}
        </Stack>
      </Modal>
    </>
  );
}
