import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/iconify';
import { primary } from 'src/theme/palette';
import ModalAddress from './modal-address';
import { useSelector } from 'react-redux';

export default function CityAddress() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { userAddress } = useSelector((x) => x.city);

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          backgroundColor: '#f7f7f7',
          cursor: 'pointer',
          borderRadius: 16,
          minWidth: 264,
          height: 40,
          pl: 1,
          pr: 2,
          mr: 1,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
          width="100%"
        >
          <Iconify
            icon="ep:location"
            sx={{ color: primary.red }}
            width={25}
          />
          <Stack
            direction="column"
            p={0}
          >
            <Typography
              variant="normal"
              fontSize={15}
              fontWeight={500}
              color={primary.red}
            >
              Giao hàng
            </Typography>
            <Typography
              variant="normal"
              fontSize={12}
              color={primary.colorPrice}
            >
              {userAddress?.address || 'Không có'}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      {open && (
        <ModalAddress
          open={open}
          handleClose={handleClose}
        />
      )}
    </>
  );
}
