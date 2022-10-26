import { CloseOutlined, Delete } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Room, RoomImages } from '../../../data/room';
import { useWindowSize } from '../../hooks/UseWindowSize';
import CarouselHolder from '../common/CarouselHolder';

import styles from './styles.module.scss';

interface ICartModal {
  room: Room;
  data: RoomImages[];
  close: () => void;
}

export const PhotosModal = ({ close, data, room }: ICartModal) => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  const dispatch = useDispatch();

  // Window Sizes
  const size = useWindowSize();

  const imageData = data?.map((image) => {
    return {
      url: image?.imageUrl,
      title: image?.subTitle,
      alt: image?.subTitle,
    };
  });

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
            <h3 className={styles.modalTitle}>
              {room?.objectName || t('Galery')}
            </h3>
            <CloseOutlined onClick={close} className={styles.closeButton} />
          </div>{' '}
          <div className={styles.contentContainer}>
            <CarouselHolder data={imageData} />
          </div>
        </div>
        <div
          onClick={close}
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
