import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productAsyncThunk } from 'src/redux/actions/product-action';
import { ProductDetailView } from 'src/sections';

export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const { alias } = useParams();
  const { products } = useSelector((x) => x.products);

  useEffect(() => {
    dispatch(productAsyncThunk.getProductByProductCategory());
  }, [dispatch]);

  const productFilter = products.find((item) => item.alias === alias);

  return (
    <>
      <Helmet>
        <title> {productFilter?.name || 'Chi tiết sản phẩm'} </title>
      </Helmet>
      {productFilter && <ProductDetailView productFilter={productFilter} />}
    </>
  );
}
