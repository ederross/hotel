import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React from 'react';
import { useWindowSize } from '../../hooks/UseWindowSize';
import { currency } from '../../utils/currency';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/types';
import { VerifiedUserOutlined } from '@mui/icons-material';

interface ICheckoutPaymentInfo {
  handleConfirm: () => void;
  setShowCartModal: any;
  showCartModal: any;
  setShowDynamicInfoModal: any;
  showDynamicInfoModal: any;
  payInfos: any;
  isMobile?: boolean;
}

export const CheckoutPaymentInfo = ({
  handleConfirm,
  setShowCartModal,
  showCartModal,
  setShowDynamicInfoModal,
  showDynamicInfoModal,
  payInfos,
  isMobile = false,
}: ICheckoutPaymentInfo) => {
  const size = useWindowSize();
  const { t } = useTranslation();

  const {
    cart: { infos, objects, services },
  } = useSelector((state: AppStore) => state);

  return isMobile ? (
    <div className={styles.mobPriceInformation}>
      <h4>{t('priceInfo')}</h4>
      <div className={styles.row}>
        <h5>
          {' '}
          {t('accommodation')} + {t('service_other')}
        </h5>
        <h5>{currency(payInfos?.paymentTotalAmount)}</h5>
      </div>
      <div className={styles.row}>
        <u onClick={() => setShowDynamicInfoModal(!showDynamicInfoModal)}>
          <h5>{t('fees')}</h5>
        </u>
        <h5>{currency(0)}</h5>
      </div>
      <div className={styles.row}>
        <u onClick={() => setShowDynamicInfoModal(!showDynamicInfoModal)}>
          <h5>{t('taxes')}</h5>
        </u>
        <h5>{currency(0)}</h5>
      </div>
    </div>
  ) : (
    <div className={styles.webPaymentInfos}>
      <div>
        {objects.slice(0, 2).map((item, index) => (
          <div key={index}>
            {item?.prices?.map((price, index) => (
              <div key={index} className={styles.roomContainer}>
                <div className={styles.imageRoomHolder}>
                  <Image
                    src={item?.infos?.image}
                    layout={'fill'}
                    alt={item?.infos?.objectName}
                  />
                </div>

                <div className={styles.roomInfo}>
                  <div className={styles.roomNameAdultChildContainer}>
                    <div className={styles.row}>
                      <h5>
                        {item.infos?.adults < 2 && item.infos?.adults > 0
                          ? t('adultWithCount_one', {
                              count: item.infos?.adults,
                            })
                          : item.infos?.adults === 0
                          ? t('adultWithCount_other', {
                              count: item.infos?.adults,
                            })
                          : t('adultWithCount_other', {
                              count: item.infos?.adults,
                            })}{' '}
                        {'&'}{' '}
                        {item.infos?.children < 2 && item.infos?.children > 0
                          ? t('childrenWithCount_one', {
                              count: item.infos?.children,
                            })
                          : item.infos?.children === 0
                          ? t('childrenWithCount_one', {
                              count: item.infos?.children,
                            })
                          : t('childrenWithCount_other', {
                              count: item.infos?.children,
                            })}
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

        {objects.length > 2 && (
          <div className={styles.buttonSeeMoreRoomsContainer}>
            <motion.button
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCartModal(!showCartModal)}
            >
              {t('seeAll')}
            </motion.button>
          </div>
        )}

        <div style={{ marginTop: '20px' }}>
          {services.length > 0 && <h3>{t('service_other')}</h3>}
          {services.map((room, index) => (
            <div key={index} className={styles.roomContainer}>
              <div className={styles.row}>
                <h4>{room.serviceName}</h4>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                  }}
                >
                  <h5>x{room.quantity}</h5>
                  <h5>{currency(room.price)}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.divisorContainer} style={{ margin: '20px 0' }}>
          <div></div>
        </div>
      </div>

      <div className={styles.lgpdAdviceContainer}>
        <VerifiedUserOutlined className={styles.lockIcon} />
        <h4>{t('lgpdMessage')}</h4>
      </div>
      <div className={styles.divisorContainer}>
        <div></div>
      </div>

      <div className={styles.priceInformation}>
        <h4>{t('priceInfo')}</h4>
        <div className={styles.row}>
          <h5>
            {t('accommodation')} + {t('service_other')}
          </h5>
          <h5>{currency(payInfos?.paymentTotalAmount)}</h5>
        </div>
        <div className={styles.row}>
          <u
            style={{ cursor: 'pointer' }}
            onClick={() => setShowDynamicInfoModal(!showDynamicInfoModal)}
          >
            <h5>{t('fees')}</h5>
          </u>
          <h5>{currency(0)}</h5>
        </div>
        <div className={styles.row}>
          <u
            style={{ cursor: 'pointer' }}
            onClick={() => setShowDynamicInfoModal(!showDynamicInfoModal)}
          >
            <h5>{t('taxes')}</h5>
          </u>
          <h5>{currency(0)}</h5>
        </div>
      </div>

      <div>
        <div className={styles.row}>
          <h4>{t('total')} (BRL)</h4>
          <h4>{currency(payInfos?.paymentTotalAmount)}</h4>
        </div>
        <motion.button
          id={'button'}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          whileTap={{ scale: 0.9 }}
          className={styles.confirmBtn}
          onClick={handleConfirm}
        >
          {t('confirmPay')}
        </motion.button>

        <div
          className={styles.termsArea}
          onClick={() => setShowDynamicInfoModal(!showDynamicInfoModal)}
        >
          <h6>
            {t('byClickingButtonAboveAgreePolicies')}:
            <strong>
              {' '}
              <u>
                {t('reservationPolicies')}, {t('refundPolicy')} {t('and')}{' '}
                {t('bookingRescheduling')}
              </u>
            </strong>
          </h6>
        </div>
      </div>
    </div>
  );
};
