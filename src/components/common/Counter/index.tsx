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

  const handleRemove = (e) => {
    e.stopPropagation();
    quantity > 0 && setQuantity(quantity - 1);
  };
  const handleAdd = (e) => {
    e.stopPropagation();
    quantity < 1000 && setQuantity(quantity + 1);
  };

  return (
    <div className={styles.addButtons}>
      <button onClick={handleRemove} style={{  border: quantity < 1 && '1px solid #EDEDED' }}>
        <RemoveOutlined
          className={styles.removeIcon}
          style={{ color: quantity < 1 && '#EDEDED' }}
        />
      </button>
      <h5>{quantity}</h5>
      <button onClick={handleAdd}>
        <Add className={styles.addIcon} />
      </button>
    </div>
  );
};
