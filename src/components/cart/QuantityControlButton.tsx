import React from 'react';
import { Box } from '@mui/material';

import { QuantityGroupButton, SquareButton } from '../customStyling/buttons';
import { QuantityControlButtonProps } from '../../misc/types';

const QuantityControlButton: React.FC<QuantityControlButtonProps> = ({
  count,
  handleMinus,
  handlePlus,
  handleCart,
}) => {
  return (
    <Box marginTop={2} marginBottom={3}>
      <QuantityGroupButton size='medium' aria-label='Basic button group'>
        <SquareButton onClick={handleMinus}>-</SquareButton>
        <SquareButton>{count}</SquareButton>
        <SquareButton onClick={handlePlus}>+</SquareButton>
      </QuantityGroupButton>
      <SquareButton
        variant='outlined'
        onClick={handleCart}
        sx={{ marginLeft: '1rem' }}
      >
        add to cart
      </SquareButton>
    </Box>
  );
};

export default QuantityControlButton;
