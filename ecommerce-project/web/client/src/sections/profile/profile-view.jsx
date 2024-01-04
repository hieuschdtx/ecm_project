import {
  Box,
  Container,
  Stack,
  Typography,
  styled as MUIStyled,
  ListItemButton,
  List,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { primary } from 'src/theme/palette';
import UserInfo from './user-info';

const MENU_OPTIONS = [
  {
    id: 1,
    label: 'Tài khoản',
    icon: 'mingcute:user-4-line',
    url: 'profile',
    component: <UserInfo />,
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

const theme = createTheme({
  palette: {
    primary: {
      main: primary.hover,
    },
  },
});

export default function ProfileView() {
  const { alias } = useParams();
  const [selected, setSelected] = useState(alias);
  const router = useRouter();

  const handleClickItem = (item) => {
    setSelected(item.url);
    router.push(`/customer/${item.url}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ maxWidth: '1200px', position: 'relative', p: '0 !important', height: 1 }}>
        <Stack
          direction="row"
          height={1}
          width={1}
          mb={4}
        >
          <Box width="20%">
            <List>
              {MENU_OPTIONS.map((option) => (
                <StyledListItemButton
                  key={option.id}
                  onClick={() => handleClickItem(option)}
                  selected={selected === option.url}
                >
                  <Iconify icon={option.icon} />
                  <Typography
                    variant="normal"
                    fontSize={13}
                  >
                    {option.label}
                  </Typography>
                </StyledListItemButton>
              ))}
            </List>
          </Box>
          <Box width="80%">
            {MENU_OPTIONS.map((option) => {
              if (alias === option.url) return <Box key={option.id}>{option.component}</Box>;
            })}
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

const StyledListItemButton = MUIStyled(ListItemButton)(({}) => ({
  display: 'flex',
  gap: 5,
  alignItems: 'center',
  padding: 10,
  color: primary.colorPrice,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'white',
  },
  '&.Mui-selected': {
    backgroundColor: primary.red,
    color: 'white',
    '&:hover': {
      backgroundColor: primary.red,
    },
  },
}));
