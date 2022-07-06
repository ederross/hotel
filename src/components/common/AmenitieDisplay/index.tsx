import React from 'react';
import { TvOutlined, WifiOutlined, BathtubOutlined } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss';

interface IAmenitiDisplayProps {
  amenitie: {
    amenityGroupTypeCode: number;
    sequenceOrder: number;
    Amenities: [
      {
        amenityTypeCode: number;
        displayIcon: string;
        displayIconTypeCode: number;
        active: boolean;
        customName: string;
      }
    ];
  };
}

export const AmenitieDisplay = ({ amenitie }: IAmenitiDisplayProps) => {
  const { t } = useTranslation('common');
  const card = amenitie?.Amenities[0];

  return (
    <div className={styles.amenitie}>
      {card?.displayIcon === 'wifi_ico' ? (
        <WifiOutlined fontSize={'small'} />
      ) : card?.displayIcon === 'bath_ico' ? (
        <BathtubOutlined fontSize={'small'} />
      ) : (
        <TvOutlined fontSize={'small'} />
      )}
      <h5>{t(card.customName)}</h5>
    </div>
  );
};
