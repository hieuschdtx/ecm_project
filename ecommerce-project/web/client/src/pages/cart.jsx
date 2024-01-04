import { Helmet } from 'react-helmet-async';
import { CartView } from 'src/sections';

export default function CartPage() {
  return (
    <>
      <Helmet>
        <title> Giỏ hàng </title>
      </Helmet>
      <CartView />
    </>
  );
}
