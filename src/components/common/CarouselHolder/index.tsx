import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ChevronLeft, ChevronRight } from 'react-feather';
import ImageComponent from '../ImageComponent';

interface ICaroselHolder {
  data: string[];
}

const CarouselHolder = ({ data }: ICaroselHolder) => {
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
      {currSlide > 0 && (
        <div className="btnGoBack" onClick={() => scrollToImage(currSlide - 1)}>
          <ChevronLeft width={18} height={18} />
        </div>
      )}

      {data.length - 1 !== currSlide && (
        <div className="btnGo" onClick={() => scrollToImage(currSlide + 1)}>
          <ChevronRight width={18} height={18} />
        </div>
      )}

      <div ref={imagesRef} className="carousel">
        {data.map((url, index) => (
          <ImageComponent key={index} url={url} index={0} />
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

  .btnGo {
    cursor: pointer;
    z-index: 99;
    position: absolute;
    top: 20%;
    right: 16px;

    display: none;
    align-self: flex-start;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    margin-bottom: 1rem;

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

  .btnGoBack {
    cursor: pointer;
    z-index: 99;
    position: absolute;
    top: 20%;
    left: 0;

    display: none;
    align-self: flex-start;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    margin-bottom: 1rem;

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

  &:hover {
    .btnGo,
    .btnGoBack {
      display: flex;
    }
  }

  .carousel {
    position: relative;
    width: 100%;
    height: 232px;
    display: fixed;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    overflow: scroll;
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
    position: absolute;
    z-index: 2;
    width: fit-content;
    left: 50%;
    transform: translate(-50%, -2rem);

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
      margin: 1rem 0.25rem;
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
