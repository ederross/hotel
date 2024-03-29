import React from 'react';
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../store/types';
import { IconImportDynamically } from '../ComponentWithIcon';

interface IAmenitiDisplayProps {
  showTitle?: boolean;
  direction?: 'row' | 'column';
  resume?: boolean;
  style?: any;
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
  resume = false,
  style,
}: IAmenitiDisplayProps) => {
  const { t } = useTranslation('common');
  const amenitiesList = amenitie?.Amenities.slice(
    0,
    resume ? 3 : amenitie.Amenities.length
  );

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
          style={{ flexDirection: direction, ...style }}
          title={GetAmenitieFromDomain(item.amenityTypeCode)}
          key={index}
        >
          <IconImportDynamically
            iconName={item?.displayIconTypeCode}
            size={20}
          />
          {showTitle && (
            <h5 style={{ maxWidth: resume ? 72 : 120 }}>
              {t(GetAmenitieFromDomain(item.amenityTypeCode))}
            </h5>
          )}
        </div>
      ))}
    </>
  );
};
