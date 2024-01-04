import Container from '@mui/material/Container';
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActionThunk } from 'src/redux/actions/cart-action';
import { Toastify } from 'src/utils/format-toast';

const LazyLoadedSlider = lazy(() => import('src/components/Slider'));
const LazyLoadedCarousel = lazy(() => import('src/components/Carousel'));
const LazyLoadedAppCardProduct = lazy(() => import('./home-card-product'));
const LazyLoadedHomePartner = lazy(() => import('./home-partner'));
// ----------------------------------------------------------------------

export default function HomeView() {
  const dispatch = useDispatch();
  const { productCategories } = useSelector((x) => x.productCategories);
  const { message, success, loading } = useSelector((x) => x.carts);
  useEffect(() => () => dispatch(cartActionThunk.cleanMessage()), []);

  useEffect(() => {
    if (!loading && message !== null) {
      Toastify(message, success);
      dispatch(cartActionThunk.cleanMessage());
    }
  }, [message, loading]);

  return (
    <Container sx={{ maxWidth: '1200px' }}>
      <LazyLoadedSlider />
      <LazyLoadedCarousel />
      {productCategories.map((item) => (
        <LazyLoadedAppCardProduct
          productCa={item.id}
          key={item.id}
        />
      ))}
      <LazyLoadedHomePartner />
    </Container>
  );
}
