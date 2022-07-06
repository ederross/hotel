import React from 'react';
import { RemoveOutlined, Add } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss';

interface ICounterProps {
  quantity: number;
  setQuantity: any;
}

export const Counter = ({ quantity = 0, setQuantity }: ICounterProps) => {
  const { t } = useTranslation('common');

  const handleRemove = () => quantity > 0 && setQuantity(quantity - 1);
  const handleAdd = () => quantity < 1000 && setQuantity(quantity + 1);

  return (
    <div className={styles.addButtons}>
      <button onClick={handleRemove}>
        <RemoveOutlined className={styles.removeIcon} />
      </button>
      <h5>{quantity}</h5>
      <button onClick={handleAdd}>
        <Add className={styles.addIcon} />
      </button>
    </div>
  );
};
