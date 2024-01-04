import { Box, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ProductCard } from 'src/components/card';
import { StyleCardItem, StyleCardProduct } from '../styled';

export default function ProductRelative({ product }) {
  const { products } = useSelector((x) => x.products);

  const productFilter = products
    .filter(
      (item) => item.product_category_id === product.product_category_id && item.id !== product.id
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  return (
    <Box mt={7}>
      <Stack sx={{ backgroundColor: '#f6f6f6 !important', padding: '12px 20px' }}>
        <Typography variant="normal" fontSize={18} fontWeight="bold">
          Sản phẩm liên quan
        </Typography>
      </Stack>
      <Box width="100%" py={2} px={1}>
        <StyleCardProduct $number={5}>
          {productFilter.map((item) =>
            item.status && item.home_flag ? (
              <StyleCardItem key={item.id}>
                <ProductCard product={item} />
              </StyleCardItem>
            ) : (
              ''
            )
          )}
        </StyleCardProduct>
      </Box>
    </Box>
  );
}

ProductRelative.propTypes = {
  product: PropTypes.any,
};
