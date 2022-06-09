import React from 'react';

import styles from './styles.module.scss';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import SingleBedOutlinedIcon from '@mui/icons-material/SingleBedOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

import {
  SignalWifi4BarOutlined,
  TvOutlined,
  LocalPhoneOutlined,
} from '@mui/icons-material';
import styled from 'styled-components';
import CarouselHolder from '../common/CarouselHolder';

const imagesData = [
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1157&q=80',
];

const CardRoom = () => {
  return (
    <>
      {/* <CardDiv> */}
        <div className={styles.container}>
          <div className={styles.containerCarousel}>
            <CarouselHolder data={imagesData} />
          </div>
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
      {/* </CardDiv> */}
    </>
  );
};


export default CardRoom;
