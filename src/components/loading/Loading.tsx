import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box display='flex' justifyContent='center' height='100vh' marginTop='5rem'>
      {/* <CircularProgress color='secondary' /> */}
      <CircularProgress color='success' />
      {/* <CircularProgress color='inherit' /> */}
    </Box>
  );
}
