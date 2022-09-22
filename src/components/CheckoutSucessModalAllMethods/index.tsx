import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import React, { useState } from 'react';
import { OfficeDetails } from '../../../data/officeDetails';
import { PlaceOutlined, CheckOutlined } from '@mui/icons-material';
import ExpandLessOutlined from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined';
import styles from './styles.module.scss';
import moment from 'moment';
import QRCode from 'react-qr-code';
import Countdown from 'react-countdown';
import { currency } from '../../utils/currency';
import {
  methodDetailsTypes,
  PaymethodTypes,
} from '../../store/ducks/checkout/types';
import { IPaymentBooking } from '../../services/requests/booking';

export const depositMock = [
  {
    bankCode: '001',
    bankName: 'Banco do Brasil',
    branch: '0983',
    account: '16916-1     ',
    addInformation: 'Hotel Central Parque\r20.690.236/0002-95',
    deadlinePaymentDate: '2022-09-17 07:20:20',
  },
  {
    bankCode: '002',
    bankName: 'Banco Bradesco',
    branch: '0543      ',
    account: '12323-4     ',
    addInformation: 'Hotel\rTeste',
    deadlinePaymentDate: '2022-09-17 07:20:20',
  },
];

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

export const CheckoutSucessModalAllMethods = ({
  handleCloseCheckoutSucessModal,
  data,
  payInfos,
  officeDetails,
  paymentBooking,
}: ICheckoutSucessModal) => {
  const { t, i18n } = useTranslation('common');

  const [ctaSelected, setCtaSelected] = useState(0);

  const payType = paymentBooking?.paymentMethod?.paymentMethodTypeCode;
  const address = officeDetails?.address;

  const payment: any =
    payType === 4
      ? {
          methodDetails: depositMock as any,
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

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <div className={styles.desktopContainer}>
            <div className={styles.desktopPaymentStatusBox}>
              <div className={styles.desktopStatusContainer}>
                <div
                  className={styles.checkIconWithCodeHolder}
                  style={{ marginBottom: 16 }}
                >
                  <div
                    className={styles.checkIconContainer}
                    style={{
                      marginBottom: 0,
                      marginRight: 16,
                      width: 48,
                      height: 48,
                      backgroundColor: '#EEFAF8',
                      border: 'none',
                    }}
                  >
                    <div
                      className={styles.circleProgress}
                      style={{ left: 0, width: 20, height: 20, border: 'none' }}
                    ></div>
                  </div>
                  <span className={styles.bookingCode}>
                    #{data?.BookingNumber}
                  </span>
                </div>
                <span className={styles.mainTitle}>{t('success')}</span>
                <span className={styles.mainDescription}>
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
                    style={{ color: 'var(--primary-color)' }}
                  />

                  <h3 className={styles.localizationTitle}>
                    {t('bookLocale')}
                  </h3>
                </a>

                <hr className={styles.line} />

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className={styles.bookingTitle}>
                    {t('statusTitle')}
                  </span>

                  <div className={styles.desktopStatusContainer}>
                    <div className={styles.statusLineDesktop}></div>
                    <div className={styles.desktopStatusCircleContainer}>
                      <div className={styles.statusHolder}>
                        <div className={styles.statusCodeInfoBox}>
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
                              <CheckOutlined
                                style={{ color: '#FFF', fontSize: 24 }}
                              />
                            )}
                          </div>
                          <span className={styles.statusTitle}>
                            {t('booking')}
                          </span>
                        </div>
                        <span className={styles.statusDescription}>
                          {t('orderReceivedScheduled')}
                        </span>
                      </div>

                      <div className={styles.statusHolder}>
                        <div className={styles.statusCodeInfoBox}>
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
                              <CheckOutlined
                                style={{ color: '#FFF', fontSize: 24 }}
                              />
                            )}
                          </div>
                          <span className={styles.statusTitle}>
                            {t('payment')}
                          </span>
                        </div>
                        <span className={styles.statusDescription}>
                          {t('waitingPayment')}
                        </span>
                      </div>

                      <div className={styles.statusHolder}>
                        <div className={styles.statusCodeInfoBox}>
                          <div
                            className={styles.circleProgress}
                            style={{
                              backgroundColor:
                                data?.bookingStatusCode === 1
                                  ? '#2ab59c'
                                  : '#dfdfdf',
                            }}
                          >
                            {data?.bookingStatusCode === 1 && (
                              <CheckOutlined
                                style={{ color: '#FFF', fontSize: 24 }}
                              />
                            )}
                          </div>
                          <span className={styles.statusTitle}>
                            {t('confirm')}
                          </span>
                        </div>
                        <span className={styles.statusDescription}>
                          {t('paymentConfirm')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={styles.confirmBtn}
                onClick={handleCloseCheckoutSucessModal}
              >
                <span className={styles.backHome}>{t('backHome')}</span>
              </div>
            </div>

            <div className={styles.desktopPaymentInfo}>
              {/* DEPÓSITO */}
              {/* {payType === 4 && (
                <div className={styles.paymentInfoHeader}>
                  <span className={styles.date}>
                    Efetue o pagamento até <span>(Segunda, 30 Jun, 2020)</span>
                  </span>
                  <span className={styles.dateTimeline}>
                    01 dia : 1 hora : 3 min : 52 seg
                  </span>
                </div>
              )} */}

              <div
                className={styles.cardInfo}
                style={{ flexDirection: 'column' }}
              >
                <div
                  className={styles.cardDetailsResultContainerDesk}
                  style={
                    payType === 3
                      ? {
                          height: 'auto',
                          backgroundColor: '#2AB59C',
                          borderRadius: 4,
                          padding: '32px 24px',
                        }
                      : { border: '1px solid #E0E0E0', padding: '32px 24px' }
                  }
                >
                  {payType === 3 && (
                    <div className={styles.paymentInfoHeader}>
                      <span className={styles.date} style={{ color: '#FFF' }}>
                        {t('deadlineMessage') + ' '}
                        <span style={{ color: '#FFF' }}>
                          {moment(
                            payment?.methodDetails[0]?.deadlinePaymentDate
                          ).calendar()}
                        </span>
                      </span>
                      {/* <span
                        style={{ color: '#FFF', marginBottom: 24 }}
                        className={styles.dateTimeline}
                      >
                        01 dia : 1 hora : 3 min : 52 seg
                      </span> */}
                      <Countdown
                        date={payment?.methodDetails[0]?.deadlinePaymentDate}
                        className={styles.dateTimeline}
                      >
                        <span className={styles.dateTimeline}>
                          {t('TimeOver')}
                        </span>
                      </Countdown>
                      <div className={styles.qrCodeContainerDesk}>
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
                        <span
                          className={styles.mobPixCode}
                          style={{ color: '#FFF' }}
                        >
                          {payment?.methodDetails[0]?.keyCode}
                        </span>
                        <button
                          className={styles.mobButton}
                          onClick={() =>
                            navigator.clipboard.writeText(
                              payment?.methodDetails[0]?.qrCodeUrl
                            )
                          }
                        >
                          {t('copy')}
                        </button>
                      </div>

                      <span
                        style={{ color: '#FFF' }}
                        className={styles.pixObsTitle}
                      >
                        {t('bankObs')}
                      </span>

                      <span style={{ color: '#FFF' }} className={styles.pixObs}>
                        {payment?.methodDetails[0]?.additionalInformation}
                      </span>
                    </div>
                  )}

                  {/* DEPÓSITO */}
                  {payType === 4 &&
                    payment?.methodDetails.map((item, index) => {
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
                                ctaSelected === index ? '#2AB59C' : '#576167',
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
                              <ExpandLessOutlined
                                className={styles.chevronDownIcon}
                              />
                            ) : (
                              <ExpandMoreOutlined
                                className={styles.chevronDownIcon}
                              />
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
                                <span className={styles.copyInfo}>
                                  {t('copy')}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  {/* CREDIT CARD */}
                  {payType === 1 && (
                    <>
                      <span className={styles.mobSuccessPaymentSubtitle}>
                        {t('success')}
                      </span>
                      <span
                        className={styles.mobSuccessPaymentTitle}
                        style={{ marginBottom: 24 }}
                      >
                        {t('paymentMade')}
                      </span>
                      <div className={styles.holderCardDetails}>
                        <span className={styles.holderTitle}>{t('name')}</span>
                        <span className={styles.holderDescription}>
                          {
                            paymentBooking?.paymentMethod?.methodDetails[0]
                              ?.cardHolder
                          }
                        </span>
                      </div>
                      <div className={styles.holderCardDetails}>
                        <span className={styles.holderTitle}>
                          {t('cardNumber')}
                        </span>
                        <span className={styles.holderDescription}>
                          **** **** **** ****
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
                            {t('validity')}
                          </span>
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
                </div>
                <div className={styles.valueBox}>
                  <span>{t('valueToPay')}</span>
                  <span className={styles.value}>
                    {currency(payInfos?.paymentTotalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
