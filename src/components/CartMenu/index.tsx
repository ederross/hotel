import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { currency } from '../../utils/currency';

import styles from './styles.module.scss';
import { AppStore } from '../../store/types';
import { CleanCart } from '../../store/ducks/cart/actions';
import { Tty } from '@mui/icons-material';

interface ICartMenu {
  openCart: boolean;
}

const CartMenu = ({ openCart }: ICartMenu) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const {
    cart: { rooms, services },
  } = useSelector((state: AppStore) => state);

  const handleCleanCart = () => dispatch(CleanCart());

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.2,
      },
      display: 'block',
    },
    exit: {
      opacity: 0,
      rotateX: -20,
      transition: {
        duration: 0.2,
        delay: 0.1,
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };

  return (
    <>
      <motion.div
        className={styles.subMenu}
        initial="exit"
        animate={openCart ? 'enter' : 'exit'}
        variants={subMenuAnimate}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {rooms.length > 0 && (
          <h3 className={styles.servicesTitle}>{t('Quartos')}</h3>
        )}
        {rooms.map((room, index) => (
          <div key={index} className={styles.roomContainer}>
            <div className={styles.imageRoomHolder}>
              <Image src={room?.image} layout={'fill'} />
            </div>

            <div className={styles.roomInfo}>
              <div className={styles.roomNameAdultChildContainer}>
                <h5>
                  {room.adults} {t('adult', { count: room.adults })} {'&'}{' '}
                  {room.adults} {t('children', { count: room.children })}
                </h5>
                <h4>{room.objectName}</h4>
              </div>

              <div className={styles.roomQtndPriceContainer}>
                <h5>{room.quantity + ' ' + t('room')} </h5>
                <h4>{currency(room.price)}</h4>
              </div>
            </div>
          </div>
        ))}

        {rooms && services.length > 0 && (
          <div className={styles.divisorContainer} style={{ margin: '20px 0' }}>
            <div></div>
          </div>
        )}

        {services.length > 0 && (
          <h3 className={styles.servicesTitle}>{t('Serviços')}</h3>
        )}
        {services.map((room, index) => (
          <div key={index} className={styles.roomContainer}>
            <div className={styles.row}>
              <h4>{room.serviceName}</h4>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  flexDirection: 'column',
                }}
              >
                <h6>x{room.quantity}</h6>
                <h5>{currency(room.price)}</h5>
              </div>
            </div>
          </div>
        ))}

        {(services?.length > 0 || rooms?.length > 0) && (
          <div
            style={{ marginTop: '1.5rem' }}
            className={styles.buttonSeeMoreRoomsContainer}
            onClick={handleCleanCart}
          >
            <button>{t('clearAll')}</button>
          </div>
        )}

        {rooms && rooms.length > 0 && (
          <motion.button
            id={'button'}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            whileTap={{ scale: 0.9 }}
            className={styles.confirmBtn}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {t('checkout')}
          </motion.button>
        )}

        {rooms && rooms.length === 0 && services && services.length === 0 && (
          <div className={styles.emptyMessageContainer}>
            <h4>Seu carrinho está vazio</h4>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CartMenu;
