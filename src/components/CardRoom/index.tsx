import React, { useState } from 'react';

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
import { useRouter } from 'next/router';
import { currency } from '../../utils/currency';
import { AmenitieDisplay } from '../common/AmenitieDisplay';
import { Counter } from '../common/Counter';

interface ICardRoom {
  room: Room;
}

const CardRoom = ({ room }: ICardRoom) => {
  const router = useRouter();

  const [quantity, setQuantity] = useState(0);

  const imageData = room?.images?.map((i) => {
    return {
      alt: i.subTitle,
      title: i.subTitle,
      url: i.imageUrl,
    };
  });

  const handleDetails = () => {
    router.push(`/rooms/${room?.objectId}`);
  };

  const formattedValue = currency(999.99);

  return (
    <>
      <a className={styles.container} onClick={handleDetails}>
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
          {/* <span>Ler mais</span> */}
        </p>

        <div className={styles.amenitiesContainer}>
          {room?.amenities?.map((item, index) => (
            <AmenitieDisplay key={index} amenitie={item} direction={'column'} />
          ))}
        </div>

        <div className={styles.priceAndControlsContainerHolder}>
          <div className={styles.pricesInfos}>
            <s>
              <h6>R$ 200</h6>
            </s>
            <h4>
              {formattedValue.split(',')[0]}
              <span className={styles.cents}>
                ,{formattedValue.split(',')[1]}
              </span>{' '}
              <span style={{ marginLeft: '0.4rem' }}>3 noites</span>
            </h4>
            <u>
              <h5>+2 ofertas</h5>
            </u>
          </div>
          <Counter quantity={quantity} setQuantity={setQuantity} />
        </div>
      </a>
    </>
  );
};

export default CardRoom;
