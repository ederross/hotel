import React, { useState } from 'react';

import styles from './mobile.module.scss';

import ExpandLessOutlined from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined';
import { useTranslation } from 'next-i18next';
import { OfficeDetails } from '../../../data/officeDetails';
import { IPaymentBooking } from '../../services/requests/booking';
import {
  methodDetailsTypes,
  PaymethodTypes,
} from '../../store/ducks/checkout/types';
import moment from 'moment';
import Countdown from 'react-countdown';
import QRCode from 'react-qr-code';
import { CheckOutlined, PlaceOutlined } from '@mui/icons-material';
import { useWindowSize } from '../../hooks/UseWindowSize';
import { toast, ToastContainer } from 'react-toastify';

interface ICheckoutSucessModal {
  handleCloseCheckoutSucessModal: () => void;
  officeDetails: OfficeDetails;
  payInfos: any;
  paymentBooking: IPaymentBooking;
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
    payment: PaymethodTypes;
  };
}

export const CheckoutSucessModalAllMethodsMobile = ({
  handleCloseCheckoutSucessModal,
  data,
  payInfos,
  officeDetails,
  paymentBooking,
}: ICheckoutSucessModal) => {
  const { t, i18n } = useTranslation('common');
  const size = useWindowSize();

  const [ctaSelected, setCtaSelected] = useState(0);

  const payType = paymentBooking?.paymentMethod?.paymentMethodTypeCode;
  const address = officeDetails?.address;

  const payment: any =
    payType === 4
      ? {
          methodDetails: data?.payment?.methodDetails || [],
          paymentDetails: [],
          paymentMethodTypeCode: 4,
        }
      : data?.payment;

  const handleCopyAccount = (item: methodDetailsTypes) => {
    navigator.clipboard.writeText(
      `${
        t('bank') +
        ': ' +
        item?.bankCode +
        '\n' +
        t('agency') +
        ': ' +
        item?.bankName +
        '\n' +
        t('account') +
        ': ' +
        item?.account
      }`
    );
  };

  const toastConfig = {
    position: size?.width < 868 ? 'top-left' : 'bottom-right',
    autoClose: 5000,
    theme: 'colored',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.mobSuccessModalHeader}>
          <span>#{data?.BookingNumber}</span>
        </div>

        <div className={styles.mobStatusHeaderContainer}>
          <div className={styles.statusContainer}>
            <div className={styles.statusBox}>
              <div
                className={styles.circleProgress}
                style={{
                  backgroundColor:
                    data?.bookingStatusCode === 1 ||
                    data?.bookingStatusCode === 2
                      ? '#2ab59c'
                      : '#dfdfdf',
                }}
              >
                {(data?.bookingStatusCode === 1 ||
                  data?.bookingStatusCode === 2) && (
                  <CheckOutlined style={{ color: '#FFF', fontSize: 16 }} />
                )}
              </div>
              <span className={styles.title}>{t('booking')}</span>
            </div>
            <div className={styles.statusBox}>
              <div className={styles.statusLine}></div>
              <div
                className={styles.circleProgress}
                style={{
                  backgroundColor:
                    data?.bookingStatusCode === 1 ||
                    data?.bookingStatusCode === 2
                      ? '#2ab59c'
                      : '#dfdfdf',
                }}
              >
                {(data?.bookingStatusCode === 1 ||
                  data?.bookingStatusCode === 2) && (
                  <CheckOutlined style={{ color: '#FFF', fontSize: 16 }} />
                )}
              </div>
              <span className={styles.title}>{t('payment')}</span>
              <div className={styles.line}></div>
            </div>
            <div className={styles.statusBox}>
              <div
                className={styles.circleProgress}
                style={{
                  backgroundColor:
                    data?.bookingStatusCode === 1 ? '#2ab59c' : '#dfdfdf',
                }}
              >
                {data?.bookingStatusCode === 1 && (
                  <CheckOutlined style={{ color: '#FFF', fontSize: 16 }} />
                )}
              </div>
              <span className={styles.title}>{t('confirm')}</span>
            </div>
          </div>
        </div>

        <div className={styles.mobTimelineCount}>
          {/* TODO: APARECER SE PIX || DEPÓSITO*/}
          {(payType === 3 || payType === 4) && (
            <>
              <span className={styles.mobTimelineTitle}>
                {t('deadlineMessage')}
              </span>
              <Countdown
                date={payment?.methodDetails[0]?.deadlinePaymentDate}
                className={styles.mobTimeline}
              >
                <span className={styles.mobTimeline}>{t('timeOver')}</span>
              </Countdown>
              <span className={styles.mobDate}>
                {moment(
                  payment?.methodDetails[0]?.deadlinePaymentDate
                ).calendar()}
              </span>
            </>
          )}

          {/* #B5542A TODO: APARECER SE PAGAMENTO CREDIT CARD */}
          {payType === 1 && (
            <>
              <span className={styles.mobSuccessPaymentSubtitle}>Sucesso</span>
              <span className={styles.mobSuccessPaymentTitle}>
                Pagamento efetuado
              </span>
            </>
          )}
        </div>

        {payType === 3 && (
          <div className={styles.mobResultContainer}>
            {/* #B5542A TODO: SE FOR PIX APARECE ESSE COMMENT */}
            {/* <span className={styles.mobPixResultTitle}>
              Pix QR code <span style={{ color: '#000' }}> gerado</span>
            </span> */}
            <QRCode
              size={256}
              style={{
                height: 200,
                maxWidth: '100%',
                width: '100%',
                margin: '24px 0',
              }}
              value={payment?.methodDetails[0]?.qrCodeUrl}
              viewBox={`0 0 256 256`}
            />
            <span className={styles.mobPixCode}>
              {payment?.methodDetails[0]?.keyCode}
            </span>
            <button
              className={styles.mobButton}
              onClick={() => {
                navigator.clipboard.writeText(
                  payment?.methodDetails[0]?.qrCodeUrl
                );
                toast.success(t('pixCopied'), toastConfig as any);
              }}
            >
              {t('copy')}
            </button>
          </div>
        )}

        {/* #B5542A TODO: TROCAR O PADDING CASO SEJA DIFERENTE DE DEPÓSITO */}
        <div
          className={styles.cardDetailsResultContainer}
          style={{ padding: payType === 1 ? 24 : 0 }}
        >
          {/* #B5542A TODO: SE FOR PAGAMENTO CREDIT CARD  */}
          {payType === 1 && (
            <>
              <div className={styles.holderCardDetails}>
                <span className={styles.holderTitle}>{t('name')}</span>
                <span className={styles.holderDescription}>
                  {paymentBooking?.paymentMethod?.methodDetails[0]?.cardHolder}
                </span>
              </div>

              <div className={styles.holderCardDetails}>
                <span className={styles.holderTitle}>{t('cardNumber')}</span>
                <span className={styles.holderDescription}>
                  **** **** **** ****
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className={styles.holderCardDetails}>
                  <span className={styles.holderTitle}>{t('validity')}</span>
                  <span className={styles.holderDescription}>
                    {
                      paymentBooking?.paymentMethod?.methodDetails[0]
                        ?.encryptedExpiryYear
                    }
                  </span>
                </div>
                <div className={styles.holderCardDetails}>
                  <span className={styles.holderTitle}>{t('cvv')}</span>
                  <span className={styles.holderDescription}>
                    {
                      paymentBooking?.paymentMethod?.methodDetails[0]
                        ?.encryptedSecurityCode
                    }
                  </span>
                </div>
              </div>
            </>
          )}

          {payType === 4 &&
            payment?.methodDetails?.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    border:
                      ctaSelected === index
                        ? '1px solid var(--gray-150)'
                        : 'none',
                  }}
                  onClick={() => setCtaSelected(index)}
                >
                  <div
                    className={styles.accItemHeader}
                    style={{
                      backgroundColor:
                        ctaSelected === index
                          ? 'var(--primary-color)'
                          : '#576167',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <span className={styles.accSubtitle}>
                        {t('option') + ' ' + (index + 1)}
                      </span>
                      <span className={styles.accTitle}>
                        {item.bankCode + ' - ' + item.bankName}
                      </span>
                    </div>

                    {ctaSelected === index ? (
                      <ExpandLessOutlined className={styles.chevronDownIcon} />
                    ) : (
                      <ExpandMoreOutlined className={styles.chevronDownIcon} />
                    )}
                  </div>

                  {ctaSelected === index && (
                    <>
                      <div style={{ padding: 18 }}>
                        <div className={styles.holderCardDetails}>
                          <span className={styles.holderTitle}>
                            {t('bank')}
                          </span>
                          <span className={styles.holderDescription}>
                            {item.branch + ' - ' + item.bankName}
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div className={styles.holderCardDetails}>
                            <span className={styles.holderTitle}>
                              {t('agency')}
                            </span>
                            <span className={styles.holderDescription}>
                              {item.bankName}
                            </span>
                          </div>
                          <div className={styles.holderCardDetails}>
                            <span className={styles.holderTitle}>
                              {t('account')}
                            </span>
                            <span className={styles.holderDescription}>
                              {item.account}
                            </span>
                          </div>
                        </div>
                        {/* <div className={styles.holderCardDetails}>
                          <span className={styles.holderTitle}>
                            {t('favored')}
                          </span>
                          <span className={styles.holderDescription}>
                            {item.addInformation}
                          </span>
                        </div> */}
                        <div className={styles.holderCardDetails}>
                          <span className={styles.holderTitle}>
                            {t('bankObs')}
                          </span>
                          <span className={styles.holderDescription}>
                            {item.addInformation}
                          </span>
                        </div>
                      </div>
                      <div
                        className={styles.copyInfoContainer}
                        onClick={() => handleCopyAccount(item)}
                      >
                        <span className={styles.copyInfo}>{t('copy')}</span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </div>

        <div className={styles.mobReturnFeedbackContainer}>
          <div className={styles.checkIconContainer}>
            <div className={styles.circleProgress}></div>
          </div>

          <span className={styles.mobReturnFeedbackTitle}>WooHoo</span>
          <span className={styles.mobReturnFeedbackDescription}>
            {t('checkoutMessage')} <span>{data?.email}</span>
          </span>
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
              style={{ color: 'var(--gray-with-blue-400)' }}
            />

            <h3 className={styles.localizationTitle}>{t('bookLocale')}</h3>
          </a>

          <button
            className={styles.mobReturnButton}
            onClick={handleCloseCheckoutSucessModal}
          >
            <span className={styles.mobReturnButtonTitle}>{t('backHome')}</span>
          </button>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
