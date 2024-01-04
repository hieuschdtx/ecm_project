import { Helmet } from 'react-helmet-async';
import { HomeView } from 'src/sections';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Trang chủ </title>
      </Helmet>

      <HomeView />
    </>
  );
}
