import { Box, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import youtubeLogo from '/assets/images/socials/youtube-fill.svg';
import facebookLogo from '/assets/images/socials/sharp-facebook.svg';
import zaloLogo from '/assets/images/socials/zalo.svg';

const dataAboutUs = [
  {
    id: 1,
    name: 'Giới thiệu về MeatDeli',
  },
  {
    id: 2,
    name: 'Danh sách cửa hàng',
  },
  {
    id: 3,
    name: 'Quản lý chất lượng',
  },
  {
    id: 4,
    name: 'Chính sách bảo mật và chia sẻ thông tin',
  },
  {
    id: 5,
    name: 'Điều khoản và điều kiện giao dịch',
  },
];

const dataCustomerSupport = [
  {
    id: 1,
    name: 'Trung tâm hỗ trợ khách hàng',
  },
  {
    id: 2,
    name: 'Chính sách giao hàng',
  },
  {
    id: 3,
    name: 'Chính sách thanh toán',
  },
  {
    id: 4,
    name: 'Chính sách đổi trả',
  },
];

const dataCustomerCare = [
  {
    id: 1,
    name: 'Mua Online: 1800 6828',
  },
  {
    id: 2,
    name: 'Email: vonghieu110902@gmail.com',
  },
];

export default function Footer() {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        width: '100%',
        borderTop: '3px solid #d42333',
        color: '#2c2c2c',
        backgroundColor: 'white',
      }}
    >
      <FooterBox>
        <Stack direction="row" gap={2} alignItems="flex-start" justifyContent="space-between">
          <Box sx={{ display: 'flex', flexDirection: 'column', pr: '20px', width: '25%' }}>
            <div className="logo">
              <img alt="logo" src="/assets/images/products/logo_header.jpg" />
            </div>
            <Typography variant="normal" fontSize={13}>
              CÔNG TY TNHH MEATDELI SÀI GÒN
            </Typography>
            <Typography variant="normal" fontSize={12}>
              Địa chỉ: Lô 2 đường Tân Đức, KCN Tân Đức, Xã Hựu Thạnh, Huyện Đức Hoà, Tỉnh Long An,
              Việt Nam
            </Typography>
            <div className="accept">
              <img
                alt="logo"
                src="/assets/images/products/bo-cong-thuong.png"
                width={123}
                height={47}
              />
            </div>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', pr: '20px', width: '25%' }}>
            <Typography variant="normal" fontSize={13} fontWeight={500} mb={2}>
              Về chúng tôi
            </Typography>
            {dataAboutUs.map((item) => (
              <ButtonItem to={item.id} key={item.id}>
                {item.name}
              </ButtonItem>
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', pr: '20px', width: '25%' }}>
            <Typography variant="normal" fontSize={13} fontWeight={500} mb={2}>
              Hỗ trợ khách hàng
            </Typography>
            {dataCustomerSupport.map((item) => (
              <ButtonItem to={item.id} key={item.id}>
                {item.name}
              </ButtonItem>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              pr: '20px',
              width: '25%',
              alignItems: 'start',
            }}
          >
            <Typography variant="normal" fontSize={13} fontWeight={500} mb={2}>
              Chăm sóc khách hàng
            </Typography>
            {dataCustomerCare.map((item) => (
              <ButtonItem to={item.id} key={item.id}>
                {item.name}
              </ButtonItem>
            ))}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
              }}
            >
              <Typography variant="normal" fontSize={13} fontWeight={500} mb={0.5} mt={1}>
                Kết nối với chúng tôi
              </Typography>
              <SocialIcon>
                <img alt="youtubeLogo" src={youtubeLogo} />
                <img alt="facebookLogo" src={facebookLogo} />
                <img alt="zaloLogo" src={zaloLogo} />
              </SocialIcon>
            </Box>
          </Box>
        </Stack>
      </FooterBox>
    </Box>
  );
}

const FooterBox = styled.div`
  background-color: #fff !important;
  width: 1200px;
  margin: 15px auto;
`;

const ButtonItem = styled(Link)`
  text-decoration: none;
  color: black;
  margin-bottom: 8px;
  font-size: 12px;
  &:hover {
    color: #e4222e;
  }
`;

const SocialIcon = styled.span`
  display: flex;
  gap: 8px;
`;
