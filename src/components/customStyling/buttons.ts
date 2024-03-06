import { Button, ButtonGroup, styled } from '@mui/material';

export const StandardButton = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  padding: '7px',
  '&:hover': {
    backgroundColor: 'white',
    borderColor: 'black',
    boxShadow: 'none',
    border: '0.1px solid',
    color: 'black',
  },
});

export const QuantityGroupButton = styled(ButtonGroup)({
  borderColor: 'black',
});

export const ArrowGroupButton = styled(ButtonGroup)({
  borderColor: 'black',
  // backgroundColor: 'background.default',
});

export const SquareButton = styled(Button)({
  // backgroundColor: 'black',
  backgroundColor: 'black',
  color: 'white',
  borderColor: 'white',
  ':hover': {
    backgroundColor: 'white',
    borderColor: 'black',
    boxShadow: 'none',
    border: '0.1px solid',
    color: 'black',
  },
});
