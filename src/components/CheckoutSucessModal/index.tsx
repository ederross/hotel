import { PlaceOutlined } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
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

export const CheckoutSucessModal = ({
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
          <h2>
            Sua reserva <span> #{data?.BookingNumber}</span> foi recebida com
            sucesso!
          </h2>
          <a
            className={styles.locationContainer}
            href={`https://www.google.com/maps/?q=${address.latLong.latitude},${address.latLong.longitude}`}
            title={'Ver mapa'}
            target={'_blank'}
            rel="noreferrer"
          >
            <PlaceOutlined
              width={18}
              height={18}
              style={{ color: 'var(--primary-color)' }}
            />

            <h3>Ver localização do Hotel</h3>
          </a>
          <h5>
            Woohoo! Falta muito pouco para sua hospedagem! Siga as intruções que
            foram enviadas para o e-mail: <span>{data?.email}</span>
          </h5>
          <div className={styles.checkoutImageContainer}>
            <Image
              className={styles.checkoutImage}
              src={'/images/checkout_sucess.svg'}
              layout={'fill'}
              objectFit="contain"
              title={'Checkout'}
              alt={'Checkout'}
            />
          </div>
          <button
            className={styles.confirmBtn}
            onClick={handleCloseCheckoutSucessModal}
          >
            {t('back')}
          </button>
        </div>
      </div>
    </>
  );
};
