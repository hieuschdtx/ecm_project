import { Box, Container, MenuItem, MenuList, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { primary } from 'src/theme/palette';

const RenderHighlightText = ({ title }) => {
  return <span style={{ color: primary.red }}>{title}</span>;
};

const renderUl = (
  <ul style={{ paddingInlineStart: 15 }}>
    <li>
      <Typography
        variant="normal"
        fontSize={14}
        lineHeight={2}
        letterSpacing={1}
      >
        Tuyến số 1: Chỉ heo khỏe mới được xuất trại.
      </Typography>
    </li>
    <li>
      <Typography
        variant="normal"
        fontSize={14}
        lineHeight={2}
        letterSpacing={1}
      >
        Tuyến số 2: Chỉ heo khỏe, không nhiễm dịch bệnh mới được đưa vào nhà máy.
      </Typography>
    </li>
    <li>
      <Typography
        variant="normal"
        fontSize={14}
        lineHeight={2}
        letterSpacing={1}
      >
        Tuyến số 3: Thịt heo an toàn mới được xuất bán ra thị trường.
      </Typography>
    </li>
  </ul>
);

export default function IntroductionPage() {
  return (
    <>
      <Helmet>
        <title>Giới thiệu về MeatDeli</title>
      </Helmet>
      <Container sx={{ pt: 3 }}>
        <Stack
          textAlign="center"
          mb={1}
        >
          <Typography variant="h5">GIỚI THIỆU VỀ THỊT SẠCH MEATDELI - TƯƠI NGON SUỐT 9 NGÀY*</Typography>
        </Stack>
        <Stack>
          <Typography
            variant="normal"
            fontSize={14}
            lineHeight={2}
            letterSpacing={1}
          >
            <RenderHighlightText title={'Thịt sạch MEATDeli'} />, từ nguồn heo khỏe, được xử lý và đóng gói khép kín với
            <RenderHighlightText title={' Công Nghệ Oxy Fresh 9 '} />
            từ Châu Âu giúp ngăn chặn vi khuẩn xâm nhập và tạo môi trường mát lành cho thịt tiếp tục thở. Thịt sạch
            MEATDeli, tươi ngon suốt 9 ngày vì bữa ăn ngon vô lo cho cả nhà.
          </Typography>
          <Box
            textAlign="center"
            mt={3}
          >
            <img src="https://shop.meatdeli.com.vn/_next/static/images/gioi-thieu-ve-winmart-1-f5c5fbe538dd159501cc791fe0e083c7.jpg" />
          </Box>
          <Box>
            <Typography
              variant="normal"
              fontSize={14}
              lineHeight={2}
              letterSpacing={1}
            >
              Hệ thống chăn nuôi khép kín <br /> Công nghệ Oxy-Fresh 9 <br /> Công nghệ thịt mát từ Châu Âu
            </Typography>
          </Box>
        </Stack>
        <Stack mt={2}>
          <Box textAlign="center">
            <Typography>
              <RenderHighlightText title={'ƯU ĐIỂM VƯỢT TRỘI CỦA MEAT DELI'} />
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="normal"
              fontSize={14}
              lineHeight={2}
              letterSpacing={1}
            >
              Hệ thống chăn nuôi khép kín - Đảm bảo an toàn cho người tiêu dùng trong thời điểm dịch tả lợn Châu Phi
              đang hoành hành.
              <br />
            </Typography>
            <Typography
              variant="normal"
              fontSize={14}
              lineHeight={2}
              letterSpacing={1}
            >
              Thịt sạch MEATDeli được sản xuất trong quy trình khép kín: Heo khoẻ được nuôi theo tiêu chuẩn Global GAP
              và áp dụng hệ thống kiểm soát 3 tuyến kiểm dịch theo hướng dẫn của bộ NN-PTNT và Cục An toàn thực phẩm -
              Bộ Y Tế.
            </Typography>
          </Box>
          <Box>{renderUl}</Box>
          <Box textAlign="center">
            <img src="https://shop.meatdeli.com.vn/_next/static/images/gioi-thieu-ve-winmart-2-f0102d1c18804510e4633b03772900d0.jpg" />
          </Box>
        </Stack>
        <Stack mt={2}>
          <Typography
            variant="normal"
            fontSize={14}
            lineHeight={2}
            letterSpacing={1}
          >
            Tươi ngon suốt 9 ngày với Công nghệ Oxy-Fresh 9 Châu Âu
          </Typography>
          <Typography
            variant="normal"
            fontSize={14}
            lineHeight={2}
            letterSpacing={1}
          >
            Thịt được áp dụng đóng gói với Công nghệ Oxy-Fresh 9 từ Châu Âu. Công nghệ này giúp giữ nguyên chất lượng và
            màu đỏ hồng của thịt tươi trong suốt thời hạn sử dụng, hạn chế vi sinh phát triển nhờ cung cấp Oxy tự nhiên
            vào bên trong hộp thịt. Toàn bộ quá trình chế biến, đóng gói, vận chuyển và phân phối đều đảm bảo nhiệt độ
            thịt từ 0 đến 4 độ C giúp thịt tiếp tục “thở” trong môi trường mát lành, tươi ngon suốt 9 ngày*.
          </Typography>
          <Box
            textAlign="center"
            mt={2}
          >
            <img src="https://shop.meatdeli.com.vn/_next/static/images/gioi-thieu-ve-winmart-3-d4e4e879928fbbd732a96ad97882be27.jpg" />
          </Box>
        </Stack>
        <Stack
          mt={2}
          mb={10}
        >
          <Box mb={2}>
            <RenderHighlightText title={'Thịt Sạch MEATDeli'} />
          </Box>
          <Box>
            <Typography
              variant="normal"
              fontSize={14}
              lineHeight={2}
              letterSpacing={1}
            >
              98% Bà nội trợ yêu thích thịt MEATDeli hơn thịt heo đang dùng (Theo kết quả nghiên cứu từ IPSOS)
              <br />
            </Typography>
            <Typography
              variant="normal"
              fontSize={14}
              lineHeight={2}
              letterSpacing={1}
            >
              Với Công Nghệ Oxy-Fresh 9 từ Châu Âu. Từ nay gia đình bạn có thể yên tâm về nguồn thịt heo tươi sạch, đảm
              bảo bữa ăn ngon, dinh dưỡng và an toàn cho các thành viên trong gia đình.
              <br />
            </Typography>
            <Typography
              variant="normal"
              fontSize={14}
              lineHeight={2}
              letterSpacing={1}
            >
              Các bà nội trợ từ nay có thể yên tâm thảnh thơi mua sắm tại các cửa hàng MEATDeli ở Hà Nội và Hồ Chí Minh.
              <br />
            </Typography>
            <Typography
              variant="normal"
              fontSize={14}
              lineHeight={2}
              letterSpacing={1}
            >
              Đi chợ online - Thịt giao tận nhà (Áp dụng tại khu vực Hồ Chí Minh & Hà Nội).
              <br />
            </Typography>
            <Typography
              variant="normal"
              fontSize={14}
              lineHeight={2}
              letterSpacing={1}
            >
              <RenderHighlightText title={'Freeship*'} /> cho đơn hàng trên <RenderHighlightText title={'300.000đ'} />
            </Typography>
          </Box>
          <Box
            textAlign="center"
            mt={3}
          >
            <img src="https://shop.meatdeli.com.vn/_next/static/images/gioi-thieu-ve-winmart-5-23d72047b75a4954cbf63486fa8c422c.jpg" />
          </Box>
        </Stack>
      </Container>
    </>
  );
}
