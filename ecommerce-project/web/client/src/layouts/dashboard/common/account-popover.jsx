import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'src/routes/hooks';
import { UserActionThunk } from 'src/redux/actions/user-action';
import Iconify from 'src/components/iconify';
import { primary } from 'src/theme/palette';
import { BACKEND_URL } from 'src/utils/axios-instance';

const MENU_OPTIONS = [
  {
    id: 1,
    label: 'Tài khoản',
    icon: 'mingcute:user-4-line',
    url: 'profile',
  },
  {
    id: 2,
    label: 'Quản lý đơn hàng',
    icon: 'quill:paper',
    url: 'orders',
  },
  {
    id: 3,
    label: 'Lịch sử giao dịch',
    icon: 'tdesign:undertake-transaction',
    url: 'transaction-history',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const { user } = useSelector((x) => x.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOpen = (event) => {
    if (user) setOpen(event.currentTarget);
    else router.push('/login');
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleClickItem = (url) => {
    router.push(`/customer/${url}`);
    setOpen(null);
  };

  const handleLogoutUser = () => {
    dispatch(UserActionThunk.logoutUser());
    setOpen(null);
    router.push('/');
  };

  useEffect(() => {
    if (user) {
      const param = {
        id: user.id,
      };
      dispatch(UserActionThunk.getInfoUser(param));
    }
  }, [dispatch, user?.id]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={`${user?.avatar ? `${BACKEND_URL}images/avatars/${user.avatar}` : ''}`}
          alt={user?.full_name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.full_name.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      {user && (
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              p: 0,
              mt: 1,
              ml: 0.75,
              width: 200,
            },
          }}
        >
          <Box sx={{ my: 1.5, px: 2 }}>
            <Typography
              variant="subtitle2"
              noWrap
            >
              {user.full_name}
            </Typography>
            <Typography
              variant="normal"
              fontSize={12}
              color={primary.colorPrice}
              noWrap
            >
              {user.email}
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.id}
              onClick={() => handleClickItem(option.url)}
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                color: primary.colorPrice,
                py: 1,
              }}
            >
              <Iconify icon={option.icon} />
              <Typography
                variant="normal"
                fontSize={13}
              >
                {option.label}
              </Typography>
            </MenuItem>
          ))}

          <MenuItem
            disableRipple
            disableTouchRipple
            onClick={handleLogoutUser}
            sx={{ display: 'flex', gap: 1, alignItems: 'center', color: primary.colorPrice, py: 1 }}
          >
            <Iconify icon="mdi:logout" />
            <Typography
              variant="normal"
              fontSize={13}
            >
              Đăng xuất
            </Typography>
          </MenuItem>
        </Popover>
      )}
    </>
  );
}
