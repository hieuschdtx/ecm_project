import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useResponsive } from 'src/hooks/use-responsive';
import { HEADER } from './config-layout';

const SPACING = 42;

export default function Main({ children, sx, ...other }) {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        pt: `${HEADER.H_DESKTOP + SPACING}px`,
        ...(lgUp && {
          px: 2,
          pt: `${HEADER.H_DESKTOP + SPACING}px`,
          width: '100%',
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
