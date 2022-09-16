import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import React, { useState } from 'react';
import { OfficeDetails } from '../../../data/officeDetails';

import ExpandLessOutlined from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined';

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

const items = [
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
            {/* TODO: APARECER SE PIX || DEPÓSITO*/}
            <span className={styles.mobTimelineTitle}>
              Sua reserva vence em:
            </span>
            <span className={styles.mobTimeline}>
              01 dia : 1 hora : 3 min : 52 s
            </span>
            <span className={styles.mobDate}>(Segunda, 30 Jun, 2020).</span>

            {/* #B5542A TODO: APARECER SE PAGAMENTO CREDIT CARD */}
            {/* <span className={styles.mobSuccessPaymentSubtitle}>Sucesso</span>
            <span className={styles.mobSuccessPaymentTitle}>
              Pagamento efetuado
            </span> */}
          </div>

          {/* <div className={styles.mobResultContainer}> */}
          {/* #B5542A TODO: SE FOR PIX APARECE ESSE COMMENT */}
          {/* <span className={styles.mobPixResultTitle}>
              Pix QR code <span style={{ color: '#000' }}> gerado</span>
            </span>
            <span className={styles.mobPixCode}>@!@$%43423</span>
            <button className={styles.mobButton}>Copiar</button> */}
          {/* </div> */}

          {/* #B5542A TODO: TROCAR O PADDING CASO SEJA DIFERENTE DE DEPÓSITO */}
          <div
            className={styles.cardDetailsResultContainer}
            style={{ padding: 0 }}
          >
            {/* #B5542A TODO: SE FOR PAGAMENTO CREDIT CARD  */}
            {/* <div className={styles.holderCardDetails}>
              <span className={styles.holderTitle}>{t('name')}</span>
              <span className={styles.holderDescription}>
                Airton Senna Santos Filho
              </span>
            </div>

            <div className={styles.holderCardDetails}>
              <span className={styles.holderTitle}>{t('cardNumber')}</span>
              <span className={styles.holderDescription}>************065</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={styles.holderCardDetails}>
                <span className={styles.holderTitle}>{t('validity')}</span>
                <span className={styles.holderDescription}>02/30</span>
              </div>
              <div className={styles.holderCardDetails}>
                <span className={styles.holderTitle}>{t('cvv')}</span>
                <span className={styles.holderDescription}>054</span>
              </div>
            </div> */}

            {items?.map((item, index) => {
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
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                    <div style={{ padding: 24 }}>
                      <div className={styles.holderCardDetails}>
                        <span className={styles.holderTitle}>{t('bank')}</span>
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
                        <span className={styles.holderTitle}>{t('obs')}</span>
                        <span className={styles.holderDescription}>
                          {item.addInformation}
                        </span>
                      </div>
                    </div>
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
              Falta muito pouco para sua hospedagem! Siga as intruções que foram
              enviadas para o e-mail: <span>ederjr6@gmail.com</span>
            </span>
            <div style={{ marginBottom: 32 }}>
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
              <span className={styles.mobReturnButtonTitle}>
                {t('backHome')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
