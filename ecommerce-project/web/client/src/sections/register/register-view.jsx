import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  alpha,
  createTheme,
  useTheme,
  styled as MUIStyled,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from 'src/components/iconify';
import Logo from 'src/components/logo';
import { UserActionThunk } from 'src/redux/actions/user-action';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import { primary } from 'src/theme/palette';
import { Toastify } from 'src/utils/format-toast';
import * as yup from 'yup';

const defaultFoneSize = { fontSize: 13 };
const phoneIsInvalidLength = 'Số điện thoại phải đủ 10 số và bắt đầu bằng số 0';

const themes = createTheme({
  palette: {
    primary: {
      main: primary.hover,
    },
  },
});

const defaultValues = {
  full_name: '',
  phone_number: '',
  email: '',
  password: '',
  confirm_password: '',
};

const schema = yup
  .object()
  .shape({
    full_name: yup.string().required('Thông tin bắt buộc'),
    phone_number: yup.string().matches(/^0\d{9}$/, phoneIsInvalidLength),
    email: yup.string().email('Email không hợp lệ').required('Thông tin bắt buộc'),
    password: yup
      .string()
      .required('Thông tin bắt buộc')
      .min(8, 'Mật khẩu phải có ít nhất 8 kí tự')
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/,
        'Mật khẩu phải chứa ít nhất một ký tự viết hoa, một ký tự đặc biệt và một chữ số',
      ),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu không khớp')
      .required('Thông tin bắt buộc'),
  })
  .required();

const RegisterView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { message, loading, success } = useSelector((x) => x.user);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    return () => dispatch(UserActionThunk.cleanMessage());
  }, []);

  useEffect(() => {
    if (message && !loading) {
      Toastify(message, success);
      dispatch(UserActionThunk.cleanMessage());
    }
    if (success) {
      setTimeout(() => {
        handleClick();
      }, 1500);
    }
  }, [loading, success]);

  const handleSubmitForm = (value) => {
    dispatch(UserActionThunk.registerUser(value));
  };

  const handleClick = () => {
    router.push('/login');
  };

  return (
    <ThemeProvider theme={themes}>
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_4.jpg',
          }),
          height: 1,
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ height: 1 }}
        >
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
              borderRadius: 0,
              height: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Logo sx={{ width: 220 }} />
            <Typography
              variant="normal"
              fontSize={24}
            >
              Đăng ký tài khoản hội viên
            </Typography>
            <Box width={1}>
              <form
                id="form"
                onSubmit={handleSubmit(handleSubmitForm)}
              >
                <Stack
                  spacing={3}
                  mt={5}
                >
                  <Controller
                    name="full_name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        label="Họ và tên"
                        size="medium"
                        required
                        placeholder="Họ và tên"
                        error={!!errors.full_name}
                        helperText={errors.full_name?.message}
                        inputProps={{ sx: defaultFoneSize }}
                        InputLabelProps={{ sx: defaultFoneSize }}
                      />
                    )}
                  />
                  <Controller
                    name="phone_number"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        label="Số điện thoại"
                        size="medium"
                        required
                        placeholder="Số điện thoại"
                        error={!!errors.phone_number}
                        helperText={errors.phone_number?.message}
                        inputProps={{ sx: defaultFoneSize }}
                        InputLabelProps={{ sx: defaultFoneSize }}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        label="Email"
                        size="medium"
                        required
                        placeholder="Email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        inputProps={{ sx: defaultFoneSize }}
                        InputLabelProps={{ sx: defaultFoneSize }}
                      />
                    )}
                  />
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        label="Mật khẩu"
                        size="medium"
                        required
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        inputProps={{ style: defaultFoneSize }}
                        InputLabelProps={{ style: defaultFoneSize }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                <Iconify
                                  sx={{ color: primary.hover }}
                                  icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="confirm_password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        type={showConfirmPassword ? 'text' : 'password'}
                        label="Xác nhận mật khẩu"
                        size="medium"
                        required
                        placeholder="Xác nhận mật khẩu"
                        error={!!errors.confirm_password}
                        helperText={errors.confirm_password?.message}
                        inputProps={{ sx: defaultFoneSize }}
                        InputLabelProps={{ sx: defaultFoneSize }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                              >
                                <Iconify
                                  sx={{ color: primary.hover }}
                                  icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Stack>
                <Stack
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                  mt={4}
                >
                  <StyledButton
                    fullWidth
                    size="medium"
                    loading={isSubmitting}
                    loadingIndicator={
                      <CircularProgress
                        color="info"
                        size={16}
                      />
                    }
                    type="submit"
                    padding="10px 0"
                    disabled={isSubmitting}
                  >
                    Đăng ký
                  </StyledButton>
                  <StyledButton
                    fullWidth
                    size="medium"
                    padding="10px 0"
                    type="button"
                    onClick={handleClick}
                  >
                    Đăng nhập
                  </StyledButton>
                </Stack>
              </form>
            </Box>
          </Card>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default RegisterView;

const StyledButton = MUIStyled(LoadingButton)(({ theme, padding }) => ({
  backgroundColor: primary.red,
  display: 'flex',
  gap: 6,
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.background.paper,
  borderRadius: 2,
  padding: `${padding}`,
  '&:hover': {
    backgroundColor: primary.red,
  },
}));
