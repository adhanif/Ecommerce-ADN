import { Button, styled } from '@mui/material';

export const SearchButton = styled(Button)({
  backgroundColor: 'black',
  padding: '7px',
  '&:hover': {
    backgroundColor: 'white',
    borderColor: '#CA8A04',
    boxShadow: 'none',
    border: '1px solid',
    color: 'black',
  },
});
