import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import CarouselHolder from '../common/CarouselHolder';
import { Room } from '../../../data/room';
import { useRouter } from 'next/router';
import { currency } from '../../utils/currency';
import { AmenitieDisplay } from '../common/AmenitieDisplay';
import { Counter } from '../common/Counter';
import { AppStore } from '../../store/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddProductToCart,
  RemoveProductToCart,
} from '../../store/ducks/cart/actions';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { IconImportDynamically } from '../common/ComponentWithIcon';

interface ICardRoom {
  room: Room;
  setSelectedRoom: React.Dispatch<React.SetStateAction<Room>>;
  isResultOneRoom?: boolean;
}

const CardRoom = ({ room, setSelectedRoom, isResultOneRoom }: ICardRoom) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation('common');

  const { startDate, endDate, adults, children }: any = router.query;

  const {
    cart: { objects },
  } = useSelector((state: AppStore) => state);

  const currentRoom = objects?.find((r) => r.objectId === room.objectId);

  const [quantity, setQuantity] = useState(
    currentRoom?.prices[0]?.quantity || 0
  );

  const imageData = room?.images?.map((i) => {
    return {
      alt: i.subTitle,
      title: i.subTitle,
      url: i.imageUrl,
    };
  });

  const handleDetails = () => {
    setSelectedRoom(room);
    // router.push(`/objects/${room?.objectId}`);
    window?.scrollTo(0, 0);
  };

  const mainPrice = room?.prices && room?.prices[0];
  const formattedValue = currency(mainPrice?.regularTotalAmount);

  const cartItem = room && {
    objectId: room?.objectId,
    identificationCode: '',
    prices: [
      {
        quoteId: room?.prices[0]?.quoteId,
        regularTotalAmount: room?.prices
          ? room?.prices[0]?.regularTotalAmount
          : 0,
        quantity: quantity,
        checkIn: startDate,
        checkOut: endDate,
        priceDescription: room?.prices[0].priceDescription,
        taxes: room?.prices[0]?.taxes || [],
        fees: room?.prices[0]?.fees || [],
        travelers: {
          adults,
          childrens: children,
          ages: [],
        },
      },
    ],
    infos: {
      adults: parseInt(adults),
      children: parseInt(children),
      image: room?.images[0]?.imageUrl,
      objectName: room?.objectName,
    },
  };

  useEffect(() => {
    if (quantity > 0) {
      dispatch(AddProductToCart(cartItem));
    } else {
      dispatch(RemoveProductToCart(room?.objectId));
    }
  }, [quantity]);

  useEffect(() => {
    if (currentRoom?.prices[0]?.quantity > 0) {
      setQuantity(currentRoom?.prices[0]?.quantity);
    } else {
      setQuantity(0);
    }
  }, [currentRoom, room]);

  return (
    <>
      <motion.a
        // initial={{ scale: 0.99 }}
        // animate={{ scale: 1 }}
        // transition={{ duration: 0.1 }}
        // whileTap={{ scale: 0.99 }}
        className={styles.container}
        style={{ maxWidth: isResultOneRoom ? 364 : '100%' }}
        onClick={handleDetails}
      >
        <CarouselHolder
          discont={mainPrice?.discountPercentage}
          data={imageData}
          styleImageComponent={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            height: 456,
          }}
        />
        <div className={styles.iconsContainerHolder}>
          {room?.objectDetails?.sleepArrangements?.map((arrangement, index) => (
            <div
              className={styles.iconWithNumberContainer}
              key={index}
              title={arrangement?.bedName}
            >
              <IconImportDynamically
                iconName={arrangement?.displayIconTypeCode}
                size={20}
              />
              <h5>{arrangement?.bedQuantity}</h5>
            </div>
          ))}
        </div>

        <h2>{room?.objectName}</h2>

        <p>{room?.objectDescription.substring(0, 56)}...</p>

        <div className={styles.amenitiesContainer}>
          {room?.amenities?.map((item, index) => (
            <AmenitieDisplay
              key={index}
              resume
              amenitie={item}
              direction={'column'}
            />
          ))}
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.priceAndControlsContainerHolder}
        >
          <div className={styles.pricesInfos}>
            {mainPrice?.promotionTotalAmount > 0 && (
              <s>
                <h6>{currency(mainPrice?.promotionTotalAmount)}</h6>
              </s>
            )}
            <h4>
              {formattedValue.split(',')[0]}
              <span className={styles.cents}>
                ,{formattedValue.split(',')[1]}
              </span>{' '}
              <span style={{ marginLeft: '0.4rem' }}>
                {mainPrice?.nightQty} {t('nights')}
              </span>
            </h4>
            {room?.prices?.length > 1 && (
              <u style={{ cursor: 'pointer' }} onClick={handleDetails}>
                <h5>+{room?.prices?.length - 1 + ' ' + t('offers')}</h5>
              </u>
            )}
          </div>
          <Counter
            quantity={quantity}
            setQuantity={setQuantity}
            max={room?.quantity}
          />
        </div>
      </motion.a>
    </>
  );
};

export default CardRoom;
