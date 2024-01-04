import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
  styled as MUIStyled,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from 'src/components/iconify';
import { cityActionThunk } from 'src/redux/actions/city-action';
import { grey, primary } from 'src/theme/palette';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  pt: 2,
  pb: 3,
  width: '45%',
};

export default function ModalAddress({ open, handleClose }) {
  const [valueCityConfig, setValueCityConfig] = useState(null);
  const [valueDistrictConfig, setValueDistrictConfig] = useState(null);
  const [valueWardConfig, setValueWardConfig] = useState(null);

  const dispatch = useDispatch();
  const { provinces, districts, wards, userAddress } = useSelector((x) => x.city);

  useEffect(() => {
    if (userAddress) {
      setValueCityConfig({
        description: userAddress.provinceTitle,
        code: userAddress.provinceCode,
      });
      setValueDistrictConfig({
        description: userAddress.districtTitle,
        code: userAddress.districtCode,
      });
      setValueWardConfig({
        description: userAddress.wardTitle,
        code: userAddress.wardCode,
      });
    }
  }, [userAddress]);

  const handleOpenProvincesSelect = async () => {
    dispatch(cityActionThunk.getAllProvinces());
  };

  const handleOnchangeProvincesSelect = (event, valueSelected) => {
    setValueDistrictConfig(null);
    setValueWardConfig(null);
    const selectedOption = provinces.find((item) => item.description === valueSelected);
    setValueCityConfig(selectedOption || null);
  };

  const handleOpenDistrictSelect = async () => {
    dispatch(cityActionThunk.getAllDistricts({ code: valueCityConfig?.code }));
  };

  const handleOnchangeDistrictConfig = (event, valueSelected) => {
    setValueWardConfig(null);
    const selectedOption = districts.find((item) => item.description === valueSelected);
    setValueDistrictConfig(selectedOption || null);
  };

  const handleOpenWardSelect = async () => {
    dispatch(
      cityActionThunk.getAllWards({
        provinceCode: valueCityConfig?.code,
        districtCode: valueDistrictConfig?.code,
      }),
    );
  };

  const handleOnchangeWardConfig = (event, valueSelected) => {
    const selectedOption = wards.find((item) => item.description === valueSelected);
    setValueWardConfig(selectedOption || null);
  };

  const handleSubmitAddress = () => {
    const param = {
      address: `${valueWardConfig.description}, ${valueDistrictConfig.description}, ${valueCityConfig.description}`,
      districtCode: valueDistrictConfig.code,
      districtTitle: valueDistrictConfig.description,
      provinceCode: valueCityConfig.code,
      provinceTitle: valueCityConfig.description,
      wardCode: valueWardConfig.code,
      wardTitle: valueWardConfig.description,
    };

    dispatch(cityActionThunk.selectAddress(param));
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 4, right: 4 }}
        >
          <Iconify
            icon="iconamoon:close"
            width={24}
            height={24}
          />
        </IconButton>
        <Stack
          borderBottom={`1px solid ${grey[400]}`}
          px={3}
          py={1}
        >
          <Typography
            id="modal-modal-title"
            variant="normal"
            fontSize={17}
            component="h2"
          >
            Địa chỉ giao hàng
          </Typography>
        </Stack>

        <Stack
          px={3}
          py={1}
        >
          <Typography
            id="modal-modal-title"
            variant="normal"
            fontSize={13}
            component="h2"
          >
            Quý khách vui lòng chọn khu vực giao hàng dự kiến
          </Typography>
          <Box
            pt={2}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Stack
              px={1}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                id="modal-modal-title"
                variant="normal"
                fontSize={13}
              >
                Tỉnh/Thành phố
              </Typography>
              <Autocomplete
                disablePortal
                id="combox-city"
                noOptionsText="loading..."
                value={valueCityConfig?.description || null}
                onChange={handleOnchangeProvincesSelect}
                onOpen={handleOpenProvincesSelect}
                options={provinces.map((item) => item.description)}
                sx={{
                  width: 400,
                }}
                classes={{ listbox: 'custom-listbox' }}
                renderInput={(params) => (
                  <TextField
                    placeholder="Tỉnh thành"
                    {...params}
                    inputProps={{
                      style: { fontSize: 13 },
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            </Stack>
            <Stack
              px={1}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                id="modal-modal-title"
                variant="normal"
                fontSize={13}
              >
                Quận/Huyện
              </Typography>
              <Autocomplete
                disablePortal
                noOptionsText="loading..."
                value={valueDistrictConfig?.description || null}
                id="combox-district"
                onChange={handleOnchangeDistrictConfig}
                options={districts.map((item) => item.description)}
                onOpen={handleOpenDistrictSelect}
                disabled={valueCityConfig === null}
                sx={{
                  width: 400,
                }}
                classes={{ listbox: 'custom-listbox' }}
                renderInput={(params) => (
                  <TextField
                    placeholder="Quận huyện"
                    {...params}
                    inputProps={{
                      style: { fontSize: 13 },
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            </Stack>
            <Stack
              px={1}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                id="modal-modal-title"
                variant="normal"
                fontSize={13}
              >
                Phường/Xã
              </Typography>
              <Autocomplete
                disablePortal
                noOptionsText="loading..."
                value={valueWardConfig?.description || null}
                onOpen={handleOpenWardSelect}
                onChange={handleOnchangeWardConfig}
                id="combox-ward"
                options={wards.map((item) => item.description)}
                disabled={valueDistrictConfig === null}
                sx={{
                  width: 400,
                }}
                classes={{ listbox: 'custom-listbox' }}
                renderInput={(params) => (
                  <TextField
                    placeholder="Phường xã"
                    {...params}
                    inputProps={{
                      style: { fontSize: 13 },
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            </Stack>
          </Box>
          <Stack
            px={1}
            direction="row"
            justifyContent="flex-end"
            pt={2}
          >
            <StyledButton
              disabled={!valueCityConfig || !valueDistrictConfig || !valueWardConfig}
              onClick={handleSubmitAddress}
            >
              Xác nhận địa chỉ
            </StyledButton>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}

ModalAddress.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

const StyledButton = MUIStyled(Button)(({ theme, padding, disabled }) => ({
  backgroundColor: `${disabled ? primary.colorPrice : primary.red}`,
  display: 'flex',
  gap: 6,
  width: 150,
  float: 'left',
  alignItems: 'center',
  color: theme.palette.background.paper,
  borderRadius: 2,
  padding: `${padding}`,
  '&:hover': {
    backgroundColor: primary.red,
  },
}));
