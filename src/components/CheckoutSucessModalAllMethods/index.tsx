import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import React, { useState } from 'react';
import { OfficeDetails } from '../../../data/officeDetails';
import { PlaceOutlined } from '@mui/icons-material';
import ExpandLessOutlined from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined';
import styles from './styles.module.scss';
import moment from 'moment';
import QRCode from 'react-qr-code';
import Countdown from 'react-countdown';
import { currency } from '../../utils/currency';
import { PaymethodTypes } from '../../store/ducks/checkout/types';

export const items = [
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
}: ICheckoutSucessModal) => {
  const { t, i18n } = useTranslation('common');
  const address = officeDetails?.address;

  const [ctaSelected, setCtaSelected] = useState(0);

  const payment = data?.payment;

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <div className={styles.desktopContainer}>
            <div className={styles.desktopPaymentStatusBox}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                  Falta muito pouco para sua hospedagem! Acompanhe o status de
                  sua reserva através do e-mail: <span>{data?.email}</span>
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
                    <div
                      style={{
                        display: 'flex',
                        width: '70%',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div className={styles.statusHolder}>
                        <div className={styles.statusCodeInfoBox}>
                          <div className={styles.circleProgress}></div>
                          <span className={styles.statusTitle}>
                            {t('booking')}
                          </span>
                        </div>
                        <span className={styles.statusDescription}>
                          Order was received and scheduled
                        </span>
                      </div>

                      <div
                        className={styles.statusHolder}
                        style={{ marginLeft: 4, marginRight: 42 }}
                      >
                        <div className={styles.statusCodeInfoBox}>
                          <div className={styles.circleProgress}></div>
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
                          <div className={styles.circleProgress}></div>
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
              {/* <div className={styles.paymentInfoHeader}>
                <span className={styles.date}>
                  Efetue o pagamento até <span>(Segunda, 30 Jun, 2020)</span>
                </span>
                <span className={styles.dateTimeline}>
                  01 dia : 1 hora : 3 min : 52 seg
                </span>
              </div> */}

              <div
                className={styles.cardInfo}
                style={{ flexDirection: 'column' }}
              >
                <div
                  className={styles.cardDetailsResultContainerDesk}
                  style={
                    payment?.paymentMethodTypeCode === 3
                      ? {
                          height: 'auto',
                          backgroundColor: '#2AB59C',
                          borderRadius: 4,
                          padding: '32px 24px',
                        }
                      : { border: '1px solid #E0E0E0', padding: '32px 24px' }
                  }
                >
                  {payment?.paymentMethodTypeCode === 3 && (
                    <div className={styles.paymentInfoHeader}>
                      <span className={styles.date} style={{ color: '#FFF' }}>
                        Efetue o pagamento até{' '}
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
                          Copiar
                        </button>
                      </div>

                      <span
                        style={{ color: '#FFF' }}
                        className={styles.pixObsTitle}
                      >
                        Obs
                      </span>

                      <span style={{ color: '#FFF' }} className={styles.pixObs}>
                        Favor responder o e-mail com o comprovante do depósito.
                      </span>
                    </div>
                  )}

                  {/* DEPÓSITO */}
                  {payment?.paymentMethodTypeCode === 4 &&
                    items?.map((item, index) => {
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
                                <div className={styles.holderCardDetails}>
                                  <span className={styles.holderTitle}>
                                    {t('favored')}
                                  </span>
                                  <span className={styles.holderDescription}>
                                    João Gomes
                                  </span>
                                </div>
                                <div className={styles.holderCardDetails}>
                                  <span className={styles.holderTitle}>
                                    {t('obs')}
                                  </span>
                                  <span className={styles.holderDescription}>
                                    {item.addInformation}
                                  </span>
                                </div>
                              </div>
                              <div className={styles.copyInfoContainer}>
                                <span className={styles.copyInfo}>
                                  {t('copyInfo')}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  {/* CREDIT CARD */}
                  {payment?.paymentMethodTypeCode === 1 && (
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
                          Airton Senna Santos Filho
                        </span>
                      </div>
                      <div className={styles.holderCardDetails}>
                        <span className={styles.holderTitle}>
                          {t('cardNumber')}
                        </span>
                        <span className={styles.holderDescription}>
                          ************065
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
                            02/30
                          </span>
                        </div>
                        <div className={styles.holderCardDetails}>
                          <span className={styles.holderTitle}>{t('cvv')}</span>
                          <span className={styles.holderDescription}>054</span>
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
