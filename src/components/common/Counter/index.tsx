import React from 'react';
import { RemoveOutlined, Add } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss';

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
        style={{ opacity: quantity === 0 ? 0.4 : 1 }}
      >
        <RemoveOutlined className={styles.removeIcon} />
      </button>
      <h5>{quantity}</h5>
      <button
        onClick={handleAdd}
        style={{ opacity: quantity === max ? 0.4 : 1 }}
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
