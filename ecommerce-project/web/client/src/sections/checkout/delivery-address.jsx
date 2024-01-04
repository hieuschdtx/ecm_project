import { useEffect, useState } from 'react';
import { Box, Stack, TextField, Typography, styled as MUIStyled, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { grey, primary } from 'src/theme/palette';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { fChangeNumber, fNumber } from 'src/utils/format-number';
import ModalAddress from 'src/layouts/dashboard/common/modal-address';
import { storage } from 'src/utils/storage';
import PropTypes from 'prop-types';
import { orderService } from 'src/services/order-service';
import { Toastify } from 'src/utils/format-toast';
import { cartActionThunk } from 'src/redux/actions/cart-action';

const fontSize = {
  fontSize: 13,
};
const transportFee = 30000;
const defaultLimitTransport = 300000;

const phoneIsInvalidLength = 'Số điện thoại phải đủ 10 số và bắt đầu bằng số 0';

const defaultValues = {
  customer_name: '',
  customer_address: '',
  customer_email: '',
  customer_phone: '',
  delivery_area: '',
  note: '',
  request_invoice: false,
  delivery_date: new Date(),
  payment_methods_id: '',
  bill_invoice: 0,
  userId: null,
};

const schema = yup
  .object()
  .shape({
    customer_name: yup.string().required('Thông tin bắt buộc'),
    customer_address: yup.string().required('Thông tin bắt buộc'),
    customer_email: yup.string().required('Thông tin bắt buộc'),
    delivery_area: yup.string().required('Thông tin bắt buộc'),
    customer_phone: yup.string().matches(/^0\d{9}$/, phoneIsInvalidLength),
  })
  .required();

export default function DeliveryAddress({ paymentMethod, deliveryDate }) {
  const { cart, totalAmount } = useSelector((x) => x.carts);
  const { userAddress } = useSelector((x) => x.city);
  const { user } = useSelector((x) => x.user);
  const [open, setOpen] = useState(false);
  const isTranSport = totalAmount >= defaultLimitTransport;
  const billInvoice = !isTranSport ? totalAmount + transportFee : totalAmount;
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues,
  });

  const hanldeChangeAddress = () => setOpen(true);

  const handleCloseModal = () => setOpen(false);

  useEffect(() => {
    setValue('delivery_area', userAddress?.address);
    setValue('payment_methods_id', paymentMethod);
    setValue('delivery_date', deliveryDate);
    setValue('userId', user?.id || null);
  }, [setValue, open, paymentMethod, deliveryDate, userAddress]);

  const handleSubmitOrder = async (value) => {
    let products = [];
    cart.forEach((item) => {
      var product = {
        product_id: item.id,
        quantity: item.quantity,
        total_amount: item.price_sale > 0 ? item.price_sale : item.price,
      };
      products.push(product);
    });

    const param = {
      ...value,
      bill_invoice: fChangeNumber(fNumber(totalAmount)),
      customer_address: `${value.customer_address}, ${value.delivery_area}`,
      carts: products,
    };

    const { data } = await orderService.createOrder(param);
    if (data.success) {
      Toastify(data.message, data.success);
      dispatch(cartActionThunk.clearCart());
      reset(defaultValues);
    }
  };

  return (
    <>
      <Typography
        variant="normal"
        fontSize={18}
        lineHeight="32px"
        fontWeight={400}
        mb={1}
      >
        Địa chỉ nhận hàng
      </Typography>
      <form
        id="form"
        onSubmit={handleSubmit(handleSubmitOrder)}
      >
        <Controller
          name="customer_name"
          control={control}
          render={({ field }) => (
            <Stack
              direction="row"
              alignItems="baseline"
              width="100%"
              justifyContent="space-between"
              mb={2}
            >
              <Typography
                variant="normal"
                fontSize={13}
                width="25%"
              >
                Họ tên người nhận <sup style={{ color: primary.red }}>*</sup>
              </Typography>
              <TextField
                {...field}
                variant="outlined"
                size="medium"
                placeholder="Nhập họ tên đầy đủ"
                required
                sx={{ width: '75%' }}
                error={!!errors.customer_name}
                helperText={errors.customer_name?.message}
                inputProps={{ style: fontSize }}
              />
            </Stack>
          )}
        />
        <Controller
          name="customer_phone"
          control={control}
          render={({ field }) => (
            <Stack
              direction="row"
              alignItems="baseline"
              width="100%"
              justifyContent="space-between"
              mb={2}
            >
              <Typography
                variant="normal"
                fontSize={13}
                width="25%"
              >
                Số điện thoại <sup style={{ color: primary.red }}>*</sup>
              </Typography>
              <TextField
                {...field}
                variant="outlined"
                size="medium"
                placeholder="Nhập số điện thoại"
                required
                sx={{ width: '75%' }}
                error={!!errors.customer_phone}
                helperText={errors.customer_phone?.message}
                inputProps={{ style: fontSize }}
              />
            </Stack>
          )}
        />
        <Controller
          name="delivery_area"
          control={control}
          render={({ field }) => (
            <Stack
              direction="row"
              alignItems="baseline"
              width="100%"
              justifyContent="space-between"
              mb={2}
            >
              <Typography
                variant="normal"
                fontSize={13}
                width="25%"
              >
                Khu vực giao hàng <sup style={{ color: primary.red }}>*</sup>
              </Typography>
              <TextField
                {...field}
                variant="outlined"
                size="medium"
                placeholder="Chọn khu vực giao hàng"
                required
                disabled
                sx={{ flex: 1, mr: 1 }}
                error={!!errors.delivery_area}
                helperText={errors.delivery_area?.message}
                inputProps={{ style: fontSize }}
              />
              <StyledButton
                onClick={hanldeChangeAddress}
                padding="12px 12px"
              >
                Đổi khu vực
              </StyledButton>
            </Stack>
          )}
        />
        <Controller
          name="customer_address"
          control={control}
          render={({ field }) => (
            <Stack
              direction="row"
              alignItems="baseline"
              width="100%"
              justifyContent="space-between"
              mb={2}
            >
              <Typography
                variant="normal"
                fontSize={13}
                width="25%"
              >
                Địa chỉ <sup style={{ color: primary.red }}>*</sup>
              </Typography>
              <TextField
                {...field}
                variant="outlined"
                size="medium"
                placeholder="Nhập số nhà, tên đường"
                required
                sx={{ width: '75%' }}
                error={!!errors.customer_address}
                helperText={errors.customer_address?.message}
                inputProps={{ style: fontSize }}
              />
            </Stack>
          )}
        />
        <Controller
          name="customer_email"
          control={control}
          render={({ field }) => (
            <Stack
              direction="row"
              alignItems="baseline"
              width="100%"
              justifyContent="space-between"
              mb={2}
            >
              <Typography
                variant="normal"
                fontSize={13}
                width="25%"
              >
                Địa chỉ email <sup style={{ color: primary.red }}>*</sup>
              </Typography>
              <TextField
                {...field}
                variant="outlined"
                size="medium"
                placeholder="Nhập địa chỉ email"
                required
                sx={{ width: '75%' }}
                error={!!errors.customer_email}
                helperText={errors.customer_email?.message}
                inputProps={{ style: fontSize }}
              />
            </Stack>
          )}
        />
        <Controller
          name="note"
          control={control}
          render={({ field }) => (
            <Stack
              direction="row"
              alignItems="baseline"
              width="100%"
              justifyContent="space-between"
              mb={2}
            >
              <Typography
                variant="normal"
                fontSize={13}
                width="25%"
              >
                Ghi chú
              </Typography>
              <TextField
                {...field}
                variant="outlined"
                size="medium"
                placeholder="Khách hàng có những yêu cầu khác vui lòng nhập vào đây để cửa hàng có thể phục vụ tốt nhất"
                sx={{ width: '75%' }}
                error={!!errors.note}
                helperText={errors.note?.message}
                inputProps={{ style: fontSize }}
              />
            </Stack>
          )}
        />
        <Box width="100%">
          <Box
            sx={{
              float: 'right',
              width: '40%',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              p: 3,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              color={primary.colorPrice}
              fontSize={14}
            >
              <Typography variant="normal">Tổng tiền hàng</Typography>
              <Typography variant="normal">{`${fNumber(totalAmount)} ₫`}</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              color={primary.colorPrice}
              fontSize={14}
            >
              <Typography variant="normal">Phí vận chuyển</Typography>
              <Typography variant="normal">{`${!isTranSport ? fNumber(transportFee) : 0} ₫`}</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              color={primary.colorPrice}
              fontSize={14}
            >
              <Typography variant="normal">Tổng thanh toán</Typography>
              <Typography
                variant="normal"
                fontSize={18}
                fontWeight="bold"
                color={primary.red}
              >{`${fNumber(billInvoice)} ₫`}</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="flex-end"
            >
              <StyledButton
                type="submit"
                disabled={!isValid && !isSubmitting}
                padding="12px 32px"
              >
                XÁC NHẬN ĐẶT HÀNG
              </StyledButton>
            </Stack>
          </Box>
        </Box>
        {open && (
          <ModalAddress
            open={open}
            handleClose={handleCloseModal}
          />
        )}
      </form>
    </>
  );
}

const StyledButton = MUIStyled(Button)(({ theme, padding, disabled }) => ({
  backgroundColor: `${!disabled ? primary.red : grey[400]}`,
  display: 'flex',
  textTransform: 'none',
  gap: 6,
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  borderRadius: 4,
  padding: `${padding}`,
  '&:hover': {
    backgroundColor: primary.red,
  },
}));

DeliveryAddress.propTypes = {
  paymentMethod: PropTypes.any,
  deliveryDate: PropTypes.any,
};
