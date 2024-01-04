import PropTypes from 'prop-types';
import { useState } from 'react';
import { FreeMode, Thumbs } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styled from '@emotion/styled';
import { primary } from 'src/theme/palette';
import { BACKEND_URL } from 'src/utils/axios-instance';

export default function ProductGallery({ thumbnails, avatar }) {
  const thumbnailProduct = thumbnails ? JSON.parse(thumbnails) : [];
  const galleryProduct = [{ file_name: avatar }, ...thumbnailProduct];
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <GalleryImage>
      <AvatarStyle
        spaceBetween={10}
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        className="product-gallery"
      >
        {galleryProduct.map((item, index) => (
          <SwiperSlide key={`slide-${index}`}>
            <img
              src={`${BACKEND_URL}images/products${item.file_name}`}
              alt=""
              width="100%"
            />
          </SwiperSlide>
        ))}
      </AvatarStyle>
      <GalleryStyle
        onSwiper={setThumbsSwiper}
        slidesPerView={galleryProduct.length}
        freeMode
        watchSlidesProgress
        modules={[Thumbs, FreeMode]}
        className="product-gallery-thumbnail"
      >
        {galleryProduct.map((item, index) => (
          <SwiperSlide key={`slide-${index}`}>
            <img
              src={`${BACKEND_URL}images/products${item.file_name}`}
              alt=""
            />
          </SwiperSlide>
        ))}
      </GalleryStyle>
    </GalleryImage>
  );
}

ProductGallery.propTypes = {
  thumbnails: PropTypes.any,
  avatar: PropTypes.any,
};

const GalleryImage = styled.div`
  max-width: 360px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  .product-gallery-thumbnail .swiper-slide-thumb-active {
    /* border: ${`2px solid ${primary.red}`}; */
    transform: scale(1.1);
  }
  .product-gallery-thumbnail {
    box-sizing: border-box;
  }
`;

const AvatarStyle = styled(Swiper)`
  width: 100%;
  display: flex;
`;

const GalleryStyle = styled(Swiper)`
  max-width: 360px;

  .swiper-slide {
    width: 70px;
    padding: 0 3px;
  }
`;
