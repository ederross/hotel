import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ChevronLeft, ChevronRight } from 'react-feather';
import ImageComponent from '../ImageComponent';

interface ICaroselHolder {
  data: string[];
  showArrows?: boolean;
}

const CarouselHolder = ({ data, showArrows = true }: ICaroselHolder) => {
  const imagesRef = useRef(null);
  const [currSlide, setCurrSlide] = useState(0);

  const scrollToImage = (index) => {
    imagesRef.current.scrollLeft = imagesRef.current.offsetWidth * index;
  };

  const handleScroll = (e) =>
    setCurrSlide(Math.round(e.target.scrollLeft / e.target.offsetWidth));

  useEffect(() => {
    const imagesRefCurr = imagesRef.current;
    imagesRefCurr.addEventListener('scroll', handleScroll);
    return () => imagesRefCurr.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <CarouselHolderStyles>
      {showArrows && (
        <div className="arrowContainer">
          {currSlide > 0 && (
            <div
              className="arrowBtnLeft"
              onClick={() => scrollToImage(currSlide - 1)}
            >
              <ChevronLeft width={18} height={18} />
            </div>
          )}

          {currSlide < data.length - 1 && (
            <div
              className="arrowBtnRight"
              onClick={() => scrollToImage(currSlide + 1)}
            >
              <ChevronRight width={18} height={18} />
            </div>
          )}
        </div>
      )}
      <div ref={imagesRef} className="carousel">
        {data.map((url, index) => (
          <ImageComponent key={index} url={url} />
        ))}
      </div>

      {data?.length > 1 && (
        <div className="scroller">
          {data.map((img, idx) => (
            <span
              key={idx}
              className={currSlide === idx ? 'active' : null}
              onClick={(e) => {
                e.stopPropagation();
                scrollToImage(idx);
              }}
            ></span>
          ))}
        </div>
      )}
    </CarouselHolderStyles>
  );
};

export default CarouselHolder;

const CarouselHolderStyles = styled.div`
  transition: all 0.2s ease-in-out;
  height: 100%;

  display: flex;
  flex-direction: column;
  position: relative;

  .arrowBtnLeft {
    z-index: 999;
    cursor: pointer;
    position: absolute;
    display: flex;
    top: 50%;
    left: 5%;
    align-items: center;
    justify-content: center;
    width: fit-content;

    transition: 0.2s ease-in-out;
    box-shadow: 0 0.2rem 0.2rem rgb(165, 165, 165);
    width: 28px;
    height: 28px;
    border-radius: 100%;

    background-color: var(--light-text);
    opacity: 0.8;

    &:hover {
      opacity: 1;
      transform: scale(1.2);
      box-shadow: 0 0.2rem 0.2rem rgb(135, 135, 135);
    }
  }

  .arrowBtnRight {
    z-index: 999;
    cursor: pointer;
    position: absolute;
    display: flex;
    top: 50%;
    right: 5%;
    align-items: center;
    justify-content: center;
    width: fit-content;

    transition: 0.2s ease-in-out;
    box-shadow: 0 0.2rem 0.2rem rgb(165, 165, 165);
    width: 28px;
    height: 28px;
    border-radius: 100%;

    background-color: var(--light-text);
    opacity: 0.8;

    &:hover {
      opacity: 1;
      transform: scale(1.2);
      box-shadow: 0 0.2rem 0.2rem rgb(135, 135, 135);
    }
  }

  .carousel {
    position: relative;
    width: 100%;
    min-height: 232px;
    height: 100%;
    display: fixed;

    overflow-x: scroll;
    overflow-y: hidden;
    transition: all 0.2s;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar {
      display: none;
      -webkit-appearance: none;
    }

    img {
      transition: transform 0.2s;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  .scroller {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    width: fit-content;
    left: 50%;
    margin-top: -2rem;
    transform: translate(-50%, 0);

    &::-webkit-scrollbar {
      display: none;
      -webkit-appearance: none;
    }
    span {
      display: block;
      width: 0.3rem;
      height: 0.3rem;
      background: #fff;
      opacity: 0.5;
      transition: all 0.2s;
      margin: 1rem 0.25rem 0;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0.1rem 0.2rem #002;
    }
    span.active {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`;
