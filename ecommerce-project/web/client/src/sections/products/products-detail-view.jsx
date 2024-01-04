import { Box, Button, Container, Typography, styled as MUIStyled, Stack } from '@mui/material';
import { primary } from 'src/theme/palette';
import Iconify from 'src/components/iconify';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fNumber } from 'src/utils/format-number';
import { cartActionThunk } from 'src/redux/actions/cart-action';
import { Toastify } from 'src/utils/format-toast';
import QuantityInput from './product-input-stock';
import ProductRelative from './product-relative';
import ProductGallery from './product-gallery';

const defaultPaddingButtonAdd = '8px 22px';
const defaultPaddingButtonWeight = '6px 16px';

const InfoProduct = ({ title, detail }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      borderBottom="1px solid #0000001f"
      padding="14px 0"
    >
      <Typography
        variant="normal"
        fontSize={13}
        flex={1}
      >
        {title}
      </Typography>
      <Typography
        variant="normal"
        fontSize={13}
        flex={2}
      >
        {detail}
      </Typography>
    </Box>
  );
};

InfoProduct.propTypes = {
  title: PropTypes.string,
  detail: PropTypes.string,
};

export default function ProductDetailView({ productFilter }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { message, success, loading } = useSelector((x) => x.carts);
  const [gallery, setGallery] = useState(productFilter.avatar);
  useEffect(() => () => dispatch(cartActionThunk.cleanMessage()), []);

  useEffect(() => {
    if (!loading && message !== null) {
      Toastify(message, success);
      dispatch(cartActionThunk.cleanMessage());
    }
  }, [message, loading]);

  const handleAddProductToCart = () => {
    const param = {
      ...productFilter,
      quantity,
    };
    dispatch(cartActionThunk.addProductCart(param));
  };
  const renderPrice = (
    <Box
      display="flex"
      alignItems="center"
    >
      <ProductTitle
        $color={primary.colorPrice}
        $width={25}
      >
        Giá niêm yết
      </ProductTitle>
      <ProductTitle
        $color={primary.colorPrice}
        $width={75}
        $size={14}
      >
        <del>{`${fNumber(productFilter.price)} ₫`}</del>
      </ProductTitle>
    </Box>
  );

  const renderPriceSale = (
    <Box
      display="flex"
      alignItems="center"
    >
      <ProductTitle
        $color={primary.colorPrice}
        $width={25}
      >
        {productFilter.price_sale > 0 ? 'Giá khuyến mãi' : 'Giá bán lẻ'}
      </ProductTitle>
      <ProductTitle
        $color={primary.red}
        $width={75}
        $size={14}
      >
        <strong>
          {productFilter.price_sale > 0
            ? `${fNumber(productFilter.price_sale)} ₫`
            : `${fNumber(productFilter.price)} ₫`}
        </strong>
      </ProductTitle>
    </Box>
  );

  const renderConditionGoods = (
    <Box
      display="flex"
      alignItems="center"
      borderTop="1px solid #0000001f"
      py={1.3}
    >
      <ProductTitle
        $color={primary.colorPrice}
        $width={25}
      >
        Tình trạng
      </ProductTitle>
      <ProductTitle
        $color={primary.colorPrice}
        $width={75}
        $size={14}
      >
        <strong>{productFilter.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</strong>
      </ProductTitle>
    </Box>
  );

  const renderQuantity = (
    <Box
      display="flex"
      alignItems="center"
      py={1.2}
    >
      <ProductTitle
        $color={primary.colorPrice}
        $width={25}
      >
        Số lượng
      </ProductTitle>
      <QuantityInput setValue={setQuantity} />
    </Box>
  );

  const renderTransport = (
    <Box
      display="flex"
      alignItems="center"
      borderBottom="1px solid #0000001f"
      py={2.3}
    >
      <ProductTitle
        $color={primary.colorPrice}
        $width={25}
      >
        Vận chuyển
      </ProductTitle>
      <ProductTitle
        $color={primary.colorPrice}
        $width={75}
        $size={14}
      >
        <Typography
          variant="normal"
          fontSize={13}
        >
          Miễn phí giao hàng cho đơn từ 300.000đ. Giao hàng trong 2 giờ.
        </Typography>
      </ProductTitle>
    </Box>
  );

  const renderWeight = (
    <Box
      display="flex"
      alignItems="center"
      padding="20px 0 10px"
    >
      <ProductTitle
        $color={primary.colorPrice}
        $width={25}
      >
        Khối lượng
      </ProductTitle>
      <StyledButton padding={defaultPaddingButtonWeight}>{`${productFilter.weight}KG`}</StyledButton>
    </Box>
  );

  return (
    <Container sx={{ maxWidth: '1200px', position: 'relative', p: '0 !important' }}>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="flex-start"
        gap={3}
        mb={5}
      >
        <ProductImage>
          <ProductGallery
            thumbnails={productFilter.thumnails}
            avatar={productFilter.avatar}
            setGallery={setGallery}
          />
        </ProductImage>
        <ProductInfo>
          <Typography
            variant="normal"
            fontSize={22}
          >
            {productFilter.name}
          </Typography>

          <ProductPrice>
            {productFilter.price_sale > 0 && renderPrice}

            {renderPriceSale}

            {renderConditionGoods}
          </ProductPrice>

          <Box px="10px">
            {renderTransport}

            {renderWeight}

            {renderQuantity}
          </Box>

          <Box
            px="10px"
            pt="55px"
          >
            <StyledButton
              padding={defaultPaddingButtonAdd}
              onClick={handleAddProductToCart}
            >
              <Iconify icon="bx:cart-add" />
              <Typography
                variant="normal"
                fontSize={14}
              >
                THÊM VÀO GIỎ
              </Typography>
            </StyledButton>
          </Box>
        </ProductInfo>
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="flex-start"
      >
        <Box flex={1}>
          <Stack sx={{ backgroundColor: '#f6f6f6 !important', padding: '12px 20px' }}>
            <Typography
              variant="normal"
              fontSize={18}
              fontWeight="bold"
            >
              Mô tả
            </Typography>
          </Stack>
          <Stack sx={{ padding: '12px 20px' }}>
            <Box
              display="flex"
              flexDirection="column"
              gap={1}
            >
              <Typography
                variant="normal"
                fontSize={16}
                fontWeight="bold"
              >
                {productFilter.name}
              </Typography>
              <Typography
                variant="normal"
                fontSize={14}
                lineHeight="20px"
                textAlign="justify"
              >
                {productFilter.description}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              mt={2}
            >
              <Typography
                variant="normal"
                fontSize={16}
                fontWeight="bold"
              >
                Chi tiết sản phẩm
              </Typography>
              <Typography
                variant="normal"
                fontSize={14}
                lineHeight="20px"
                textAlign="justify"
              >
                <div dangerouslySetInnerHTML={{ __html: productFilter.detail }} />
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box flex={2}>
          <Stack sx={{ backgroundColor: '#f6f6f6 !important', padding: '12px 20px' }}>
            <Typography
              variant="normal"
              fontSize={18}
              fontWeight="bold"
            >
              Thông tin
            </Typography>
          </Stack>
          <Stack sx={{ padding: '12px 20px', display: 'flex', flexDirection: 'column' }}>
            <InfoProduct
              title="Xuất xứ"
              detail={productFilter.origin}
            />
            <InfoProduct
              title="Bảo quản"
              detail={productFilter.storage}
            />
            <InfoProduct
              title="Khối Lượng"
              detail={`${productFilter.weight}KG`}
            />
          </Stack>
        </Box>
      </Box>
      <ProductRelative product={productFilter} />
    </Container>
  );
}

ProductDetailView.propTypes = {
  productFilter: PropTypes.any,
};

const ProductImage = styled.div`
  flex: 1;
`;

const ProductInfo = styled.div`
  flex: 2;
  padding: 18px 0;
`;

const ProductPrice = styled.div`
  -webkit-box-align: center;
  align-items: center;
  flex-shrink: 0;
  padding: 10px;
  margin-top: 12px;
  background-image: url(/assets/images/products/bg-product.jpg);
  background-repeat: no-repeat;
  background-size: cover;
`;

const ProductTitle = styled.div`
  width: ${(props) => `${props.$width}%`};
  font-size: ${(props) => `${props.$size || 13}px`};
  font-weight: 400;
  color: ${(props) => props.$color};
  line-height: 2;
`;

const StyledButton = MUIStyled(Button)(({ theme, padding }) => ({
  backgroundColor: primary.red,
  display: 'flex',
  gap: 6,
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.background.paper,
  borderRadius: 2,
  padding: `${padding}`,
  '&:hover': {
    backgroundColor: primary.red,
  },
}));
