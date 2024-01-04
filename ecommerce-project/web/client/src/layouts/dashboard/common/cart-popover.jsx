import { useState } from 'react';
import PropTypes from 'prop-types';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { primary } from 'src/theme/palette';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { fNumber, fRounding } from 'src/utils/format-number';
import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListSubheader,
  Popover,
  Stack,
  Typography,
  styled as MUIStyled,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { BACKEND_URL } from 'src/utils/axios-instance';

const themes = createTheme({
  palette: {
    primary: {
      main: primary.red,
    },
  },
});

export const ListProductItem = ({ product }) => (
  <Box
    sx={{
      display: 'flex',
      fontSize: '12px',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 10px',
    }}
  >
    <Stack sx={{ width: '50px' }}>
      <img
        alt={product.name}
        src={`${BACKEND_URL}images/products${product.avatar}`}
        width="100%"
      />
    </Stack>
    <Stack sx={{ width: '75%', margin: '0 5px', display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant="normal"
        fontSize={12}
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {product.name}
      </Typography>
      <Typography
        variant="normal"
        fontSize={12}
      >
        {`Khối lượng: ${product.weight} Kg`}
      </Typography>
      <StockPrice>
        <Typography
          variant="normal"
          fontSize={12}
        >
          {`x${product.quantity}`}
        </Typography>
        <Typography
          variant="normal"
          fontSize={12}
          color={primary.red}
          fontWeight="bold"
        >
          {`${product.discount > 0 ? fNumber(product.price_sale) : fNumber(product.price)} ₫`}
        </Typography>
      </StockPrice>
    </Stack>
  </Box>
);

const StockPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

ListProductItem.propTypes = {
  product: PropTypes.any,
};

export default function CartPopover() {
  const { cart, count, totalAmount } = useSelector((x) => x.carts);
  const router = useRouter();
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    count > 0 && setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const hanldeDetailCart = () => {
    router.push('/gio-hang');
    setOpen(null);
  };

  return (
    <ThemeProvider theme={themes}>
      <IconButton
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
      >
        <Badge
          badgeContent={count}
          color="primary"
        >
          <Iconify
            width={24}
            icon="solar:cart-3-bold"
            sx={{ color: primary.red }}
          />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 320,
          },
        }}
      >
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: 'auto', maxHeight: 360 }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: 'overline', color: primary.red }}
              >
                Sản phẩm đã chọn
              </ListSubheader>
            }
          >
            {cart.length > 0 &&
              cart.map((product) => (
                <ListProductItem
                  product={product}
                  key={product.id}
                />
              ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="normal"
            fontSize={13}
          >{`Có tổng số ${count} sản phẩm`}</Typography>
          <Typography
            variant="normal"
            fontSize={13}
          >
            Tổng tiền:
            <span style={{ color: primary.red, fontWeight: 'bold' }}>{` ${fRounding(totalAmount)} ₫`}</span>
          </Typography>
        </Box>
        <Box sx={{ p: 1, float: 'right' }}>
          <StyledButton
            padding="3px 24px"
            onClick={hanldeDetailCart}
          >
            Xem chi tiết
          </StyledButton>
        </Box>
      </Popover>
    </ThemeProvider>
  );
}

const StyledButton = MUIStyled(Button)(({ theme, padding }) => ({
  backgroundColor: primary.red,
  display: 'flex',
  gap: 6,
  fontWeight: 400,
  fontSize: 13,
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.background.paper,
  borderRadius: 2,
  padding: `${padding}`,
  '&:hover': {
    backgroundColor: primary.red,
  },
}));
