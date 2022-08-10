import { VerifiedUserOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Card from 'react-credit-cards';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp } from 'react-feather';
import { useSelector } from 'react-redux';
import CartModal from '../../components/CartModal';
import { CheckoutSucessModal } from '../../components/CheckoutSucessModal';
import Footer from '../../components/common/Footer';
import FooterCheckout from '../../components/common/FooterCheckout';
import Input from '../../components/common/Input';
import DynamicInfoModal from '../../components/DynamicInfoModal';
import Header from '../../components/Header';
import { useWindowSize } from '../../hooks/UseWindowSize';
import {
  GetOfficeDesign,
  GetOfficeDetails,
} from '../../services/requests/office';
import { AppStore } from '../../store/types';
import { currency } from '../../utils/currency';

import styles from './styles.module.scss';
import CreditCard from '../../components/CreditCard';

const Checkout = ({ officeDetails, design }: any) => {
  const { t } = useTranslation();

  const {
    cart: { objects, services },
  } = useSelector((state: AppStore) => state);

  // Window Sizes
  const size = useWindowSize();
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const [policy, setPolicy] = useState(0);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showDynamicInfoModal, setShowDynamicInfoModal] = useState(false);

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
            <h3>R$ 148,00</h3>
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
                      objects.slice(0, 2).map((room, index) => (
                        <>
                          <div key={index} className={styles.roomContainer}>
                            <div className={styles.imageRoomHolder}>
                              <Image
                                src={
                                  index === 1
                                    ? 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
                                    : index == 2
                                    ? 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                                    : 'https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                                }
                                alt={'Room photo'}
                                layout={'fill'}
                              />
                            </div>

                            <div className={styles.roomInfo}>
                              <div
                                className={styles.roomNameAdultChildContainer}
                              >
                                <h5>
                                  {room.infos?.adults < 2 &&
                                  room.infos?.adults > 0
                                    ? t('adultWithCount_one', {
                                        count: room.infos?.adults,
                                      })
                                    : room.infos?.adults === 0
                                    ? t('adultWithCount_other', {
                                        count: room.infos?.adults,
                                      })
                                    : t('adultWithCount_other', {
                                        count: room.infos?.adults,
                                      })}{' '}
                                  {'&'}{' '}
                                  {room.infos?.children < 2 &&
                                  room.infos?.children > 0
                                    ? t('childrenWithCount_one', {
                                        count: room.infos?.children,
                                      })
                                    : room.infos?.children === 0
                                    ? t('childrenWithCount_one', {
                                        count: room.infos?.children,
                                      })
                                    : t('childrenWithCount_other', {
                                        count: room.infos?.children,
                                      })}
                                </h5>
                                <h4>{room.infos?.objectName}</h4>
                              </div>

                              <div className={styles.roomQtndPriceContainer}>
                                <h5>{room.quantity + ' ' + t('room')} </h5>
                                <h4>
                                  {currency(room.prices[0].regularTotalAmount)}
                                </h4>
                              </div>
                            </div>
                          </div>
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
                        <h5>23 - 29 de mai.</h5>
                      </div>
                      <div>
                        <h4>
                          {t('total')}{' '}
                          <span style={{ textTransform: 'lowercase' }}>
                            {t('guest_other')}
                          </span>
                        </h4>
                        <h5>12</h5>
                      </div>
                    </div>

                    <div
                      className={styles.infoHolder}
                      style={{ flexDirection: 'column' }}
                    >
                      <h4>{t('arrivalForecast')}</h4>
                      <div className={styles.cSelect}>
                        <select name="arrivalForecast" id="pet-select">
                          <option value="">12h</option>
                          <option value="">13h</option>
                          <option value="">14h</option>
                          <option value="">15h</option>
                          <option value="">16h</option>
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
                    <h5>{currency(8574.72)}</h5>
                  </div>
                  {/* <div className={styles.row}>
                    <u>
                      <h5>Serviços</h5>
                    </u>
                    <h5>{currency(98)}</h5>
                  </div> */}
                  <div className={styles.row}>
                    <u
                      onClick={() =>
                        setShowDynamicInfoModal(!showDynamicInfoModal)
                      }
                    >
                      <h5>{t('taxes')}</h5>
                    </u>
                    <h5>{currency(98)}</h5>
                  </div>
                  <div className={styles.row}>
                    <u
                      onClick={() =>
                        setShowDynamicInfoModal(!showDynamicInfoModal)
                      }
                    >
                      <h5>{t('taxes')}</h5>
                    </u>
                    <h5>{currency(98)}</h5>
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
                  name="aa"
                  placeholder={t('name')}
                />
                <Input
                  label={t('email')}
                  type="text"
                  name="Nome"
                  placeholder="Nome"
                />
                <Input
                  label={t('telephone')}
                  type="text"
                  name="Nome"
                  placeholder="Nome"
                />
                <Input
                  label={'CPF'}
                  type="text"
                  name="Nome"
                  placeholder="Nome"
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
                    <div className={styles.payWithLogosBox}>
                      <Image
                        src={'/icons/card.svg'}
                        layout={'fill'}
                        objectFit={'contain'}
                        alt={'Credit Card Logo'}
                      />
                    </div>
                    <div className={styles.payWithLogosBox}>
                      <Image
                        src={'/icons/bank.svg'}
                        layout={'fill'}
                        objectFit={'contain'}
                        alt={'Credit Card Logo'}
                      />
                    </div>
                    <div className={styles.payWithLogosBox}>
                      <Image
                        src={'/icons/pix.svg'}
                        layout={'fill'}
                        objectFit={'contain'}
                        alt={'Credit Card Logo'}
                      />
                    </div>
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
                  <select name="arrivalForecast" id="pet-select">
                    <option value="">{t('creditCard')}</option>
                    <option value="">PIX</option>
                    <option value="">TED</option>
                  </select>
                </div>

                <CreditCard />
              </div>
            </div>
            <div className={styles.webPaymentInfos}>
              <div>
                {objects.slice(0, 2).map((room, index) => (
                  <div key={index} className={styles.roomContainer}>
                    <div className={styles.imageRoomHolder}>
                      <Image
                        src={
                          index === 1
                            ? 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
                            : index == 2
                            ? 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                            : 'https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                        }
                        layout={'fill'}
                        // width={124}
                        // height={124}
                      />
                    </div>

                    <div className={styles.roomInfo}>
                      <div className={styles.roomNameAdultChildContainer}>
                        <h5>
                          {room.infos?.adults < 2 && room.infos?.adults > 0
                            ? t('adultWithCount_one', {
                                count: room.infos?.adults,
                              })
                            : room.infos?.adults === 0
                            ? t('adultWithCount_other', {
                                count: room.infos?.adults,
                              })
                            : t('adultWithCount_other', {
                                count: room.infos?.adults,
                              })}{' '}
                          {'&'}{' '}
                          {room.infos?.children < 2 && room.infos?.children > 0
                            ? t('childrenWithCount_one', {
                                count: room.infos?.children,
                              })
                            : room.infos?.children === 0
                            ? t('childrenWithCount_one', {
                                count: room.infos?.children,
                              })
                            : t('childrenWithCount_other', {
                                count: room.infos?.children,
                              })}
                        </h5>
                        <h4>{room.infos?.objectName}</h4>
                      </div>

                      <div className={styles.roomQtndPriceContainer}>
                        <h5>{room.quantity + ' ' + t('room')} </h5>
                        <h4>{currency(room.prices[0].regularTotalAmount)}</h4>
                      </div>
                    </div>
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
                  <h5>{currency(8574.72)}</h5>
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
                  <h5>{currency(98)}</h5>
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
                  <h5>{currency(98)}</h5>
                </div>
              </div>

              <div>
                <div className={styles.row}>
                  <h4>{t('total')} (BRL)</h4>
                  <h4>{currency(2298)}</h4>
                </div>
                <motion.button
                  id={'button'}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.confirmBtn}
                  onClick={handleOpenCheckoutSuccessModal}
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
          <div className={styles.webPoliticsContainer}>
            <h3>{t('policy_other')}</h3>
            <h5>
              {t('reservationNonRefundable')}{' '}
              <a title="Políticas de reembolso" href="">
                {t('knowMore')}
              </a>
            </h5>
            <h5>
              Lorem ipsum dolor sit amet{' '}
              <a title="Política de Causas de Força Maior" href="">
                {t('knowMore')}
              </a>
            </h5>
            <div className={styles.policyCardContainer}>
              <div className={styles.policyCard}>
                <h3>{t('houseRules')}</h3>
              </div>
              <div className={styles.policyCard}>
                <h3>
                  {' '}
                  {t('health')} {'&'} {t('security')}
                </h3>
                <p>
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
                  ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
                  dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor
                  sit amet
                </p>
              </div>
              <div className={styles.policyCard}>
                <h3>{t('cancellationPolicy')}</h3>
                <p>
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
                  ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
                  dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor
                  sit amet
                </p>
              </div>
            </div>

            <h6>
              Lorem ipsum dolor sit amet. Lorem Ipsum dolor Lorem ipsum dolor
              sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit
              ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet Lorem
              ipsum dolor sit ametLorem ipsum dolor sit amet
            </h6>
          </div>

          <div className={styles.mobPoliticsContainer}>
            <h3>{t('policy_other')}</h3>
            <h5>
              Lorem ipsum dolor sit amet{' '}
              <a title="Políticas de reembolso" href="">
                {t('knowMore')}
              </a>
            </h5>
            <h5>
              Lorem ipsum dolor sit amet{' '}
              <a title="Política de Causas de Força Maior" href="">
                {t('knowMore')}
              </a>
            </h5>
            <div className={styles.policyCardContainer}>
              <div className={styles.policyCard} onClick={() => setPolicy(0)}>
                <div className={styles.row}>
                  <h3>{t('houseRules')}</h3>
                  {policy === 0 ? (
                    <ChevronUp
                      className={styles.chevronIcon}
                      width={18}
                      height={18}
                    />
                  ) : (
                    <ChevronDown
                      className={styles.chevronIcon}
                      width={18}
                      height={18}
                    />
                  )}
                </div>
                {policy === 0 && (
                  <p>
                    Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
                    ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
                    dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor
                    sit amet
                  </p>
                )}
              </div>
              <div className={styles.policyCard} onClick={() => setPolicy(1)}>
                <div className={styles.row}>
                  <h3>
                    {t('health')} {'&'} {t('security')}
                  </h3>
                  {policy === 1 ? (
                    <ChevronUp
                      className={styles.chevronIcon}
                      width={18}
                      height={18}
                    />
                  ) : (
                    <ChevronDown
                      className={styles.chevronIcon}
                      width={18}
                      height={18}
                    />
                  )}
                </div>
                {policy === 1 && (
                  <p>
                    Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
                    ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
                    dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor
                    sit amet
                  </p>
                )}
              </div>
              <div className={styles.policyCard} onClick={() => setPolicy(2)}>
                <div className={styles.row}>
                  <h3>{t('cancellationPolicy')}</h3>
                  {policy === 2 ? (
                    <ChevronUp
                      className={styles.chevronIcon}
                      width={18}
                      height={18}
                    />
                  ) : (
                    <ChevronDown
                      className={styles.chevronIcon}
                      width={18}
                      height={18}
                    />
                  )}
                </div>
                {policy === 2 && (
                  <p>
                    Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
                    ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
                    dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor
                    sit amet
                  </p>
                )}
              </div>
            </div>
          </div>

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
              onClick={handleOpenCheckoutSuccessModal}
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

  return {
    props: {
      officeDetails,
      design,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60,
  };
};

export default Checkout;
