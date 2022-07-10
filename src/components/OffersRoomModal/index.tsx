import React from 'react';
import OffersAccordion from '../OffersAccordion';

import { AnimatePresence, motion } from 'framer-motion';

import styles from './styles.module.scss';

interface IOffersRoomModal {
  openOffersModal: boolean;
  handleOpenMobileOffersModal: () => void;
}

const OffersRoomModal = ({
  openOffersModal,
  handleOpenMobileOffersModal,
}: IOffersRoomModal) => {
  const subMenuAnimate = {
    enter: {
      transform: 'translate(0, -10px)',
      transition: {
        duration: 0.2,
      },
      display: 'block',
    },
    exit: {
      transform: 'translate(0, 10px)',
      transition: {
        duration: 0.5,
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };

  return (
    <>
      <motion.div
        initial="exit"
        animate={openOffersModal ? 'enter' : 'exit'}
        variants={subMenuAnimate}
        className={styles.modalContainer}
      >
        <div className={styles.modal}>
          {/* <div className={styles.modalHeader}>
              <h3>Ofertas</h3>
            </div>{' '} */}
          <div className={styles.contentContainer}>
            <OffersAccordion />
          </div>
        </div>
      <motion.div
        variants={{
          enter: {
            opacity: 1,
            transition: {
              duration: 0.2,
            },
            display: 'block',
          },
          exit: {
            opacity: 0,
            transition: {
              duration: 0.2,
            },
            transitionEnd: {
              display: 'none',
            },
          },
        }}
        onClick={handleOpenMobileOffersModal}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 8,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.6)',
        }}
      ></motion.div>
      </motion.div>
    </>
  );
};

export default OffersRoomModal;
