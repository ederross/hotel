import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import React, { useState } from 'react';
import { OfficeDetails } from '../../../data/officeDetails';

import ExpandLessOutlined from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined';

import styles from './styles.module.scss';

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

  const [ctaSelected, setCtaSelected] = useState(0);

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
                  <span className={styles.bookingCode}>#2329</span>
                </div>
                <span className={styles.mainTitle}>{t('success')}</span>
                <span className={styles.mainDescription}>
                  Falta muito pouco para sua hospedagem! Acompanhe o status de
                  sua reserva através do e-mail: <span>ederjr6@gmail.com</span>
                </span>

                <Link href="https://">
                  <a
                    target="_blank"
                    className={styles.localizationTitle}
                    style={{ marginBottom: 16, marginTop: 16 }}
                  >
                    {t('bookLocale')}
                  </a>
                </Link>

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
                          {t('waiting_payment')}
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
                          {t('payment_confirm')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span className={styles.backHome}>{t('backHome')}</span>
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
                  style={{ border: '1px solid #E0E0E0', padding: '32px 24px' }}

                  //                          USAR COM PIX ESSE STYLE ABAIXO
                  // style={{
                  //   height: 'auto',
                  //   backgroundColor: '#2AB59C',
                  //   borderRadius: 4,
                  //   padding: '32px 24px',
                  // }}
                >
                  {/* <div className={styles.paymentInfoHeader}>
                    <span className={styles.date} style={{ color: '#FFF' }}>
                      Efetue o pagamento até{' '}
                      <span style={{ color: '#FFF' }}>
                        (Segunda, 30 Jun, 2020)
                      </span>
                    </span>
                    <span
                      style={{ color: '#FFF', marginBottom: 24 }}
                      className={styles.dateTimeline}
                    >
                      01 dia : 1 hora : 3 min : 52 seg
                    </span>

                    <div className={styles.qrCodeContainerDesk}>
                    
                      <div
                        style={{
                          width: '100%',
                          height: 200,
                          backgroundColor: 'red',
                          marginBottom: 24,
                        }}
                      ></div>
                      <span
                        className={styles.mobPixCode}
                        style={{ color: '#FFF' }}
                      >
                        @$DAT$fsdf23
                      </span>
                      <button className={styles.mobButton}>Copiar</button>
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
                  </div> */}
                  {/* DEPÓSITO */}
                  {/* {items?.map((item, index) => {
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
                            style={{ display: 'flex', flexDirection: 'column' }}
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
                  })} */}




                  {/* CREDIT CARD */}
                  <span className={styles.mobSuccessPaymentSubtitle}>
                    Sucesso
                  </span>
                  <span
                    className={styles.mobSuccessPaymentTitle}
                    style={{ marginBottom: 24 }}
                  >
                    Pagamento efetuado
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
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div className={styles.holderCardDetails}>
                      <span className={styles.holderTitle}>
                        {t('validity')}
                      </span>
                      <span className={styles.holderDescription}>02/30</span>
                    </div>
                    <div className={styles.holderCardDetails}>
                      <span className={styles.holderTitle}>{t('cvv')}</span>
                      <span className={styles.holderDescription}>054</span>
                    </div>
                  </div>
                </div>
                <div className={styles.valueBox}>
                  <span>{t('valueToPay')}</span>
                  <span className={styles.value}>R$ 765,80</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
