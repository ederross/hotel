import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

import styles from './styles.module.scss';
import { Counter } from '../common/Counter';
import { Price, Room } from '../../../data/room';
import { currency } from '../../utils/currency';
import { AppStore } from '../../store/types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { pluralProfix } from '../../utils/pluralRules';
interface IOffersAccordion {
  room: Room;
  handleAddToCart: (quantity: number, price: Price) => void;
}

const OffersAccordion = ({ room, handleAddToCart }: IOffersAccordion) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [ctaSelected, setCtaSelected] = useState(0);

  const {
    cart: { objects },
  } = useSelector((state: AppStore) => state);

  const currentCart = objects.find((r) => r.objectId === room?.objectId);

  const findQuantity = (quoteId: string) =>
    currentCart?.prices?.find((q) => q.quoteId === quoteId)?.quantity || 0;

  return (
    <div style={{ width: '100%' }}>
      {room?.prices?.map((item, index) => {
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
                  <h4>
                    {item?.nightQty}{' '}
                    {t(`night_${pluralProfix(item?.nightQty, router.locale)}`)}
                  </h4>
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

                <Counter
                  quantity={findQuantity(item?.quoteId)}
                  max={room?.quantity}
                  setQuantity={(q) => handleAddToCart(q, item)}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OffersAccordion;
