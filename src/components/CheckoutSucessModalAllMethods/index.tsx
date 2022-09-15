import { style } from '@mui/system';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import React, { useEffect } from 'react';
import { OfficeDetails } from '../../../data/officeDetails';

import styles from './styles.module.scss';

interface ICheckoutSucessModal {
  handleCloseCheckoutSucessModal: () => void;
  officeDetails: OfficeDetails;
  data: {
    email: string;
    BookingNumber: string;
    bookingStatusCode: number;
    bookingStatusMsg: string;
    bookingDetail: {
      checkIn: string;
      checkOut: string;
    };
    welcomeMsg: string;
  };
}

export const CheckoutSucessModalAllMethods = ({
  handleCloseCheckoutSucessModal,
  data,
  officeDetails,
}: ICheckoutSucessModal) => {
  const { t, i18n } = useTranslation('common');
  const address = officeDetails?.address;

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <div className={styles.mobSuccessModalHeader}>
            <span>Reserva #4343</span>
          </div>

          <div className={styles.mobStatusHeaderContainer}>
            <div className={styles.statusContainer}>
              <div className={styles.statusBox}>
                <div className={styles.circleProgress}></div>
                <span className={styles.title}>Booking</span>
              </div>
              <div className={styles.statusBox}>
                <div className={styles.line}></div>
                <div
                  className={styles.circleProgress}
                  style={{ backgroundColor: '#EBEBEB' }}
                >
                  <div className={styles.disabledCircle}></div>
                </div>
                <span className={styles.title}>Pagamento</span>
                <div className={styles.line}></div>
              </div>
              <div className={styles.statusBox}>
                <div
                  className={styles.circleProgress}
                  style={{ backgroundColor: '#EBEBEB' }}
                >
                  <div className={styles.disabledCircle}></div>
                </div>
                <span className={styles.title}>Confirmação</span>
              </div>
            </div>
          </div>

          <div className={styles.mobTimelineCount}>
            <span className={styles.mobTimelineTitle}>
              Sua reserva vence em:
            </span>
            <span className={styles.mobTimeline}>
              01 dia : 1 hora : 3 min : 52 s
            </span>
            <span className={styles.mobDate}>(Segunda, 30 Jun, 2020).</span>
          </div>

          <div className={styles.mobResultContainer}>
            <span className={styles.mobPixResultTitle}>Pix QR code gerado</span>
            <span className={styles.mobPixCode}>@!@$%43423</span>
            <button className={styles.mobButton}>Copiar</button>
          </div>

          <div className={styles.mobReturnFeedbackContainer}>
            <div className={styles.checkIconContainer}>
              <div className={styles.circleProgress}></div>
            </div>

            <span className={styles.mobReturnFeedbackTitle}>WooHoo</span>
            <span className={styles.mobReturnFeedbackDescription}>
              Falta muito pouco para sua hospedagem! Siga as intruções que foram
              enviadas para o e-mail: <span>ederjr6@gmail.com</span>
            </span>
            <div style={{ marginBottom: 16 }}>
              <Link href="https://">
                <a
                  target="_blank"
                  className={styles.mobReturnLocalizationTitle}
                >
                  {t('bookLocale')}
                </a>
              </Link>
            </div>
            <button className={styles.mobReturnButton}>
              <span>{t('backHome')}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
