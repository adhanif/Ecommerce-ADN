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
  const [mainData, setMainData] = useState<User[]>([]);
  const { data: allUsers } = useGetAllUsersQuery();
  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const [deleteUser] = useDeleteUserMutation();
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, mainData.length);
  const slicedData = mainData.slice(startIndex, endIndex);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage],
  );

  const handleDelete = (item: AdminUsers) => {
    setMainData(mainData.filter((user) => user.id !== item.id));

    const res = deleteUser(item.id);
    dispatch(
      setNotification({
        open: true,
        message: `User has been deleted!`,
        severity: 'success',
      }),
    );
  };

  const handleEdit = (item: User) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    if (allUsers) {
      setMainData(allUsers);
    }
  }, [allUsers]);

  return (
    <>
      <Grid
        container
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        marginBottom='1rem'
       
      >
        <Grid item>
          <Typography variant='subtitle2'>{`Showing ${
            startIndex + 1
          } to ${endIndex} of ${mainData.length} results`}</Typography>
        </Grid>
        <Grid item>
          <Pagination
            count={Math.ceil(mainData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant='outlined'
            shape='rounded'
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Created Date</StyledTableCell>
              <StyledTableCell align='right'>Actions</StyledTableCell>
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
