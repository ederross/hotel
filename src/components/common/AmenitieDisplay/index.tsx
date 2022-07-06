import React from 'react';
import { TvOutlined, WifiOutlined, BathtubOutlined } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss';

interface IAmenitiDisplayProps {
  showTitle?: boolean;
  direction?: 'row' | 'column';
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

export const AmenitieDisplay = ({
  amenitie,
  showTitle = true,
  direction = 'row',
}: IAmenitiDisplayProps) => {
  const { t } = useTranslation('common');
  const card = amenitie?.Amenities ? amenitie?.Amenities[0] : null;

  return (
    <div className={styles.amenitie} style={{ flexDirection: direction }}>
      {card?.displayIcon === 'wifi_ico' ? (
        <WifiOutlined fontSize={'small'} />
      ) : card?.displayIcon === 'bath_ico' ? (
        <BathtubOutlined fontSize={'small'} />
      ) : (
        <TvOutlined fontSize={'small'} />
      )}
      {showTitle && <h5>{t(card?.customName)}</h5>}
    </div>
  );
};
