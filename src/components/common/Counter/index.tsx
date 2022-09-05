import React from 'react';
import { RemoveOutlined, Add } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss';
import { toast } from 'react-toastify';
import { useWindowSize } from '../../../hooks/UseWindowSize';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../store/types';

interface ICounterProps {
  quantity: number;
  setQuantity: any;
  max?: number;
}

export const Counter = ({
  quantity = 0,
  setQuantity,
  max = 100,
}: ICounterProps) => {
  const { t } = useTranslation('common');

  const handleRemove = (e) => {
    e.stopPropagation();
    quantity > 0 && setQuantity(quantity - 1);
  };
  const handleAdd = (e) => {
    e.stopPropagation();

    quantity < max && setQuantity(quantity + 1);
  };

  return (
    <div className={styles.addButtons}>
      <button
        onClick={handleRemove}
        style={{ border: quantity < 1 && '1px solid #EDEDED' }}
      >
        <RemoveOutlined
          className={styles.removeIcon}
          style={{ color: quantity < 1 && '#EDEDED' }}
        />
      </button>
      <h5>{quantity}</h5>
      <button
        onClick={handleAdd}
        title={
          max !== 1
            ? `${max} reservas disponíveis`
            : `${max} reserva disponível`
        }
      >
        <Add className={styles.addIcon} />
      </button>
    </div>
  );
};
