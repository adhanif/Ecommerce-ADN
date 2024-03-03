import { Button, ButtonGroup, styled } from '@mui/material';

export const SearchButton = styled(Button)({
  backgroundColor: 'background.default',
  color: 'text.primary',
  padding: '8px',
  '&:hover': {
    backgroundColor: 'white',
    borderColor: '#CA8A04',
    boxShadow: 'none',
    border: '1px solid',
    color: 'black',
  },
});

export const QuantityGroupButton = styled(ButtonGroup)({
  borderColor: 'black',
});

export const ArrowGroupButton = styled(ButtonGroup)({
  borderColor: '#e0e0e0',
});

export const SquareButton = styled(Button)({
  // borderColor: '#e0e0e0',
  backgroundColor: 'background.default',
  color: 'inherit',
  // border: '1px solid #e0e0e0',
  borderColor: 'black',

  ':hover': {
    borderColor: 'black',
    backgroundColor: 'white',
    color: 'black',
  },
});
