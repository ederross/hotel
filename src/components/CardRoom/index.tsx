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
  'https://a0.muscache.com/im/pictures/cd391355-1202-413b-be7a-30c7406f9dac.jpg?im_w=720',
  'https://a0.muscache.com/im/pictures/b4c9bf9d-c5d3-4edf-8098-6ad7a5468674.jpg?im_w=720',
  'https://a0.muscache.com/im/pictures/ca866ac8-0440-4d05-836f-2c99f9ec4c54.jpg?im_w=720',
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
            Ar-condicionado, cama box, TV a cabo, mesa de trabalho, frigobar,
            banheiro privativo, água com aquecimento central...{' '}
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
              <s>
                <h6>R$ 200</h6>
              </s>
              <h4>
                R$ 100 <span>3 noites</span>
              </h4>
              <u>
                <h5>+2 ofertas</h5>
              </u>
            </div>
            <div className={styles.addButtons}>
              <button>-</button>
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
  margin-bottom: 4rem;

  display: flex;
  flex-direction: column;

  width: 100%;
  position: relative;

  .carousel {
    position: relative;
    width: 100%;
    display: fix;
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

  .details {
    padding: 1rem 0.25rem;
    transition: transform 0.2s;
    width: 100%;
  }

  svg.heart {
    height: 1.5rem;
    position: absolute;
    z-index: 2;
    right: 1rem;
    top: 1rem;
    transition: all 0.2s;
    color: #fff;
    &.liked {
      stroke: var(--red);
      fill: var(--red);
      filter: drop-shadow(0 0.15rem 0.25rem #0008);
    }
  }
  .rating {
    display: flex;
    align-items: center;
    width: fit-content;
    margin-bottom: 0.25rem;
    small {
      color: #889;
      font-size: 100%;
      margin-left: 0.25rem;
    }
    svg {
      stroke: none;
      fill: var(--red);
      height: 1rem;
      margin-right: 0.25rem;
    }
  }
  .subtitle {
    font-size: 1rem;
  }
  h2 {
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0.25rem 0 0.5rem;
    line-height: 1.2;
  }
  .price {
    font-weight: 700;
    font-size: 1.15rem;
    small {
      font-weight: 400;
    }
  }
  .description,
  .total {
    display: none;
    color: #889;
  }

  &:hover {
    

    .img img {
      transform: scale(1.05);
    }
    .details {
      transform: scale(0.95);
    }
  }

  @media (min-width: 48rem) {
    display: flex;
    gap: 1.5rem;

    .carousel {
      flex: 0 0 300px;
    }
    .details {
      padding-right: 1rem;
    }
    .description {
      display: block;
      margin-bottom: 1rem;
    }
    .subtitle,
    .description {
      display: flex;
    }
    .price {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: flex-end;
      & .total {
        font-weight: 400;
        font-size: 0.85rem;
        color: #889;
        display: inline-block;
      }
    }
    .rating {
      position: absolute;
      bottom: 0.75rem;
      margin-left: -0.5rem;
    }
    svg.heart {
      color: var(--dark);
      &.liked {
        filter: none;
      }
    }
    .scroller {
      left: 150px;
      bottom: -1.5rem;
      span {
        box-shadow: 0 1px 2px #000;
      }
    }
    &:hover {
      background: var(--white);
      box-shadow: 0 0.5rem 1rem #48484810;

      .carousel {
        transform: scale(0.93);
      }
      .img img {
        transform: scale(1);
      }
      .details {
        transform: scale(1);
      }
    }
  }
`;

export default CardRoom;
