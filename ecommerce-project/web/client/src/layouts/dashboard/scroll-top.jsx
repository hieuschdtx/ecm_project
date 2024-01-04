import { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify';
import styled from 'styled-components';

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);
  const height = 400;
  const handleScroll = () => {
    const scrollTop = window.screenY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > height);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ScrollButton onClick={scrollToTop} type="button" $visible={isVisible}>
      <Iconify icon="mdi:arrow-top-bold" width={40} />
    </ScrollButton>
  );
}

const ScrollButton = styled.button`
  position: fixed;
  top: 40%;
  right: 20px;
  background-color: #e4222e;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  display: ${(props) => (props.$visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease-in-out;
`;
