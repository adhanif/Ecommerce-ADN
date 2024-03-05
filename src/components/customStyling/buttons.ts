import { Button, ButtonGroup, styled } from '@mui/material';

export const SearchButton = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  padding: '8px',
  '&:hover': {
    backgroundColor: 'white',
    borderColor: '#CA8A04',
    boxShadow: 'none',
    border: '2px solid',
    color: 'black',
  },
});

export const QuantityGroupButton = styled(ButtonGroup)({
  borderColor: 'black',
});

export const ArrowGroupButton = styled(ButtonGroup)({
  borderColor: '#e0e0e0',
  // backgroundColor: 'background.default',
});

export const SquareButton = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  ':hover': {
    backgroundColor: 'white',
    borderColor: '#CA8A04',
    boxShadow: 'none',
    border: '2px solid',
    color: 'black',
  },
});
