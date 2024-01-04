import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/use-responsive';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { HEADER } from './config-layout';
import Searchbar from './common/searchbar';
import AccountPopover from './common/account-popover';
import CartPopover from './common/cart-popover';
import NavigationHeader from './common/navigation-header';
import CityAddress from './common/city-address';

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton
          onClick={onOpenNav}
          sx={{ mr: 1 }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Logo />

      <Searchbar />

      <Box sx={{ flexGrow: 1 }} />

      <CityAddress />
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <CartPopover />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_DESKTOP,
        backgroundColor: 'white',
        width: '100%',
        zIndex: theme.zIndex.appBar + 1,
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: HEADER.H_DESKTOP,
        }}
      >
        <Toolbar
          sx={{
            height: 1,
            margin: '0 auto',
            maxWidth: '1200px',
          }}
        >
          {renderContent}
        </Toolbar>
      </Box>
      <NavigationHeader />
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
