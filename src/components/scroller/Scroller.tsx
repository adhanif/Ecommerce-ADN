import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import IconButton from '@mui/material/IconButton';
import styled from '@emotion/styled';

interface StyledBoxProps {
  isVisible: boolean;
}

const StyledScrollBox = styled.div<StyledBoxProps>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
`;

const Scroller = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = debounce(() => {
    const scrollTop = window.scrollY;
    const threshold = 200;
    setIsVisible(scrollTop > threshold);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <StyledScrollBox isVisible={isVisible}>
        <IconButton color='inherit' onClick={handleScrollToTop}>
          <ArrowCircleUpIcon sx={{ fontSize: '2.3rem' }} />
        </IconButton>
      </StyledScrollBox>
    </>
  );
};

export default Scroller;
