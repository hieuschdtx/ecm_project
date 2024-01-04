import { CardActions, CardContent, CardMedia, Chip, Tooltip, Typography } from '@mui/material';
import { primary } from 'src/theme/palette';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fNumber } from 'src/utils/format-number';
import { cartActionThunk } from 'src/redux/actions/cart-action';
import { useRouter } from 'src/routes/hooks';
import Iconify from '../iconify';
import { BACKEND_URL } from 'src/utils/axios-instance';

export default function ProductCard({ product }) {
  const [selected, setSelected] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { cart } = useSelector((x) => x.carts);

  const handleClickProduct = (alias) => {
    router.push(`/thong-tin-san-pham/${alias}`);
  };

  useEffect(() => {
    const selectedProduct = cart.find((item) => item.id === product.id);
    if (selectedProduct) setSelected(true);
  }, [cart]);

  const handleChooseProduct = (e) => {
    e.stopPropagation();
    const param = {
      ...product,
      quantity: 1,
    };
    dispatch(cartActionThunk.addProductCart(param));
  };

  return (
    <BoxShadowCardItem onClick={() => handleClickProduct(product.alias)}>
      <CardMedia
        sx={{ height: 145, width: 145, margin: '0 auto', mb: 0.5, position: 'relative' }}
        image={`${BACKEND_URL}images/products${product.avatar}`}
        title={product.name}
      >
        {product.discount > 0 ? (
          <Chip
            label={`${product.discount}%`}
            sx={{
              position: 'absolute',
              top: 20,
              left: -30,
              textAlign: 'center',
              backgroundColor: primary.red,
              color: 'white',
              fontSize: '12px',
            }}
            size="small"
          />
        ) : (
          ''
        )}
      </CardMedia>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          padding: '0 !important',
          mb: 0.3,
        }}
      >
        <Tooltip title={product.name}>
          <Typography
            variant="normal"
            fontSize="14px"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {product.name}
          </Typography>
        </Tooltip>
        <Typography
          variant="normal"
          fontSize="13px"
        >
          {`ĐVT: ${product.weight} KG`}
        </Typography>
      </CardContent>
      <CardContent sx={{ padding: '0 !important', display: 'flex', alignItems: 'center', gap: 2 }}>
        {product.price_sale > 0 ? (
          <>
            <Typography
              variant="normal"
              fontSize="13px"
              color={primary.red}
            >
              {`${fNumber(product.price_sale)} ₫`}
            </Typography>
            <Typography
              variant="normal"
              sx={{ color: primary.priceSale, fontSize: '13px', textDecoration: 'line-through' }}
            >
              {`${fNumber(product.price)} ₫`}
            </Typography>
          </>
        ) : (
          <Typography
            variant="normal"
            fontSize="13px"
            color={primary.red}
          >
            {`${fNumber(product.price)}đ`}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <StyleButton
          type="button"
          onClick={(e) => handleChooseProduct(e)}
        >
          {!selected ? (
            <>
              <Iconify
                icon="tdesign:cart-add"
                width={15}
              />
              <Typography
                variant="normal"
                fontSize={14}
              >
                Thêm vào giỏ
              </Typography>
            </>
          ) : (
            <Typography
              variant="normal"
              fontSize={14}
            >
              Đã chọn
            </Typography>
          )}
        </StyleButton>
      </CardActions>
    </BoxShadowCardItem>
  );
}

ProductCard.propTypes = {
  product: PropTypes.any,
};

const StyleButton = styled.button`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  font-size: 13px;
  border: 1px solid #e4222e;
  padding: 7px 0;
  background-color: transparent;
  color: #e4222e;
  cursor: pointer;
  font-family: inherit;
  &:hover {
    background-color: #e4222e;
    color: white;
  }
`;

const BoxShadowCardItem = styled.div`
  width: 100%;
  height: 100%;
`;
