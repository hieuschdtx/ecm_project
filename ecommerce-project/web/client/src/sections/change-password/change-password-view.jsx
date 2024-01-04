import { Box, Button, Card, Stack, TextField, Typography, alpha, useTheme, styled as MUIStyled } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Logo from 'src/components/logo';
import { userService } from 'src/services/user-service';
import { bgGradient } from 'src/theme/css';
import { primary } from 'src/theme/palette';
import { storage } from 'src/utils/storage';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Toastify } from 'src/utils/format-toast';

const fontSize = {
  fontSize: 13,
};

const defaultValues = {
  email: '',
  password: '',
  verify_code: '',
};

const schema = yup.object().shape({
  email: yup.string().required('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng'),
});

export default function ChangePasswordView() {
  const [isInputVerify, setIsInputVerify] = useState(false);
  const [isInputPassword, setIsInputPasword] = useState(false);
  const theme = useTheme();
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues,
  });

  const handleChangePassword = async (value) => {
    if (!isInputVerify && !isInputPassword) {
      const param = {
        email: value.email,
      };
      const { data } = await userService.checkEmailExisted(param);

      if (data.success) {
        storage.setCache('email', value.email);
        setIsInputVerify(data.success);
      } else {
        Toastify(data.message, data.success);
      }
    }
    if (isInputVerify) {
      const param = {
        email: value.email,
        verify_code: value.verify_code,
      };
      if (watch('verify_code') !== '') {
        const { data } = await userService.checkVerifyCode(param);
        if (data.success) {
          setIsInputPasword(data.success);
          setIsInputVerify(false);
        } else {
          Toastify(data.message, data.success);
        }
      }
    }
    if (isInputPassword) {
      const param = {
        email: value.email,
        password: value.password,
      };
      const { data } = await userService.updatePassword(param);
      if (data.success) {
        setIsInputPasword(false);
        reset(defaultValues);
      } else {
        setIsInputVerify(false);
      }
      Toastify(data.message, data.success);
    }
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 500 }}
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
            fontSize={20}
          >
            Thay đổi mật khẩu
          </Typography>
          <Box width={1}>
            <form
              id="form"
              onSubmit={handleSubmit(handleChangePassword)}
            >
              {!isInputVerify && !isInputPassword && (
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      size="medium"
                      required
                      placeholder="Vui lòng nhập email của bạn"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      inputProps={{ style: fontSize }}
                      InputLabelProps={{ style: fontSize }}
                    />
                  )}
                />
              )}

              {isInputVerify && (
                <Controller
                  name="verify_code"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      size="medium"
                      required
                      placeholder="Nhập mã xác minh"
                      error={!!errors.verify_code}
                      helperText={errors.verify_code?.message}
                      inputProps={{ style: fontSize }}
                      InputLabelProps={{ style: fontSize }}
                    />
                  )}
                />
              )}

              {isInputPassword && (
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      size="medium"
                      required
                      placeholder="Nhập mật khẩu"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      inputProps={{ style: fontSize }}
                      InputLabelProps={{ style: fontSize }}
                    />
                  )}
                />
              )}
              <StyledButton
                type="submit"
                disabled={isSubmitting}
              >
                {isInputVerify ? 'Gửi' : 'Xác nhận'}
              </StyledButton>
              {isInputVerify && (
                <Typography
                  variant="normal"
                  fontSize={12}
                  fontStyle={'italic'}
                  color={primary.red}
                >
                  Mã xác minh đã được gửi qua email của bạn. Vui lòng nhập mã xác minh để lấy lại mật khẩu
                </Typography>
              )}
              {isInputPassword && (
                <Typography
                  variant="normal"
                  fontSize={12}
                  fontStyle={'italic'}
                  color={primary.red}
                >
                  Nhập mật khẩu mới của bạn
                </Typography>
              )}
            </form>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}

const StyledButton = MUIStyled(Button)(({ theme, padding }) => ({
  backgroundColor: primary.red,
  width: '100%',
  display: 'flex',
  marginTop: 30,
  marginBottom: 30,
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
