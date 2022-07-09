import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { currency } from '../../utils/currency';

import styles from './styles.module.scss';

interface ICartMenu {
  openCart: boolean;
}

const CartMenu = ({ openCart }: ICartMenu) => {
  const { t } = useTranslation('common');
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
      opacity: 1,
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
        {rooms.map((room, index) => (
          <div key={index} className={styles.roomContainer}>
            <div className={styles.imageRoomHolder}>
              <Image
                src={
                  index === 1
                    ? 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
                    : index == 2
                    ? 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                    : 'https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                }
                layout={'fill'}
              />
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

        <div className={styles.divisorContainer} style={{ margin: '20px 0' }}>
          <div></div>
        </div>

        <h3 className={styles.servicesTitle}>Serviços</h3>
        {services.map((room, index) => (
          <div key={index} className={styles.roomContainer}>
            <div className={styles.row}>
              <h4>{room.objectName}</h4>
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

        <div
          style={{ marginTop: '1.5rem' }}
          className={styles.buttonSeeMoreRoomsContainer}
        >
          <button>{t('Limpar')}</button>
        </div>

        <motion.button
          id={'button'}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          whileTap={{ scale: 0.9 }}
          className={styles.confirmBtn}
          onClick={(e) => {
            e.stopPropagation();
            console.log('dasdsa');
          }}
        >
          {t('checkout')}
        </motion.button>
      </motion.div>
    </>
  );
};

const rooms = [
  {
    objectName: 'Standard',
    adults: 2,
    children: 1,
    quantity: 1,
    price: 98,
  },
  {
    objectName: 'Luxo',
    adults: 2,
    children: 2,
    quantity: 1,
    price: 125,
  }
];
const services = [
  {
    objectName: 'Passeio de balão',
    quantity: 2,
    price: 230,
  },
];

export default CartMenu;
