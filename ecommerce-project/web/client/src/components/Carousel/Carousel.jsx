import { Avatar, Box, Typography } from '@mui/material';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useResponsive } from 'src/hooks/use-responsive';
import { Link } from 'react-router-dom';

const dataCarousel = [
  {
    id: 1,
    name: 'Premium',
    url: 'meatdeli-premium',
    image: 'carousel_1.jpg',
  },
  {
    id: 5,
    name: 'Chuẩn Ngon',
    url: 'meatdeli-chuan-ngon',
    image: 'carousel_3.jpg',
  },
  {
    id: 2,
    name: 'Thịt gà',
    url: 'thit-ga',
    image: 'carousel_2.jpg',
  },
  {
    id: 3,
    name: 'Sản phẩm chế biến',
    url: 'san-pham-che-bien',
    image: 'carousel_4.jpg',
  },
  {
    id: 4,
    name: 'Gà tươi ướp xốt',
    url: 'gà-tuoi-uóp-xót-tiẹn-lọi',
    image: 'carousel_3.jpg',
  },
];

const Carousel = () => {
  const lgUp = useResponsive('up', 'lg');
  return (
    <Box
      height="200px"
      width="100%"
      mb={2}
    >
      <StyleSwiper
        slidesPerView={!lgUp ? 2 : 5}
        pagination={{
          clickable: true,
        }}
      >
        {dataCarousel.map((item) => (
          <StyleSwiperSlide key={item.id}>
            <Box width="50%">
              <StyleLink to={`san-pham/${item.url}`}>
                <Avatar
                  alt={item.name}
                  src={`/assets/images/carousels/${item.image}`}
                  sx={{ width: '100%', height: '100%', margin: '0 auto' }}
                />
                <Typography variant="normal">{item.name}</Typography>
              </StyleLink>
            </Box>
          </StyleSwiperSlide>
        ))}
      </StyleSwiper>
    </Box>
  );
};

export default Carousel;

const StyleSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  background-color: #e4222e;
`;

const StyleSwiperSlide = styled(SwiperSlide)`
  display: flex !important;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #8b8b8b99;
`;

const StyleLink = styled(Link)`
  color: white;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  text-decoration: none;
  &:hover {
    color: black;
  }
`;
