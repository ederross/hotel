import React from 'react';
import OffersAccordion from '../OffersAccordion';

import { AnimatePresence, motion } from 'framer-motion';

import styles from './styles.module.scss';

interface IOffersRoomModal {
  handleOpenMobileOffersModal: () => void;
}

const OffersRoomModal = ({ handleOpenMobileOffersModal }: IOffersRoomModal) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          animate="visible"
          exit={{ y: 1000 }}
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
          <div
            onClick={handleOpenMobileOffersModal}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.6)',
            }}
          ></div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default OffersRoomModal;
