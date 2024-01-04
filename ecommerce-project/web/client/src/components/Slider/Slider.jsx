import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { slideActionThunk } from 'src/redux/actions/slider-action';
import Iconify from '../iconify';
import { BACKEND_URL } from 'src/utils/axios-instance';

const ArrowButton = () => (
  <StyleArrowButton>
    <div className="custom-swiper-button-next">
      <Iconify icon="ooui:next-ltr" />
    </div>
    <div className="custom-swiper-button-prev">
      <Iconify icon="ooui:next-rtl" />
    </div>
  </StyleArrowButton>
);

const Slider = () => {
  const dispatch = useDispatch();
  const { slides } = useSelector((x) => x.slides);

  useEffect(() => {
    dispatch(slideActionThunk.getAllSildes());
  }, [dispatch]);

  const params = {
    navigation: {
      nextEl: '.custom-swiper-button-next', // Lớp CSS cho nút next
      prevEl: '.custom-swiper-button-prev', // Lớp CSS cho nút prev
    },
    pagination: {
      dynamicBullets: true,
      clickable: true,
    },
    loop: true,
    modules: [Navigation, Pagination, Autoplay],
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 700,
    className: 'Carousel-swiper',
  };

  return (
    <Box marginBottom={2}>
      <StyleSwiper {...params}>
        {slides.map((item, index) => (
          <SwiperSlide
            key={`${item.name}-${index}`}
            style={{
              width: '100%',
              height: 'auto',
            }}
          >
            <Link to={item.url} style={{ width: '100%', height: '100%' }}>
              <img
                srcSet={`${BACKEND_URL}images/banners${item.image} 2x`}
                alt={item.name}
                loading="lazy"
              />
            </Link>
          </SwiperSlide>
        ))}
        <ArrowButton />
      </StyleSwiper>
    </Box>
  );
};

export default Slider;

const StyleArrowButton = styled.div`
  .custom-swiper-button-next,
  .custom-swiper-button-prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background-color: #808080cc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    font-size: 26px;
    @media (min-width: 375px) and (max-width: 768px) {
      width: 10px;
      height: 10px;
      font-size: 5px;
    }
  }

  .custom-swiper-button-prev {
    left: 2.5rem; /* Điều chỉnh vị trí nút prev */
  }

  .custom-swiper-button-next {
    right: 2.5rem; /* Điều chỉnh vị trí nút next */
  }
`;

const StyleSwiper = styled(Swiper)`
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }
  .swiper-pagination-bullet-active {
    background-color: #000;
  }
`;
