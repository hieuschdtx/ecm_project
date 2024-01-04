import {
  FormHelperText,
  Stack,
  TextField,
  styled as MUIStyled,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  InputAdornment,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomAvatar from 'src/components/avatar/avatar';
import * as Yup from 'yup';
import { useResponsive } from 'src/hooks/use-responsive';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Iconify from 'src/components/iconify';
import { useEffect } from 'react';
import { userService } from 'src/apis/user-service';
import { useSelector } from 'react-redux';
import { useRouter } from 'src/routes/hooks';
import { notify } from 'src/utils/untils';
import { useParams } from 'react-router-dom';
import { fDate, fStringToDate } from 'src/utils/format-time';
import { connection } from 'src/utils/signalR';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const fontSize = {
  fontSize: 13,
};

const phoneIsInvalidLength = 'Số điện thoại phải đủ 10 số và bắt đầu bằng số 0';

const valueGender = [
  { label: 'Nam', value: false },
  {
    label: 'Nữ',
    value: true,
  },
];

const defaultValues = {
  full_name: '',
  avatar_file: null,
  email: '',
  address: null,
  day_of_birth: new Date(),
  gender: false,
  phone_number: '',
  password: '',
  role_id: '',
};

export default function UserDetailView({ isAdd }) {
  const mdUp = useResponsive('up', 'md');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [customIsDirty, setCustomIsDirty] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputAvatarRef = useRef(null);
  const [roles, SetRoles] = useState([]);
  const { id } = useParams();
  const { user } = useSelector((x) => x.rootReducer.user);
  const router = useRouter();

  const schema = Yup.object()
    .shape({
      full_name: Yup.string().required('Vui lòng nhập tên'),
      email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
      day_of_birth: Yup.date().required('Vui lòng chọn ngày sinh'),
      phone_number: Yup.string().matches(/^0\d{9}$/, phoneIsInvalidLength),
      password: Yup.string().test('password', 'Password phải được nhập', function (value) {
        if (!isAdd) {
          return true;
        }
        if (!value) {
          return this.createError({ message: 'Vui lòng nhập password', path: 'password' });
        }
        if (value.length < 8) {
          return this.createError({
            message: 'Password phải có độ dài hơn 8 kí tự',
            path: 'password',
          });
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value)) {
          return this.createError({
            message: 'Password phải chứa ít nhất một ký tự in hoa, một số, kí tự đặc biệt',
            path: 'password',
          });
        }
        return true;
      }),
      role_id: Yup.string().required('Vui lòng chọn quyền người dùng'),
    })
    .required();

  const {
    setValue,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    const getRoleData = async () => {
      const { data } = await userService.GetAllRoles();
      SetRoles(data);
    };
    getRoleData();
  }, []);

  useEffect(() => {
    if (!isAdd) {
      connection.on('RELOAD_DATA_CHANGE', () => {
        if (!isAdd && id) {
          handleGetUser().then((data) => {
            const val = {
              ...defaultValues,
              ...data,
              day_of_birth: fStringToDate(data.dob) || new Date(),
            };
            val.avatar && setSelectedAvatar(`${BACKEND_URL}images/avatars${val.avatar}`);
            reset(val);
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!isAdd && id) {
      handleGetUser().then((data) => {
        const val = {
          ...defaultValues,
          ...data,
          day_of_birth: fStringToDate(data.dob) || new Date(),
        };
        val.avatar && setSelectedAvatar(`${BACKEND_URL}images/avatars${val.avatar}`);
        reset(val);
      });
    }
  }, [id, isAdd]);

  const handleGetUser = async () => {
    try {
      const { data } = await userService.getUserById({ id });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitForm = async (value) => {
    const formData = new FormData();
    Object.entries({
      ...value,
      created_by: user.full_name,
      modified_by: user.full_name,
      address: value.address || 'Không có',
      day_of_birth: fDate(value.day_of_birth, 'yyyy-MM-dd'),
    }).forEach(([key, item]) => formData.append(key, item));

    if (!isAdd) {
      const {
        data: { message, success },
      } = await userService.updateUser(formData);
      notify(message, success);
      if (success) {
        setCustomIsDirty(true);
      }
    } else {
      const {
        data: { message, success },
      } = await userService.CreateNewUser(formData);
      notify(message, success);
      reset(defaultValues);
    }
  };

  const handleFileChanges = (event) => {
    const file = event.target.files[0];
    setValue('avatar_file', file);
    setCustomIsDirty(false);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Typography variant="h4">{!isAdd ? 'Cập nhật người dùng' : 'Thêm mới người dùng'}</Typography>
      <Stack direction={mdUp ? 'row' : 'column'} justifyContent="space-between" spacing={3} mt={2}>
        <CustomAvatar
          fileInputAvatarRef={fileInputAvatarRef}
          handleFileChanges={handleFileChanges}
          selectedAvatar={selectedAvatar}
        />
        <Stack
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid #d2d2d3',
            flex: 2,
          }}
        >
          <form id="form" onSubmit={handleSubmit(handleSubmitForm)}>
            <Stack spacing={3} direction="column">
              <Stack>
                <Typography variant="body1" fontWeight={700} textAlign="left">
                  Thông tin người dùng
                </Typography>
              </Stack>
              <Stack direction={mdUp ? 'row' : 'column'} spacing={2}>
                <Controller
                  name="full_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Họ tên"
                      name="full_name"
                      fullWidth
                      error={!!errors.full_name}
                      helperText={errors.full_name?.message}
                      required
                      InputLabelProps={{ sx: fontSize }}
                      inputProps={{ sx: fontSize }}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Địa chỉ email"
                      name="email"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      required
                      InputLabelProps={{ sx: fontSize }}
                      inputProps={{ sx: fontSize }}
                    />
                  )}
                />
              </Stack>
              <Stack>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Địa chỉ"
                      name="address"
                      fullWidth
                      multiline
                      value={watch('address') || ''}
                      minRows={3}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                      InputLabelProps={{ sx: fontSize }}
                      inputProps={{ sx: fontSize }}
                    />
                  )}
                />
              </Stack>
              <Stack direction={mdUp ? 'row' : 'column'} spacing={2}>
                <Controller
                  name="day_of_birth"
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DemoContainer components={['DatePicker']} sx={{ flex: 1 }}>
                        <StyledDatePicker
                          {...field}
                          sx={{ width: '100%' }}
                          label="Ngày sinh"
                          name="day_of_birth"
                          required
                        />
                      </DemoContainer>
                      {!!errors.day_of_birth && (
                        <FormHelperText error sx={fontSize}>
                          {errors.day_of_birth?.message}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  )}
                />

                <FormControl sx={{ flex: 1 }}>
                  <FormLabel sx={fontSize} id="demo-radio-buttons-group-label">
                    Giới tính
                  </FormLabel>
                  <RadioGroup
                    value={watch('gender')}
                    onChange={(v) => setValue('gender', JSON.parse(v.target.value))}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                  >
                    {valueGender.map((item) => (
                      <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio color="primary" size="small" />}
                        label={
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            gap={0.7}
                          >
                            <Typography variant="normal" fontSize={13}>
                              {item.label}
                            </Typography>
                          </Stack>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Stack>
              <Stack direction={mdUp ? 'row' : 'column'} spacing={2}>
                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Số điện thoại"
                      name="phone_number"
                      fullWidth
                      error={!!errors.phone_number}
                      helperText={errors.phone_number?.message}
                      required
                      InputLabelProps={{ sx: fontSize }}
                      inputProps={{ sx: fontSize }}
                    />
                  )}
                />
                {isAdd && (
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Mật khẩu"
                        name="password"
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        required
                        InputLabelProps={{ sx: fontSize }}
                        inputProps={{ sx: fontSize }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                <Iconify
                                  icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                )}
              </Stack>
              <Stack>
                <FormControl fullWidth>
                  <InputLabel required sx={fontSize} id="role-select-label">
                    Quyền người dùng
                  </InputLabel>
                  <Controller
                    name="role_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="role-select-label"
                        name="role_id"
                        id="role-select"
                        label="Quyền người dùng"
                        error={!!errors.role_id}
                        sx={fontSize}
                        required
                      >
                        {roles.map((item, index) => (
                          <MenuItem sx={fontSize} key={`${item}-${index}`} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />

                  {!!errors.role_id && (
                    <FormHelperText sx={fontSize} error>
                      {errors.role_id?.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Stack>
              <Stack
                direction="row"
                justifyContent={mdUp ? 'flex-start' : 'space-between'}
                spacing={2}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting || (!isAdd && !isDirty && customIsDirty)}
                >
                  {!isAdd ? 'Cập nhật' : 'Thêm mới'}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  type="button"
                  onClick={() => router.push('/user')}
                >
                  Trở lại
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </Container>
  );
}

const StyledDatePicker = MUIStyled(DatePicker)(({ theme }) => ({
  '& .MuiInputBase-root': {
    fontSize: 13,
  },
  '& .MuiFormLabel-root': {
    fontSize: 13,
  },
}));
