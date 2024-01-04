import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Main from './main';
import Header from './header';
import Footer from './footer';
import ScrollTop from './scroll-top';

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Main>{children}</Main>
      </Box>
      <Footer />
      <ScrollTop />
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
