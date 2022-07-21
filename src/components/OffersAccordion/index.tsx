import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { Add, RemoveOutlined } from '@mui/icons-material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

import styles from './styles.module.scss';
import { Counter } from '../common/Counter';
import { Price } from '../../../data/room';
import { currency } from '../../utils/currency';
interface IOffersAccordion {
  offers: Price[];
}

const OffersAccordion = ({ offers = [] }: IOffersAccordion) => {
  const { t } = useTranslation('common');
  const [ctaSelected, setCtaSelected] = useState(0);
  const [quantity, setQuantity] = useState(0);

  return (
    <div style={{ width: '100%' }}>
      {offers?.map((item, index) => {
        return (
          <div
            key={index}
            className={styles.ctaItem}
            style={{
              borderBottom:
                offers.length - 1 !== index
                  ? '1px solid var(--gray-150)'
                  : 'none',
              padding: ctaSelected !== index ? '1rem 0' : '1.5rem 0',
            }}
            onClick={() => setCtaSelected(index)}
          >
            <div className={styles.ctaItemHeader}>
              <h3>{item?.name}</h3>
              {ctaSelected !== index && (
                <>
                  <div className={styles.ctaItemHeaderNotSelected}>
                    <h4>{currency(item?.regularTotalAmount)}</h4>
                    <ExpandMoreOutlinedIcon
                      className={styles.chevronDownIcon}
                    />
                  </div>
                </>
              )}
              {ctaSelected === index && (
                <h4>
                  {item?.nightQty} noites{' '}
                  <span style={{ marginLeft: 8 }}>
                    {currency(item?.regularTotalAmount)}
                  </span>
                </h4>
              )}{' '}
            </div>
            {ctaSelected === index && (
              <div className={styles.ctaItemContent}>
                <ul>
                  <li>Não reembolsável</li>
                  <li>Café da manhã incluso</li>
                  <li>All included</li>
                </ul>

                <Counter quantity={quantity} setQuantity={setQuantity} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OffersAccordion;
