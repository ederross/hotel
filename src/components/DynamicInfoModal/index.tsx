import { CloseOutlined, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from '../../hooks/UseWindowSize';
import {
  CleanCart,
  RemoveProductToCart,
  RemoveServiceToCart,
} from '../../store/ducks/cart/actions';
import { AppStore } from '../../store/types';
import { currency } from '../../utils/currency';

import styles from './styles.module.scss';

interface ICartModal {
  handleCloseDynamicInfo: () => void;
  isCheckoutSeeAllData?: boolean;
}

const DynamicInfoModal = ({
  handleCloseDynamicInfo,
  isCheckoutSeeAllData,
}: ICartModal) => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  const dispatch = useDispatch();

  // Window Sizes
  const size = useWindowSize();

  return (
    <>
      <div
        className={styles.modalContainer}
        style={{
          padding: size.width > 868 && '2rem',
        }}
      >
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>{t('taxFees')}</h3>
            <CloseOutlined
              onClick={handleCloseDynamicInfo}
              className={styles.closeButton}
            />
          </div>{' '}
          <div className={styles.contentContainer}></div>
        </div>
        <div
          onClick={handleCloseDynamicInfo}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 11,
            background: 'rgba(0,0,0,0.5)',
          }}
        ></div>
      </div>
    </>
  );
};

export default DynamicInfoModal;
