import { useEffect, useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  styled as MUIStyled,
  useTheme,
  Card,
  alpha,
} from '@mui/material';

import { bgGradient } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import Logo from 'src/components/logo';
import { primary } from 'src/theme/palette';
import { useDispatch, useSelector } from 'react-redux';
import { UserActionThunk } from 'src/redux/actions/user-action';
import { Toastify } from 'src/utils/format-toast';

const fontSize = {
  fontSize: 13,
};

const defaultValues = {
  phone_number: '',
  password: '',
};

const schema = yup
  .object()
  .shape({
    phone_number: yup
      .string()
      .required('Vui lòng nhập số điện thoại')
      .matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
  })
  .required();

export default function LoginView() {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, message, success, loading } = useSelector((x) => x.user);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues,
  });

  const submitFormLogin = () => {
    const param = getValues();
    dispatch(UserActionThunk.loginUser(param));
  };

  const handleClick = () => {
    router.push('/register');
  };

  useEffect(() => () => dispatch(UserActionThunk.cleanMessage()), []);

  useEffect(() => {
    if (message && !loading) {
      Toastify(message, success);
    }
    if (success && user) {
      setTimeout(() => {
        router.push('/');
      }, 2500);
    }
  }, [loading, message, success]);

  return (
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
            Đăng nhập
          </Typography>
          <Box width={1}>
            <form
              id="form"
              onSubmit={handleSubmit(submitFormLogin)}
            >
              <Stack
                spacing={3}
                mt={5}
              >
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
                      error={!!errors.phone_number}
                      helperText={errors.phone_number?.message}
                      inputProps={{ style: fontSize }}
                      InputLabelProps={{ style: fontSize }}
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
                      inputProps={{ style: fontSize }}
                      InputLabelProps={{ style: fontSize }}
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
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ my: 3 }}
              >
                <ForgotPassword to="/forgot-password">Quên mật khẩu?</ForgotPassword>
              </Stack>

              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <StyledButton
                  fullWidth
                  size="medium"
                  type="submit"
                  padding="10px 0"
                  disabled={isSubmitting}
                >
                  Đăng nhập
                </StyledButton>
                <StyledButton
                  fullWidth
                  size="medium"
                  padding="10px 0"
                  type="button"
                  onClick={handleClick}
                >
                  Đăng ký
                </StyledButton>
              </Stack>
            </form>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}

const ForgotPassword = styled(Link)`
  text-decoration: none;
  font-size: 14px;
  color: ${primary.red};
`;

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
