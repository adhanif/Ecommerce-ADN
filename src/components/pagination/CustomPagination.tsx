import React from 'react';
import { Pagination, Grid, Typography } from '@mui/material';

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  startIndex: number;
  endIndex: number;
};

const CustomPagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  handlePageChange,
  startIndex,
  endIndex,
}) => {
  return (
    <Grid
      container
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      marginBottom='1rem'
    >
      <Grid item>
        <Typography variant='subtitle2'>
          {`Showing ${startIndex + 1} to ${endIndex} of ${totalItems} results`}
        </Typography>
      </Grid>
      <Grid item>
        <Pagination
          count={Math.ceil(totalItems / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant='outlined'
          shape='rounded'
        />
      </Grid>
    </Grid>
  );
};

export default CustomPagination;
