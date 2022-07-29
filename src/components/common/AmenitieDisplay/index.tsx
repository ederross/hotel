import React from 'react';
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../store/types';
import { IconDisplay } from '../IconDisplay';

interface IAmenitiDisplayProps {
  showTitle?: boolean;
  direction?: 'row' | 'column';
  amenitie: {
    amenityGroupTypeCode: number;
    sequenceOrder: number;
    Amenities: [
      {
        amenityTypeCode: number;
        displayIconTypeCode: number;
        active: boolean;
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
  const amenitiesList = amenitie?.Amenities.slice(0, 1);

  const {
    domain: { amenitiesDomain },
  } = useSelector((state: AppStore) => state);

  const GetAmenitieFromDomain = (amenityTypeCode: number) =>
    amenitiesDomain.data.find((i) => i.domainItemCode === amenityTypeCode)
      ?.domainItemValue || 'Undefined';

  return (
    <>
      {amenitiesList?.map((item, index) => (
        <div
          className={styles.amenitie}
          style={{ flexDirection: direction }}
          title={GetAmenitieFromDomain(item.amenityTypeCode)}
          key={index}
        >
          <IconDisplay displayIconTypeCode={item.displayIconTypeCode} />
          {showTitle && (
            <h5>{t(GetAmenitieFromDomain(item.amenityTypeCode))}</h5>
          )}
        </div>
      ))}
    </>
  );
};
