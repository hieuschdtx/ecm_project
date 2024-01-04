import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { UserActionThunk } from 'src/redux/actions/user-action';
import { Toastify } from 'src/utils/format-toast';
import styled from 'styled-components';

import {
  Box,
  Stack,
  Typography,
  styled as MUIStyled,
  Button,
  Avatar,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { primary } from 'src/theme/palette';
import { fDate, fStringToDate } from 'src/utils/format-time';
import { BACKEND_URL } from 'src/utils/axios-instance';

const fontSize = {
  fontSize: 13,
};

const defaultValues = {
  full_name: '',
  address: '',
  day_of_birth: new Date(),
  gender: false,
  email: '',
  phone_number: '',
  avatar_file: null,
};

const genderDefaultValue = [
  { label: 'Nam', value: false, width: 20 },
  { label: 'Nữ', value: true, width: 20 },
];

const schema = yup
  .object()
  .shape({
    full_name: yup.string().required('Thông tin bắt buộc'),
    phone_number: yup.string().required('Thông tin bắt buộc'),
    day_of_birth: yup.date(),
    gender: yup.boolean(),
    email: yup.string().required('Thông tin bắt buộc').email('Email không đúng định dạng'),
  })
  .required();

export default function UserInfo() {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const { user, loading, message, success, refresh } = useSelector((x) => x.user);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleFileChanges = (event) => {
    const file = event.target.files[0];
    setValue('avatar_file', file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitFormUpdate = (data) => {
    const formData = new FormData();
    Object.entries({
      ...data,
      day_of_birth: fDate(data.day_of_birth, 'yyyy-MM-dd'),
    }).forEach(([key, item]) => formData.append(key, item));

    dispatch(UserActionThunk.updateUser(formData));
  };

  useEffect(() => {
    if (!loading && message !== null) {
      Toastify(message, success);
    }
    if (refresh) {
      const param = {
        id: getValues('id'),
      };
      dispatch(UserActionThunk.getInfoUser(param));
      dispatch(UserActionThunk.cleanMessage());
    }
  }, [loading]);

  useEffect(() => {
    if (user) {
      const val = {
        ...defaultValues,
        ...user,
        day_of_birth: fStringToDate(user.dob) || new Date(),
        address: user.address || '',
      };
      reset(val);
    }
  }, [user.id]);

  return (
    <FormUpdate
      id="form"
      onSubmit={handleSubmit(submitFormUpdate)}
    >
      <Stack width="30%">
        <Typography
          variant="h6"
          fontWeight={400}
          mb={2}
        >
          Ảnh đại diện
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          alignItems="center"
        >
          <Controller
            name="avatar_file"
            control={control}
            render={({ field: { value, ...rest } }) => (
              <TextField
                {...rest}
                type="file"
                sx={{ display: 'none' }}
                inputProps={{ style: fontSize }}
                inputRef={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChanges}
              />
            )}
          />

          <Avatar
            variant="circular"
            src={selectedImage || (watch('avatar') && `${BACKEND_URL}images/avatars${watch('avatar')}`)}
            alt=""
            sx={{
              width: 200,
              height: 200,
              objectFit: 'cover',
              border: '2px solid white',
              backgroundColor: primary.red,
            }}
          />
          <StyledButton
            padding="4px 24px"
            onClick={() => fileInputRef.current.click()}
          >
            Tải ảnh lên
          </StyledButton>
        </Box>
      </Stack>
      <Stack width="70%">
        <Typography
          variant="h6"
          fontWeight={400}
          mb={2}
        >
          Thông tin tài khoản
        </Typography>
        <Box sx={{ padding: '0 12px' }}>
          <Controller
            name="full_name"
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
                  Họ tên <sup style={{ color: primary.red }}>*</sup>
                </Typography>
                <TextField
                  {...field}
                  variant="outlined"
                  size="medium"
                  placeholder="Nhập họ tên đầy đủ"
                  required
                  sx={{ width: '75%' }}
                  error={!!errors.full_name}
                  helperText={errors.full_name?.message}
                  inputProps={{ style: fontSize }}
                />
              </Stack>
            )}
          />
          <Controller
            name="phone_number"
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
                  placeholder="Số điện thoại"
                  error={!!errors.phone_number}
                  helperText={errors.phone_number?.message}
                  required
                  disabled
                  sx={{ width: '75%' }}
                  inputProps={{ style: fontSize }}
                />
              </Stack>
            )}
          />
          <Controller
            name="email"
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
                  Email <sup style={{ color: primary.red }}>*</sup>
                </Typography>
                <TextField
                  {...field}
                  type="email"
                  variant="outlined"
                  size="medium"
                  placeholder="Email"
                  required
                  sx={{ width: '75%' }}
                  inputProps={{ style: fontSize }}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Stack>
            )}
          />
          <Controller
            name="gender"
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
                  Giới tính
                </Typography>
                <FormControl sx={{ width: '75%' }}>
                  <RadioGroup
                    sx={{ display: 'flex', flexDirection: 'row' }}
                    value={watch('gender')}
                    onChange={(e) => setValue('gender', e.target.value === 'true')}
                  >
                    {genderDefaultValue.map((item) => (
                      <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio color="primary" />}
                        label={
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
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
            )}
          />
          <Controller
            name="day_of_birth"
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
                  Ngày sinh
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DemoContainer
                    components={['DatePicker']}
                    sx={{ width: '75%' }}
                  >
                    <DatePicker
                      sx={{ width: 100 }}
                      onChange={(date) => setValue('day_of_birth', date)}
                      value={watch('day_of_birth')}
                      name="day_of_birth"
                      slotProps={{ textField: { size: 'small' } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
            )}
          />
          <Controller
            name="address"
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
                  Địa chỉ
                </Typography>
                <TextField
                  {...field}
                  variant="outlined"
                  multiline
                  minRows={3}
                  size="medium"
                  placeholder="Địa chỉ"
                  sx={{ width: '75%' }}
                  inputProps={{ style: fontSize }}
                />
              </Stack>
            )}
          />
          <StyledButton
            padding="6px 24px"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Cập nhật
          </StyledButton>
        </Box>
      </Stack>
    </FormUpdate>
  );
}

const StyledButton = MUIStyled(Button)(({ padding }) => ({
  backgroundColor: primary.red,
  display: 'flex',
  textTransform: 'none',
  gap: 6,
  float: 'right',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  borderRadius: 4,
  padding: `${padding}`,
  '&:hover': {
    backgroundColor: primary.red,
  },
}));

const FormUpdate = styled.form`
  width: 100%;
  padding: 0 24px;
  display: flex;
  align-items: start;
`;
