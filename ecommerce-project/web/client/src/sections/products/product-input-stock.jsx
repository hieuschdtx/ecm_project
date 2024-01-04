import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function QuantityInput({ setValue, quantitySel = 1 }) {
  const [quantity, setQuantity] = useState(quantitySel);

  const handleRemoveQuantity = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };

  const handlePlusQuantity = () => {
    quantity < 100 && setQuantity(quantity + 1);
  };

  useEffect(() => {
    setValue(quantity);
  }, [quantity]);

  return (
    <Box display="flex" alignItems="center">
      <StyleButton onClick={handleRemoveQuantity}>
        <Iconify icon="material-symbols:remove" />
      </StyleButton>
      <InputQuantity
        type="number"
        min={1}
        max={99}
        value={quantity}
        readOnly
        onChange={(e) => setQuantity(e.target.value)}
      />
      <StyleButton onClick={handlePlusQuantity}>
        <Iconify icon="ic:baseline-plus" />
      </StyleButton>
    </Box>
  );
}

const InputQuantity = styled.input`
  font-size: 14px;
  width: 32px;
  margin: 0px;
  padding: 0px;
  min-width: 32px;
  border: 1px solid rgb(232, 232, 232);
  height: 32px;
  text-align: center;
`;

const StyleButton = styled.button`
  width: 32px;
  min-width: 32px;
  height: 32px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(232, 232, 232);
  border-radius: 2px;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

QuantityInput.propTypes = {
  setValue: PropTypes.any,
  quantitySel: PropTypes.number,
};
