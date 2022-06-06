import React, { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import SingleBedOutlinedIcon from '@mui/icons-material/SingleBedOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

import {
  SignalWifi4BarOutlined,
  TvOutlined,
  LocalPhoneOutlined,
} from '@mui/icons-material';
import Image from 'next/image';
import styled from 'styled-components';

const imgSrc = [
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1157&q=80',
];

const CardRoom = () => {
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
    <>
      <CardDiv>
        <div className={styles.container}>
          <div ref={imagesRef} className="carousel">
            {imgSrc.map((url, index) => (
              <ImageComponent key={index} url={url} index={0} />
            ))}
          </div>
          {imgSrc?.length > 1 && (
            <div className="scroller">
              {imgSrc.map((img, idx) => (
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

          <div className={styles.iconsContainerHolder}>
            <div className={styles.iconWithNumberContainer}>
              <BedOutlinedIcon fontSize={'small'} />
              <h5>2</h5>
            </div>
            <div className={styles.iconWithNumberContainer}>
              <SingleBedOutlinedIcon fontSize={'small'} />
              <h5>1</h5>
            </div>
            <div className={styles.iconWithNumberContainer}>
              <PersonOutlinedIcon fontSize={'small'} />
              <h5>5</h5>
            </div>
          </div>

          <h2>Quarto Estofado suíte Deluxe</h2>

          <p>
            Ar-condicionado, cama box, TV a cabo, mesa de trabalho, frigobar...{' '}
            <span>Ler mais</span>
          </p>

          <div className={styles.amenitiesContainer}>
            <div className={styles.amenitie}>
              <TvOutlined fontSize={'small'} />
              <h5>TV</h5>
            </div>
            <div className={styles.amenitie}>
              <SignalWifi4BarOutlined fontSize={'small'} />
              <h5>Wi-Fi</h5>
            </div>
            <div className={styles.amenitie}>
              <LocalPhoneOutlined fontSize={'small'} />
              <h5>Telefone</h5>
            </div>
          </div>

          <div className={styles.priceAndControlsContainerHolder}>
            <div className={styles.pricesInfos}>
              {/* <s>
                <h6>R$ 200</h6>
              </s> */}
              <h4>
                R$ 100 <span>3 noites</span>
              </h4>
              {/* <u>
                <h5>+2 ofertas</h5>
              </u> */}
            </div>
            <div className={styles.addButtons}>
              <button disabled>-</button>
              <h5>0</h5>
              <button>+</button>
            </div>
          </div>
        </div>
      </CardDiv>
    </>
  );
};

const ImageComponent = ({ index, url }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`img ${loading ? 'loading' : null}`}>
      <Image
        layout="fill"
        objectFit="cover"
        src={`${url}`}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

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
    .img {
      flex: 0 0 100%;
      padding-bottom: 66.67%;
      position: relative;
      scroll-snap-align: start;

      &.loading {
        animation: shimmer 2s infinite;
        background: linear-gradient(
          to right,
          #eff1f3 4%,
          #e2e2e2 25%,
          #eff1f3 36%
        );
        background-size: 1000px 100%;
      }
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

export default CardRoom;
