import React from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../store/types';
import MaterialIcon from '@material/react-material-icon';
import styles from './styles.module.scss';

interface IIconDisplayProps {
  displayIconTypeCode: number;
}

export const IconDisplay = ({ displayIconTypeCode }: IIconDisplayProps) => {
  const { t } = useTranslation('common');
  const {
    domain: { iconsDomain },
  } = useSelector((state: AppStore) => state);

  const icon =
    iconsDomain.data.find((i) => i.domainItemCode === displayIconTypeCode)
      ?.domainItemValue || 'menu';

  return <MaterialIcon icon={icon} className={styles.icon} />;
};
