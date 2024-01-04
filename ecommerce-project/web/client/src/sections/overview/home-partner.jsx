import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

const dataPartner = [
  {
    id: 1,
    name: 'kfc',
    img: 'kfc.jpg',
  },
  {
    id: 2,
    name: 'daesang',
    img: 'daesang.jpg',
  },
  {
    id: 3,
    name: 'golden-gate',
    img: 'golden-gate.png',
  },
  {
    id: 4,
    name: 'hi',
    img: 'hi.jpg',
  },
  {
    id: 5,
    name: 'jollibee',
    img: 'jollibee.jpg',
  },
  {
    id: 6,
    name: 'lotteria',
    img: 'lotteria.jpg',
  },
  {
    id: 7,
    name: 'popeyes',
    img: 'popeyes.jpg',
  },
  {
    id: 8,
    name: 'noibai-catering-services',
    img: 'noibai-catering-services.jpg',
  },
  {
    id: 9,
    name: 'texas',
    img: 'texas.jpg',
  },
  {
    id: 10,
    name: 'truong-food',
    img: 'truong-food.jpg',
  },
];

const HomePartner = () => (
  <Box height="200px" width="100%" mb={16} mt={5} borderTop="1px solid #b0b0b0">
    <Typography variant="h3" textAlign="center" mb={2} mt={2}>
      CÁC ĐỐI TÁC CỦA MEATDELI
    </Typography>
    <StyleSwiper
      slidesPerView={3}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation]}
      loop
      speed={700}
      navigation
    >
      {dataPartner.map((item) => (
        <StyleSwiperSlide key={item.id}>
          <Box width="70%">
            <StyleImg alt={item.name} src={`/assets/images/partners/${item.img}`} />
          </Box>
        </StyleSwiperSlide>
      ))}
    </StyleSwiper>
  </Box>
);

export default HomePartner;

const StyleImg = styled.img`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const StyleSwiperSlide = styled(SwiperSlide)`
  display: flex !important;
  align-items: center;
  justify-content: center;
`;

const StyleSwiper = styled(Swiper)`
  .swiper-button-prev,
  .swiper-button-next {
    color: black;
  }
`;
