import React from 'react';

import styles from './styles.module.scss';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import SingleBedOutlinedIcon from '@mui/icons-material/SingleBedOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

import {
  SignalWifi4BarOutlined,
  TvOutlined,
  LocalPhoneOutlined,
  RemoveOutlined,
  Add,
} from '@mui/icons-material';
import CarouselHolder from '../common/CarouselHolder';
import { Room } from '../../../data/room';

interface ICardRoom {
  room: Room;
}

const CardRoom = ({ room }: ICardRoom) => {
  // const imageData = room?.images?.map((i) => {
  //   return {
  //     alt: i.subTitle,
  //     title: i.subTitle,
  //     url: i.imageUrl,
  //   };
  // });
  return (
    <>
      {/* <CardDiv> */}
      <div className={styles.container}>
        <div className={styles.containerCarousel}>
          <CarouselHolder data={imageData} />
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
            <h5>{room?.objectDetails?.maxOccupancy}</h5>
          </div>
        </div>

        <h2>{room?.objectName}</h2>

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
            <button disabled>
              <RemoveOutlined className={styles.removeIcon} />
            </button>
            <h5>0</h5>
            <button>
              <Add className={styles.addIcon} />
            </button>
          </div>
        </div>
      </div>
      {/* </CardDiv> */}
    </>
  );
};

export default CardRoom;

const imageData = [
  {
    url: 'https://images.unsplash.com/photo-1604156788856-2ce5f2171cce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'balões',
    alt: 'balões',
  },
  {
    url: 'https://images.unsplash.com/photo-1559686043-aef1bbc98d19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'balões',
    alt: 'balões',
  },
  {
    url: 'https://images.unsplash.com/photo-1514923995763-768e52f5af87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    title: 'balões',
    alt: 'balões',
  },
];
