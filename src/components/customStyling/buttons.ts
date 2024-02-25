import { Button, ButtonGroup, styled } from '@mui/material';

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

export const QuantityGroupButton = styled(ButtonGroup)({
  borderColor: '#e0e0e0',
});

export const ArrowGroupButton = styled(ButtonGroup)({
  borderColor: '#e0e0e0',
});

export const SquareButton = styled(Button)({
  borderColor: '#e0e0e0',
 
  color: 'black',
  ':hover': {
    borderColor: 'black',
    backgroundColor: 'black',
    color: 'white',
  },
});
