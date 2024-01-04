import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  ListItemIcon,
  Radio,
  RadioGroup,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { useState } from 'react';
import { customShadows } from 'src/theme/custom-shadows';
import { primary } from 'src/theme/palette';
import Calendar from './calendar';
import DeliveryAddress from './delivery-address';

const paymentMethods = [
  { label: 'Tiền mặt (COD)', value: 1, icon: 'cod.png', width: 20 },
  {
    label: 'Thanh toán trực tuyến (online)',
    value: 2,
    icon: 'momo-logo.png',
    width: 20,
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: primary.hover,
    },
  },
});

export default function CheckoutView() {
  const [valuePaymentMethod, setValuePaymentMethod] = useState(1);
  const [valueDeliveryDate, setValueDeliveryDate] = useState(new Date());
  const styleShadow = customShadows();

  const handleChange = (event) => {
    setValuePaymentMethod(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          maxWidth: '1200px',
          position: 'relative',
          p: '0 !important',
        }}
      >
        <Stack>
          <Typography
            variant="normal"
            fontSize={25}
            fontWeight={500}
          >
            Thanh toán
          </Typography>
        </Stack>
        <Box p={2}>
          <Stack
            boxShadow={styleShadow.cards}
            width="100%"
            bgcolor="white"
            px={3}
            py={1.5}
            borderRadius={4}
          >
            <Typography
              variant="normal"
              fontSize={18}
              lineHeight="32px"
              fontWeight={400}
            >
              Phương thức thanh toán
            </Typography>
            <FormControl>
              <RadioGroup
                value={valuePaymentMethod}
                onChange={handleChange}
              >
                {paymentMethods.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio color="primary" />}
                    label={
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={0.7}
                      >
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <img
                            alt={item.label}
                            src={`/assets/images/socials/${item.icon}`}
                            width={item.width}
                          />
                        </ListItemIcon>
                        <Typography
                          variant="normal"
                          fontWeight={400}
                          fontSize={12}
                        >
                          {item.label}
                        </Typography>
                      </Stack>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Stack>

          <Stack
            boxShadow={styleShadow.cards}
            width="100%"
            bgcolor="white"
            px={3}
            py={1.5}
            borderRadius={4}
            mt={2}
          >
            <Typography
              variant="normal"
              fontSize={18}
              lineHeight="32px"
              fontWeight={400}
            >
              Phương thức giao hàng
            </Typography>
            <FormControl>
              <RadioGroup value="0">
                <FormControlLabel
                  value="0"
                  control={<Radio color="primary" />}
                  label={
                    <Typography
                      variant="normal"
                      fontWeight={400}
                      fontSize={12}
                    >
                      Giao hàng tận nơi
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Stack>

          <Stack
            boxShadow={styleShadow.cards}
            width="100%"
            bgcolor="white"
            px={3}
            py={1.5}
            borderRadius={4}
            mt={2}
          >
            <Calendar handleGetDate={setValueDeliveryDate} />
          </Stack>
          <Stack
            boxShadow={styleShadow.cards}
            width="100%"
            bgcolor="white"
            px={3}
            py={1.5}
            borderRadius={4}
            mt={2}
          >
            <DeliveryAddress
              paymentMethod={valuePaymentMethod}
              deliveryDate={valueDeliveryDate}
            />
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
