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
  Pagination,
  Modal,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

type User = {
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  addresses: any[]; // Adjust according to your actual structure
  id: string;
  createdDate: string;
  updatedDate: string;
};

// Mock user data
const usersData: User[] = [
  {
    name: 'Customer1',
    email: 'customer1@customer.com',
    avatar: 'https://picsum.photos/200/?random=1',
    role: 'Customer',
    addresses: [],
    id: '494f0f98-14b8-49eb-a944-54ddce3341b6',
    createdDate: '2024-05-17',
    updatedDate: '2024-05-17',
  },
  {
    name: 'Adnan',
    email: 'adnan@admin.com',
    avatar: 'https://picsum.photos/200/?random=2',
    role: 'Admin',
    addresses: [],
    id: '766249a0-5173-4685-95e3-805d5fc37319',
    createdDate: '2024-05-17',
    updatedDate: '2024-05-17',
  },
  {
    name: 'dani2',
    email: 'dani@gmail.com',
    avatar: 'https://picsum.photos/200/img.jpg',
    role: 'Customer',
    addresses: [],
    id: '81da7924-aa57-4f78-85b7-5a0b86cbc08b',
    createdDate: '2024-05-19',
    updatedDate: '2024-05-19',
  },
  {
    name: 'Yuanke',
    email: 'yuanke@admin.com',
    avatar: 'https://picsum.photos/200/?random=3',
    role: 'Admin',
    addresses: [],
    id: '991a2489-7e2a-4449-95c4-a7fbbbf33d0e',
    createdDate: '2024-05-17',
    updatedDate: '2024-05-17',
  },
  {
    name: 'Binh',
    email: 'binh@admin.com',
    avatar: 'https://picsum.photos/200/?random=4',
    role: 'Admin',
    addresses: [],
    id: 'aafb7154-e2fb-4236-bae0-01505a6e54ee',
    createdDate: '2024-05-17',
    updatedDate: '2024-05-17',
  },
  {
    name: 'dani1',
    email: 'dani1@example.com',
    avatar: null,
    role: 'Customer',
    addresses: [],
    id: 'ba87cce3-146b-499a-8249-85cac0b7c72a',
    createdDate: '2024-05-19',
    updatedDate: '2024-05-19',
  },
  {
    name: 'Admin1',
    email: 'john@example.com',
    avatar: 'https://picsum.photos/200/?random=5',
    role: 'Admin',
    addresses: [],
    id: 'fb6ded65-c273-4901-8acf-aec8f75f24d7',
    createdDate: '2024-05-17',
    updatedDate: '2024-05-17',
  },
];

export default function AllUsersTable() {
  const [mainData, setMainData] = useState(usersData);
  const [selectedItem, setSelectedItem] = useState<User | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = mainData.slice(startIndex, endIndex);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage],
  );

  const handleDelete = (item: User) => {
    // Implement your delete logic
    setMainData(mainData.filter((user) => user.id !== item.id));
  };

  const handleEdit = useCallback(
    (item: User) => {
      setSelectedItem(item);
    },
    [setSelectedItem],
  );

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell component='th' scope='row'>
                  {item.name}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell align='right'>
                  <IconButton
                    aria-label='edit'
                    onClick={() => handleEdit(item)}
                  >
                    <BorderColorIcon />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleDelete(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
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
            <div>
              {/* Replace with your edit form */}
              <Typography variant='h6'>Edit User</Typography>
              <Typography>{`Name: ${selectedItem.name}`}</Typography>
              <Typography>{`Email: ${selectedItem.email}`}</Typography>
              {/* Add more fields for editing */}
              <button onClick={handleCloseModal}>Close Modal</button>
            </div>
          )}
        </Stack>
      </Modal>
    </>
  );
}
