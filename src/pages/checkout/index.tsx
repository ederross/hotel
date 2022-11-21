import { VerifiedUserOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { GetServerSideProps, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nConfig from '../../../next-i18next.config';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import CartModal from '../../components/CartModal';
import { CheckoutSucessModal } from '../../components/CheckoutSucessModal';
import FooterCheckout from '../../components/common/FooterCheckout';
import DynamicInfoModal from '../../components/DynamicInfoModal';
import Header from '../../components/Header';
import { useWindowSize } from '../../hooks/UseWindowSize';
import {
  GetOfficeDesign,
  GetOfficeDetails,
  GetOfficePolicies,
} from '../../services/requests/office';
import { AppStore } from '../../store/types';
import { currency } from '../../utils/currency';

import styles from './styles.module.scss';
import { Policy } from '../../../data/policies';
import { Design } from '../../../data/design';

import {
  IClientBooking,
  IPaymentBooking,
} from '../../services/requests/booking';
import { toast } from 'react-toastify';
import { CleanCart } from '../../store/ducks/cart/actions';
import { OfficeDetails } from '../../../data/officeDetails';
import { CheckoutPersonalData } from '../../components/CheckoutPersonalData';
import { CheckoutInfoBox } from '../../components/CheckoutInfoBox';
import { PoliciesContainer } from '../../components/PoliciesContainer';
import { CheckoutPaymentInfo } from '../../components/CheckoutPaymentInfo';
import { VerifyCheckoutFields } from '../../utils/verifyCheckoutFields';
import { dynamicOffice, officeId } from '../../services/api';
import { CheckoutSucessModalAllMethods } from '../../components/CheckoutSucessModalAllMethods';
import { CheckoutSucessModalAllMethodsMobile } from '../../components/CheckoutSucessModalAllMethods/Mobile';
import axios from 'axios';
import { logger } from '../../components/Logger';
interface ICheckout {
  design: Design;
  policies: Policy;
  officeDetails: OfficeDetails;
}

const Checkout = ({ design, policies, officeDetails }: ICheckout) => {
  const { t } = useTranslation();
  const size = useWindowSize();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.className = design?.templateName || 'default';
  }, [design]);

  const {
    cart,
    checkout: { data: checkout },
  } = useSelector((state: AppStore) => state);

  useEffect(() => {
    if (checkout?.length <= 0) {
      router.push(`/`);
    }
  }, [checkout, router]);

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

  const [scrolled, setScrolled] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showDynamicInfoModal, setShowDynamicInfoModal] = useState('');
  const [confirmData, setConfirmData] = useState<any>();

  const handleCloseCartInfoModal = () => {
    document.body.style.overflow = 'initial';
    setShowCartModal(false);
  };

  const handleCloseDynamicInfo = () => {
    document.body.style.overflow = 'initial';
    setShowDynamicInfoModal('');
  };
  const handleCloseCheckoutSuccessModal = () => {
    dispatch(CleanCart());
    router.push(`/`);
  };

  useEffect(() => {
    const onScroll = () => {
      if (window?.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window?.addEventListener('scroll', onScroll);

    return () => window?.removeEventListener('scroll', onScroll);
  }, []);

  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    cardNumber: '',
    expiryYear: '',
    securityCode: '',
  });

  const [client, setClient] = useState<IClientBooking>({
    clientName: '',
    documentNumber: '',
    contacts: [
      {
        contactTypeCode: 2,
        contactText: '',
      },
      {
        contactTypeCode: 1,
        CountryPhoneCode: '',
        StatePhoneCode: '',
        PhoneNumber: '',
      },
    ],
  });

  const [paymentBooking, setPaymentBooking] = useState<IPaymentBooking>({
    totalAmont: 0,
    installmentCount: 0,
    paymentMethod: {
      paymentMethodTypeCode: 0,
      paymentDetails: [
        {
          paymentInstallmentCount: 0,
          paymentTotalAmount: 0,
        },
      ],
      methodDetails: [
        {
          cardSchemeTypeCode: null,
          cardHolder: null,
          encryptedCardNumber: null,
          encryptedExpiryYear: null,
          encryptedSecurityCode: null,
        },
      ],
    },
  });

  const [selectedPayMethodDetails, setSelectedPayMethodDetails] = useState(-1);

  const payInfos = checkout?.find(
    (c) =>
      c.paymentMethodTypeCode ===
      paymentBooking.paymentMethod.paymentMethodTypeCode
  )?.paymentDetails[1];

  const handleConfirm = () => {
    if (VerifyCheckoutFields(client, paymentBooking, setFieldErrors)) {
      if (checkout?.length > 0) {
        if (selectedPayMethodDetails >= 0) {
          axios
            .post('/api/booking', { cart, client, payment: paymentBooking })
            .then((res) => {
              setConfirmData({
                ...res?.data,
                email: client?.contacts[0]?.contactText,
              });
            })
            .catch((err) =>
              toast.error(t('createBookingError'), toastConfig as any)
            );
        } else {
          toast.error(t('selectPlots'), toastConfig as any);
        }
      }
    } else {
      toast.error(t('dataMissing'), toastConfig as any);
    }
  };

  return (
    <>
      <Head>
        <title>{design?.browserTitle} - Checkout</title>
        <meta name="description" content={design?.metaDescription} />
        <meta name="keywords" content={design?.metaKeywords} />
        <link rel="icon" href={design?.favIconUrl} />
      </Head>

      {!confirmData ? (
        <>
          <Header design={design} />
          <main className={styles.mainBox}>
            <div
              className={styles.mobHeader}
              style={{
                boxShadow: scrolled ? '0px 1px 7px -2px #C8C8C8' : null,
              }}
            >
              <div onClick={() => router.back()} className={styles.btnGoBack}>
                <ChevronLeft width={24} height={24} />
              </div>

              <h2>{t('checkout')}</h2>
            </div>

            <div className={styles.mobTotalPrice}>
              <div>
                <h4>{t('total')}(BRL)</h4>
              </div>
              <div>
                <h3>{currency(payInfos?.paymentTotalAmount)}</h3>
              </div>
            </div>

            <div className={styles.contentBox}>
              <div className={styles.mainContainer}>
                <div className={styles.inputsContainer}>
                  <div className={styles.contentHeaderDesk}>
                    <div className={styles.btnGoBackDesk} onClick={router.back}>
                      <ChevronLeft width={18} height={18} />
                    </div>
                    <h2 className={styles.titleHeaderDesk}>Checkout</h2>
                  </div>

                  <CheckoutInfoBox policies={policies} />
                  <CheckoutPaymentInfo
                    handleConfirm={handleConfirm}
                    payInfos={payInfos}
                    setShowCartModal={setShowCartModal}
                    setShowDynamicInfoModal={setShowDynamicInfoModal}
                    showCartModal={showCartModal}
                    showDynamicInfoModal={showDynamicInfoModal}
                    isMobile
                  />
                  <div style={{ padding: '0 1rem 1rem' }}>
                    {size.width < 868 && (
                      <div
                        className={styles.lgpdAdviceContainer}
                        style={{ padding: '0 0 1rem 0' }}
                      >
                        <VerifiedUserOutlined className={styles.lockIcon} />
                        <h4>{t('lgpdMessage')}</h4>
                      </div>
                    )}
                  </div>
                  {size.width > 868 && (
                    <div
                      className={styles.divisorContainer}
                      style={{ padding: '0 1rem' }}
                    >
                      <div></div>
                    </div>
                  )}
                  <CheckoutPersonalData
                    setClient={setClient}
                    client={client}
                    paymentBooking={paymentBooking}
                    setPaymentBooking={setPaymentBooking}
                    selectedPayMethodDetails={selectedPayMethodDetails}
                    setSelectedPayMethodDetails={setSelectedPayMethodDetails}
                    fieldErrors={fieldErrors}
                    officeDetails={officeDetails}
                  />
                </div>
                <CheckoutPaymentInfo
                  handleConfirm={handleConfirm}
                  payInfos={payInfos}
                  setShowCartModal={setShowCartModal}
                  setShowDynamicInfoModal={setShowDynamicInfoModal}
                  showCartModal={showCartModal}
                  showDynamicInfoModal={showDynamicInfoModal}
                />
              </div>

              <PoliciesContainer
                policies={policies}
                handleBookingPolicies={() => setShowDynamicInfoModal('book')}
              />

              <div className={styles.mobConfirmContainer}>
                <div
                  className={styles.termsArea}
                  onClick={() => setShowDynamicInfoModal('book')}
                >
                  <h6>
                    {t('byClickingButtonBelowAgreePolicies')}:
                    <strong>
                      {' '}
                      <u>{t('reservationPolicies')}</u>
                    </strong>
                  </h6>
                </div>

                <motion.button
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.confirmBtn}
                  onClick={handleConfirm}
                >
                  {t('confirmPay')}
                </motion.button>
              </div>
            </div>
          </main>
          <FooterCheckout />
        </>
      ) : (
        <>
          {size.width < 868 ? (
            <CheckoutSucessModalAllMethodsMobile
              data={confirmData}
              payInfos={payInfos}
              officeDetails={officeDetails}
              handleCloseCheckoutSucessModal={handleCloseCheckoutSuccessModal}
              paymentBooking={paymentBooking}
            />
          ) : (
            <CheckoutSucessModalAllMethods
              data={confirmData}
              payInfos={payInfos}
              officeDetails={officeDetails}
              handleCloseCheckoutSucessModal={handleCloseCheckoutSuccessModal}
              paymentBooking={paymentBooking}
            />
          )}
        </>
      )}

      {showCartModal && (
        <CartModal
          isCheckoutSeeAllData
          handleCloseCartModal={handleCloseCartInfoModal}
        />
      )}
      {showDynamicInfoModal && (
        <DynamicInfoModal
          handleCloseDynamicInfo={handleCloseDynamicInfo}
          data={policies}
          type={showDynamicInfoModal}
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
}) => {
  const xfowardedHost = req.headers['x-forwarded-host'];
  console.log(`X-fowardedHost: ${xfowardedHost}`);
  logger.info(`X-fowardedHost: ${xfowardedHost}`);

  const fwHost = !!xfowardedHost && xfowardedHost?.toString()?.split('.')[0] !== "www"
    ? xfowardedHost?.toString()?.split('.')[0]
    : xfowardedHost?.toString()?.split('.')[1];

  console.log(fwHost);

  const id =
    dynamicOffice && !!xfowardedHost
      ? xfowardedHost?.toString()?.split('.')[0]
      : officeId;
  const officeDetails = await GetOfficeDetails(id);
  const design = await GetOfficeDesign(id);
  const policies = await GetOfficePolicies(id);

  return {
    props: {
      officeDetails,
      design,
      policies,
      ...(await serverSideTranslations(locale, ['common'], nextI18nConfig)),
    },
  };
};

/*export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const officeDetails = await GetOfficeDetails(officeId);
  const design = await GetOfficeDesign(officeId);
  const policies = await GetOfficePolicies(officeId);

  return {
    props: {
      officeDetails,
      design,
      policies,
      ...(await serverSideTranslations(locale, ['common'], nextI18nConfig)),
    },
    revalidate: 60,
  };
};*/

export default Checkout; // 893
