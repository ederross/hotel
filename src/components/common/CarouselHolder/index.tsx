import React, { useEffect, useRef, useState } from 'react';

import { ChevronLeft, ChevronRight } from 'react-feather';
import ImageComponent from '../ImageComponent';
import { CarouselHolderStyles } from './styles';

interface ICaroselHolder {
  data: imageData[] | null;
  showArrows?: boolean;
  setSelected?: React.Dispatch<React.SetStateAction<number>>;
}

interface imageData {
  url: string;
  title: string;
  alt: string;
}

const CarouselHolder = ({
  data,
  showArrows = true,
  setSelected,
}: ICaroselHolder) => {
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

  useEffect(() => {
    setSelected && setSelected(currSlide);
  }, [currSlide]);

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
        {data?.map((image, index) => (
          <ImageComponent
            key={index}
            url={image?.url}
            title={image?.title}
            alt={image?.alt}
          />
        ))}
      </div>

      {data?.length > 1 && (
        <div className="scroller">
          {data?.map((img, idx) => (
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
