import moment from 'moment';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React from 'react';
import { useWindowSize } from '../../hooks/UseWindowSize';
import { currency } from '../../utils/currency';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/types';
import { Policy } from '../../../data/policies';
import { pluralProfix } from '../../utils/pluralRules';
import { useRouter } from 'next/router';

interface ICheckoutInfoBox {
  policies: Policy;
}

export const CheckoutInfoBox = ({ policies }: ICheckoutInfoBox) => {
  const size = useWindowSize();
  const { t } = useTranslation();
  const router = useRouter();

  const checkInStart = parseInt(
    policies?.bookPolicy?.checkinWindow?.startTime?.substring(0, 2)
  );

  const checkInEnd =
    parseInt(policies?.bookPolicy?.checkinWindow?.endTime?.substring(0, 2)) ||
    parseInt(policies?.bookPolicy?.checkinWindow?.startTime?.substring(0, 2)) +
      0;

  const startHour = checkInStart;
  const endHour = checkInEnd < checkInStart ? checkInEnd + 24 : checkInEnd;

  const checkDiferences = Math.abs(endHour - startHour) + 1;
  const checkInOptions = checkDiferences > 1 ? checkDiferences : 1;

  const possibleHours = [...Array(!!checkInOptions ? checkInOptions : 0)].map(
    (_, index) => {
      const v = startHour + index;
      return v > 23 ? v - 24 : v;
    }
  );

  const {
    cart: { infos, objects, services },
  } = useSelector((state: AppStore) => state);

  return (
    <div className={styles.content}>
      <div className={styles.infoBox}>
        <div
          style={{
            borderBottom: size.width < 868 && '8px solid #dadada',
            padding: size.width < 868 && '0 1rem',
            paddingBottom: size.width < 868 && '1rem',
          }}
        >
          {size.width < 868 &&
            objects.slice(0, 2).map((item, index) => (
              <div key={index}>
                {item?.prices?.map((price, index) => (
                  <div key={index} className={styles.roomContainer}>
                    <div className={styles.imageRoomHolder}>
                      {item?.infos?.image && (
                        <Image
                          src={item?.infos?.image}
                          layout={'fill'}
                          alt={item?.infos?.objectName}
                        />
                      )}
                    </div>

                    <div className={styles.roomInfo}>
                      <div className={styles.roomNameAdultChildContainer}>
                        <div className={styles.row}>
                          <h5>
                            {item.infos?.adults +
                              ' ' +
                              t(
                                `adult_${pluralProfix(
                                  item.infos?.adults,
                                  router.locale
                                )}`
                              )}
                            {' & '}
                            {item.infos?.children +
                              ' ' +
                              t(
                                `children_${pluralProfix(
                                  item.infos?.children,
                                  router.locale
                                )}`
                              )}
                          </h5>
                        </div>
                        <h4>{item.infos?.objectName}</h4>
                      </div>

                      <div className={styles.roomQtndPriceContainer}>
                        <h5>{price?.quantity + ' ' + t('room')}</h5>
                        <h4>{currency(price?.regularTotalAmount)}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          {size.width < 868 && objects.length > 2 && (
            <div
              style={{ marginTop: '1.5rem' }}
              className={styles.buttonSeeMoreRoomsContainer}
            >
              <motion.button
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {t('seeAll')}
              </motion.button>
            </div>
          )}
          {size.width < 868 && services.length > 0 && (
            <div
              className={styles.divisorContainer}
              style={{ marginTop: '1rem' }}
            >
              <div></div>
            </div>
          )}

          {size.width < 868 && (
            <div style={{ marginTop: '20px' }}>
              {services.length > 0 && <h3>Serviços</h3>}
              {services.map((service, index) => (
                <div key={index} className={styles.roomContainer}>
                  <div className={styles.row}>
                    <h4>{service.serviceName}</h4>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        flexDirection: 'column',
                      }}
                    >
                      <h5>x{service.quantity}</h5>
                      <h5>{currency(service.price)}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {size.width < 868 && (
            <div className={styles.divisorContainer}>
              <div></div>
            </div>
          )}
        </div>

        <div style={{ padding: '0 1rem', paddingTop: '1rem' }}>
          <h3>{t('yourHosting')}</h3>

          <div className={styles.infoHolder}>
            <div>
              <h4>{t('dates')}</h4>
              <h5>
                {moment(infos?.startDate).format('DD/MM')} -{' '}
                {moment(infos?.endDate).format('DD/MM')}
              </h5>
            </div>
            <div>
              <h4>{t('totalGuests')}</h4>
              <h5>{infos?.totalGuest}</h5>
            </div>
          </div>

          <div
            className={styles.infoHolder}
            style={{ flexDirection: 'column' }}
          >
            <h4>{t('arrivalForecast')}</h4>
            <div className={styles.cSelect}>
              <select name="arrivalForecast" id="pet-select">
                {possibleHours.map((item, index) => (
                  <option key={index} value="">
                    {item}:
                    {policies?.bookPolicy?.checkinWindow?.startTime?.substring(
                      3,
                      5
                    )}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
