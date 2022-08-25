import { VerifiedUserOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'react-feather';
import { useSelector } from 'react-redux';
import CartModal from '../../components/CartModal';
import { CheckoutSucessModal } from '../../components/CheckoutSucessModal';
import FooterCheckout from '../../components/common/FooterCheckout';
import Input from '../../components/common/Input';
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
import CreditCard from '../../components/CreditCard';
import { PoliciesContainer } from '../../components/PoliciesContainer';
import moment from 'moment';
import { Policy } from '../../../data/policies';
import { Design } from '../../../data/design';

import InputWithMask from '../../components/common/InputWithMask';
import { PostBooking } from '../../services/requests/booking';

interface ICheckout {
  design: Design;
  policies: Policy;
}

const Checkout = ({ design, policies }: ICheckout) => {
  const { t } = useTranslation();
  // Window Sizes
  const size = useWindowSize();
  const router = useRouter();

  const {
    cart,
    checkout: { data: checkout },
    domain: { paymentMethodTypeDomain },
  } = useSelector((state: AppStore) => state);

  const { objects, services, infos } = cart;

  useEffect(() => {
    if (checkout?.length <= 0) {
      router.push(`/`);
    }
  }, [checkout]);

  const [scrolled, setScrolled] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showDynamicInfoModal, setShowDynamicInfoModal] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [selectedPayMethod, setSelectedPayMethod] = useState(
    checkout[0]?.paymentMethodTypeCode || 0
  );

  const handleCloseCartInfoModal = () => {
    document.body.style.overflow = 'initial';
    setShowCartModal(false);
  };

  const handleCloseDynamicInfo = () => {
    document.body.style.overflow = 'initial';
    setShowDynamicInfoModal(false);
  };

  const handleOpenCheckoutSuccessModal = () => {
    document.body.style.overflow = 'hidden';
    setSuccessModalVisible(true);
  };
  const handleCloseCheckoutSuccessModal = () => {
    document.body.style.overflow = 'initial';
    setSuccessModalVisible(!successModalVisible);
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const checkInStart = parseInt(
    policies?.bookPolicy?.checkinWindow?.startTime?.substring(0, 2)
  );

  const checkInEnd =
    parseInt(policies?.bookPolicy?.checkinWindow?.endTime?.substring(0, 2)) ||
    parseInt(policies?.bookPolicy?.checkinWindow?.startTime?.substring(0, 2)) +
      0;
  const checkInOptions = checkInEnd - checkInStart + 1;

  const handleConfirm = () => {
    if (checkout?.length > 0) {
      PostBooking(
        cart,
        {
          clientName: name,
          contacts: [
            { contactText: email, contactTypeCode: 2 },
            {
              contactTypeCode: 1,
              CountryPhoneCode: '55',
              PhoneNumber: phoneNumber.substring(3, 11),
              StatePhoneCode: phoneNumber.substring(0, 2),
            },
          ],
          documentNumber: cpf,
        },
        {
          installmentCount: 1,
          paymentMethod: {
            methodDetails: [
              {
                cardSchemeTypeCode: 1,
                encryptedCardNumber: '',
                encryptedExpiryYear: '',
                encryptedSecurityCode: '',
              },
            ],
            paymentDetails: [
              { paymentInstallmentCount: 0, paymentTotalAmount: 0 },
            ],
            paymentMethodTypeCode: 0,
          },
          totalAmont: selectedPayMethod,
        }
      ).then((res) => {
        handleOpenCheckoutSuccessModal();
      });
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

          <h2>Checkout</h2>
        </div>

        <div className={styles.mobTotalPrice}>
          <div>
            <h4>{t('total')}(BRL)</h4>
          </div>
          <div>
            <h3>
              {currency(checkout[0]?.paymentDetails[0]?.paymentTotalAmount)}
            </h3>
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
                        <>
                          {item?.prices?.map((price, index) => (
                            <div key={index} className={styles.roomContainer}>
                              <div className={styles.imageRoomHolder}>
                                <Image
                                  src={item?.infos?.image}
                                  layout={'fill'}
                                />
                              </div>

                              <div className={styles.roomInfo}>
                                <div
                                  className={styles.roomNameAdultChildContainer}
                                >
                                  <div className={styles.row}>
                                    <h5>
                                      {item.infos?.adults < 2 &&
                                      item.infos?.adults > 0
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
                                      {item.infos?.children < 2 &&
                                      item.infos?.children > 0
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
                        </>
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
                        <h4>
                          {t('total')}{' '}
                          <span style={{ textTransform: 'lowercase' }}>
                            {t('guest_other')}
                          </span>
                        </h4>
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
                          {[...Array(checkInOptions)].map((_, index) => (
                            <option key={index} value="">
                              {checkInStart + index}:
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

              {size.width < 868 && (
                <div className={styles.mobPriceInformation}>
                  <h4>{t('priceInfo')}</h4>
                  <div className={styles.row}>
                    <h5>
                      {' '}
                      {t('accommodation')}+ {t('service_other')}
                    </h5>
                    <h5>
                      {currency(
                        checkout[0]?.paymentDetails[0]?.paymentTotalAmount
                      )}
                    </h5>
                  </div>
                  <div className={styles.row}>
                    <u
                      onClick={() =>
                        setShowDynamicInfoModal(!showDynamicInfoModal)
                      }
                    >
                      <h5>{t('taxes')}</h5>
                    </u>
                    <h5>{currency(cart.objects[0]?.prices[0].taxes)}</h5>
                  </div>
                  <div className={styles.row}>
                    <u
                      onClick={() =>
                        setShowDynamicInfoModal(!showDynamicInfoModal)
                      }
                    >
                      <h5>{t('taxes')}</h5>
                    </u>
                    <h5>{currency(cart.objects[0]?.prices[0].taxes)}</h5>
                  </div>

                  {/* <div className={styles.mobMoreInfoHolder}>
                    <u>
                      <h5>Mais informações</h5>
                    </u>
                  </div> */}
                </div>
              )}
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
              <div className={styles.mobPersonalDataContainer}>
                <h3>{t('personalData')}</h3>

                <Input
                  label={t('name')}
                  type="text"
                  name={t('name')}
                  placeholder={t('name')}
                />
                <Input
                  label={t('email')}
                  type="text"
                  name="Nome"
                  placeholder="Nome"
                />

                <InputWithMask
                  label={t('phoneNumber')}
                  typeInput="PHONE"
                  name={t('phoneNumber')}
                  placeholder={t('phoneNumber')}
                  value={phoneNumber}
                  setValue={setPhoneNumber}
                />

                <InputWithMask
                  label={'CPF'}
                  typeInput="CPF"
                  name="CPF"
                  placeholder="CPF"
                  value={cpf}
                  setValue={setCpf}
                />

                <div
                  className={styles.divisorContainer}
                  style={{ marginBottom: 12 }}
                >
                  <div></div>
                </div>

                <div className={styles.payWithContainer}>
                  <h3 className={styles.title}>{t('paymentMethod')}</h3>
                  <div className={styles.payWithLogosContainer}>
                    {checkout.find((c) => c.paymentMethodTypeCode === 1) && (
                      <div className={styles.payWithLogosBox}>
                        <Image
                          src={'/icons/card.svg'}
                          layout={'fill'}
                          objectFit={'contain'}
                          alt={'Credit Card Logo'}
                        />
                      </div>
                    )}
                    {checkout.find((c) => c.paymentMethodTypeCode === 4) && (
                      <div className={styles.payWithLogosBox}>
                        <Image
                          src={'/icons/bank.svg'}
                          layout={'fill'}
                          objectFit={'contain'}
                          alt={'Credit Card Logo'}
                        />
                      </div>
                    )}
                    {checkout.find((c) => c.paymentMethodTypeCode === 3) && (
                      <div className={styles.payWithLogosBox}>
                        <Image
                          src={'/icons/pix.svg'}
                          layout={'fill'}
                          objectFit={'contain'}
                          alt={'Credit Card Logo'}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* <input
                  type="text"
                  className={styles.defaultInput}
                  placeholder="Cartão de crédito"
                /> */}

                <div
                  className={styles.cSelect}
                  style={{ marginBottom: '0.5rem' }}
                >
                  <select
                    name="arrivalForecast"
                    id="pet-select"
                    onChange={(e) =>
                      setSelectedPayMethod(parseInt(e.target.value))
                    }
                  >
                    {checkout?.map((item, index) => (
                      <option key={index} value={item?.paymentMethodTypeCode}>
                        {paymentMethodTypeDomain?.data?.find(
                          (domain) =>
                            domain.domainItemCode ===
                            item?.paymentMethodTypeCode
                        )?.domainItemValue || item?.paymentMethodTypeCode}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedPayMethod === 1 && <CreditCard />}
              </div>
            </div>
            <div className={styles.webPaymentInfos}>
              <div>
                {objects.slice(0, 2).map((item, index) => (
                  <>
                    {item?.prices?.map((price, index) => (
                      <div key={index} className={styles.roomContainer}>
                        <div className={styles.imageRoomHolder}>
                          <Image src={item?.infos?.image} layout={'fill'} />
                        </div>

                        <div className={styles.roomInfo}>
                          <div className={styles.roomNameAdultChildContainer}>
                            <div className={styles.row}>
                              <h5>
                                {item.infos?.adults < 2 &&
                                item.infos?.adults > 0
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
                                {item.infos?.children < 2 &&
                                item.infos?.children > 0
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
                  </>
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
                <div
                  className={styles.divisorContainer}
                  style={{ margin: '20px 0' }}
                >
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
                    {t('accommodation')}+ {t('service_other')}
                  </h5>
                  <h5>
                    {currency(
                      checkout[0]?.paymentDetails[0]?.paymentTotalAmount
                    )}
                  </h5>
                </div>
                <div className={styles.row}>
                  <u
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      setShowDynamicInfoModal(!showDynamicInfoModal)
                    }
                  >
                    <h5>{t('fees')}</h5>
                  </u>
                  <h5>{currency(cart.objects[0]?.prices[0].fees)}</h5>
                </div>
                <div className={styles.row}>
                  <u
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      setShowDynamicInfoModal(!showDynamicInfoModal)
                    }
                  >
                    <h5>{t('taxes')}</h5>
                  </u>
                  <h5>{currency(cart.objects[0]?.prices[0].taxes)}</h5>
                </div>
              </div>

              <div>
                <div className={styles.row}>
                  <h4>{t('total')} (BRL)</h4>
                  <h4>
                    {currency(
                      checkout[0]?.paymentDetails[0]?.paymentTotalAmount
                    )}
                  </h4>
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

                <div className={styles.termsArea}>
                  <h6>
                    {t('byClickingButtonAboveAgreePolicies')}:
                    <strong>
                      {' '}
                      <u>
                        {t('reservationPolicies')}, {t('refundPolicy')}{' '}
                        {t('and')} {t('bookingRescheduling')}
                      </u>
                    </strong>
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <PoliciesContainer policies={policies} />

          <div className={styles.mobConfirmContainer}>
            <h6>
              {t('byClickingButtonBelowAgreePolicies')}:{' '}
              <strong>
                {' '}
                <u>
                  {t('reservationPolicies')}, {t('refundPolicy')} {t('and')}{' '}
                  {t('bookingRescheduling')}
                </u>
              </strong>
            </h6>

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

      {showCartModal && (
        <CartModal
          isCheckoutSeeAllData
          handleCloseCartModal={handleCloseCartInfoModal}
        />
      )}
      {showDynamicInfoModal && (
        <DynamicInfoModal handleCloseDynamicInfo={handleCloseDynamicInfo} />
      )}
      {successModalVisible && (
        <CheckoutSucessModal
          handleCloseCheckoutSucessModal={handleOpenCheckoutSuccessModal}
        />
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const officeDetails = await GetOfficeDetails();
  const design = await GetOfficeDesign();
  const policies = await GetOfficePolicies();

  return {
    props: {
      officeDetails,
      design,
      policies,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60,
  };
};

export default Checkout;
