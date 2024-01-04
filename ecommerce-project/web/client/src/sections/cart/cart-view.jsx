import { Box, Button, Container, IconButton, Stack, Typography, styled as MUIStyled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from 'src/components/iconify';
import { primary } from 'src/theme/palette';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fNumber } from 'src/utils/format-number';
import { useEffect, useState } from 'react';
import { cartActionThunk } from 'src/redux/actions/cart-action';
import QuantityInput from 'src/sections/products/product-input-stock';
import { useRouter } from 'src/routes/hooks';
import { BACKEND_URL } from 'src/utils/axios-instance';

const moneyDefault = 300000;
const transportFee = 30000;

const ItemProductCart = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);

  useEffect(() => {
    const param = {
      id: product.id,
      quantity,
    };
    dispatch(cartActionThunk.addQuantityProductCart(param));
  }, [dispatch, quantity]);

  const hanldeRemoveProduct = () => {
    const param = {
      id: product.id,
    };
    dispatch(cartActionThunk.removeProductToCart(param));
  };

  return (
    <ItemCart>
      <Stack
        direction="row"
        alignItems="center"
        gap={0.5}
      >
        <img
          alt={product.name}
          src={`${BACKEND_URL}images/products${product.avatar}`}
          width="60px"
        />
        <Box
          display="flex"
          flexDirection="column"
        >
          <Typography
            variant="normal"
            fontSize={13}
          >
            {product.name}
          </Typography>
          <Typography
            variant="normal"
            fontSize={12}
          >
            {`ĐVT: ${product.weight} KG`}
          </Typography>
        </Box>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        gap={4}
      >
        {product.price_sale > 0 ? (
          <>
            <Typography
              variant="normal"
              fontSize={13}
            >
              {`${fNumber(product.price_sale)} ₫`}
            </Typography>
            <Typography
              variant="normal"
              fontSize={13}
              color={primary.priceSale}
            >
              <del> {`${fNumber(product.price)} ₫`}</del>
            </Typography>
          </>
        ) : (
          <Typography
            variant="normal"
            fontSize={13}
          >
            {`${fNumber(product.price)} ₫`}
          </Typography>
        )}

        <QuantityInput
          setValue={setQuantity}
          quantitySel={quantity}
        />
        <IconButton onClick={hanldeRemoveProduct}>
          <Iconify
            icon="typcn:delete"
            width={24}
          />
        </IconButton>
      </Stack>
    </ItemCart>
  );
};

const InfoCart = ({ label, value }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
  >
    <Typography
      variant="normal"
      fontSize={13}
    >
      {label}
    </Typography>
    <Typography
      variant="normal"
      fontSize={13}
    >
      {`${fNumber(value)} `}
      <sup>₫</sup>
    </Typography>
  </Box>
);

export default function CartView() {
  const { cart, totalAmount } = useSelector((x) => x.carts);
  const priceOrigin = cart.reduce((acc, cur) => acc + cur.price, 0);
  const moneyTransport = totalAmount >= moneyDefault ? 0 : transportFee;
  const router = useRouter();

  const renderNoProductInCart = (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      gap={4}
    >
      <NoProductImage />
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        gap={1}
      >
        <Typography
          variant="normal"
          fontSize={14}
        >
          Giỏ hàng chưa có sản phẩm
        </Typography>
        <StyledButton
          padding="4px 16px"
          onClick={() => router.push('/')}
        >
          Quay lại trang chủ
        </StyledButton>
      </Box>
    </Stack>
  );

  return (
    <Container sx={{ maxWidth: '1200px', position: 'relative', padding: '20px 0 !important' }}>
      {cart.length <= 0 ? (
        renderNoProductInCart
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          gap={2}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            flex={2}
            width="100%"
          >
            {cart.map((item) => (
              <ItemProductCart
                product={item}
                key={item.id}
              />
            ))}
          </Box>
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Stack
              direction="column"
              justifyContent="flex-start"
              gap={1}
            >
              <InfoCart
                label="Tạm tính giỏ hàng:"
                value={totalAmount}
              />
              <InfoCart
                label="Tiết kiệm được:"
                value={totalAmount - priceOrigin}
              />
              <InfoCart
                label="Phí vận chuyển:"
                value={moneyTransport}
              />
              <InfoCart
                label="Thành tiền:"
                value={totalAmount + moneyTransport}
              />
              <Typography
                variant="normal"
                fontSize={13}
                fontStyle="italic"
              >
                (Giá đã bao gồm VAT)
              </Typography>
            </Stack>
            <StyledButton
              fullWidth
              onClick={() => router.push('/thanh-toan')}
            >
              <Typography
                variant="normal"
                fontSize={13}
                lineHeight={1.2}
              >
                THANH TOÁN
              </Typography>
              <Typography
                variant="normal"
                fontSize={13}
                lineHeight={1.2}
              >
                {`${fNumber(totalAmount)} ₫`}
              </Typography>
            </StyledButton>
          </Box>
        </Box>
      )}
    </Container>
  );
}

ItemProductCart.propTypes = {
  product: PropTypes.any,
};

InfoCart.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

const ItemCart = styled.div`
  font-size: 13px;
  font-weight: 400;
  padding: 8px 16px;
  border-bottom: 1px solid #f7f7f7;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
`;

const NoProductImage = styled.div`
  background-image: url(/assets/images/products/no-product-in-cart.png);
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-box-align: center;
  align-items: center;
  flex-shrink: 0;
  padding: 10px;
  width: 120px;
  height: 120px;
`;

const StyledButton = MUIStyled(Button)(({ theme, padding }) => ({
  backgroundColor: primary.red,
  display: 'flex',
  flexDirection: 'column',
  fontWeight: 500,
  fontSize: 13,
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.background.paper,
  borderRadius: 7,
  padding: `${padding}`,
  '&:hover': {
    backgroundColor: primary.red,
  },
}));
