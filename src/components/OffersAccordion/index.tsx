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
              borderRadius: 8,
              border:
                ctaSelected === index ? '1px solid var(--gray-150)' : 'none',
              padding: ctaSelected !== index ? '1rem' : '1rem',
            }}
            onClick={() => setCtaSelected(index)}
          >
            <div className={styles.ctaItemHeader}>
              <div>
                {ctaSelected !== index ? (
                  <h4>{currency(item?.regularTotalAmount)}</h4>
                ) : (
                  <h4>{item?.nightQty} noites </h4>
                )}
                <h3 style={{ fontSize: ctaSelected !== index ? 16 : 20 }}>
                  {item?.name}
                </h3>
              </div>
              {ctaSelected !== index && (
                <>
                  <div className={styles.ctaItemHeaderNotSelected}>
                    {/* <h4>{currency(item?.regularTotalAmount)}</h4> */}
                    <ExpandMoreOutlinedIcon
                      className={styles.chevronDownIcon}
                    />
                  </div>
                </>
              )}

              {/* {ctaSelected === index && (
                <h4>
                  {item?.nightQty} noites{' '}
                  <span style={{ marginLeft: 8 }}>
                    {currency(item?.regularTotalAmount)}
                  </span>
                </h4>
              )}{' '} */}
            </div>
            {ctaSelected === index && (
              <p className={styles.description}>{item?.priceDescription}</p>
            )}
            {ctaSelected === index && (
              <div className={styles.ctaItemContent}>
                <h4>{currency(item?.regularTotalAmount)}</h4>

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
