import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { productAsyncThunk } from 'src/redux/actions/product-action';
import { Box } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductCard } from 'src/components/card';
import { StyleCardItem, StyleCardProduct } from '../styled';

export default function HomeContainerCard({ productCa }) {
  const dispatch = useDispatch();
  const { productCategories } = useSelector((x) => x.productCategories);
  const { products } = useSelector((x) => x.products);

  useEffect(() => {
    dispatch(productAsyncThunk.getProductByProductCategory());
  }, [dispatch]);

  const productFilter = useMemo(
    () => products.filter((item) => item.product_category_id === productCa),
    [productCa, products],
  );

  const productCategoryFilter = useMemo(
    () => productCategories.find((item) => item.id === productCa),
    [productCa, productCategories],
  );

  return (
    <Box mb={3}>
      <TitleCard to={`san-pham/${productCategoryFilter.alias}`}>{productCategoryFilter.name}</TitleCard>
      <Box
        gap={1}
        display="flex"
        flexDirection="column"
        mb={4}
      >
        <StyleCardProduct $number={5}>
          {productFilter.map((product) =>
            product.status && product.home_flag ? (
              <StyleCardItem key={product.id}>
                <ProductCard product={product} />
              </StyleCardItem>
            ) : (
              ''
            ),
          )}
        </StyleCardProduct>
      </Box>
    </Box>
  );
}

HomeContainerCard.propTypes = {
  productCa: PropTypes.string,
};

const TitleCard = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 24px;
  display: inline-block;
  margin: 10px 0;
  &:hover {
    color: #e4222e;
  }
`;
