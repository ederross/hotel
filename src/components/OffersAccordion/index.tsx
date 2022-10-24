import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

import styles from './styles.module.scss';
import { Counter } from '../common/Counter';
import { Price, Room } from '../../../data/room';
import { currency } from '../../utils/currency';
import { AppStore } from '../../store/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddProductToCart,
  RemoveProductToCart,
} from '../../store/ducks/cart/actions';
import { useRouter } from 'next/router';
interface IOffersAccordion {
  room: Room;
}

const OffersAccordion = ({ room }: IOffersAccordion) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const dispatch = useDispatch();
  const [ctaSelected, setCtaSelected] = useState(0);

  const {
    cart: { objects },
  } = useSelector((state: AppStore) => state);

  const { startDate, endDate, adults, children }: any = router.query;

  const currentCart = objects.find((r) => r.objectId === room?.objectId);

  const findQuantity = (quoteId: string) =>
    currentCart?.prices?.find((q) => q.quoteId === quoteId)?.quantity || 0;

  const handleAddToCart = (quantity: number, price: Price) => {
    if (quantity > 0) {
      dispatch(
        AddProductToCart({
          objectId: room.objectId,
          identificationCode: '',
          prices: !!currentCart?.prices?.find(
            (p) => p.quoteId === price?.quoteId
          )
            ? currentCart?.prices.map((p) =>
                p.quoteId !== price?.quoteId
                  ? p
                  : {
                      ...p,
                      quantity,
                      checkIn: startDate,
                      checkOut: endDate,
                      priceDescription: price?.priceDescription,
                      taxes: p.taxes || [],
                      fees: p.fees || [],
                      travelers: {
                        adults,
                        childrens: children,
                        ages: [],
                      },
                    }
              )
            : currentCart
            ? [
                ...currentCart?.prices,
                {
                  quantity,
                  quoteId: price?.quoteId,
                  regularTotalAmount: price?.regularTotalAmount,
                  checkIn: startDate,
                  checkOut: endDate,
                  priceDescription: room?.prices[0].priceDescription,
                  taxes: price?.taxes || [],
                  fees: price?.fees || [],
                  travelers: {
                    adults: parseInt(adults),
                    childrens: parseInt(children),
                    ages: [],
                  },
                },
              ]
            : [
                {
                  quantity,
                  quoteId: price?.quoteId,
                  regularTotalAmount: price?.regularTotalAmount,
                  checkIn: startDate,
                  checkOut: endDate,
                  priceDescription: room?.prices[0].priceDescription,
                  taxes: price?.taxes || [],
                  fees: price?.fees || [],
                  travelers: {
                    adults,
                    childrens: children,
                    ages: [],
                  },
                },
              ],
          infos: {
            adults,
            children,
            image: room?.images ? room?.images[0]?.imageUrl : '',
            objectName: room?.objectName,
          },
        })
      );
    } else {
      dispatch(
        currentCart.prices.length > 1
          ? AddProductToCart({
              objectId: currentCart?.objectId,
              identificationCode: '',
              prices: currentCart?.prices.filter(
                (p) => p.quoteId !== price?.quoteId
              ),
              infos: currentCart?.infos,
            })
          : dispatch(RemoveProductToCart(currentCart?.objectId))
      );
    }
  };

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
