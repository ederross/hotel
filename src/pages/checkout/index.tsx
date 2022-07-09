import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp } from 'react-feather';
import { useSelector } from 'react-redux';
import { CheckoutSucessModal } from '../../components/CheckoutSucessModal';
import Footer from '../../components/common/Footer';
import FooterCheckout from '../../components/common/FooterCheckout';
import Input from '../../components/common/Input';
import Header from '../../components/Header';
import { useWindowSize } from '../../hooks/UseWindowSize';
import { AppStore } from '../../store/types';
import { currency } from '../../utils/currency';

import styles from './styles.module.scss';

const Checkout = ({ officeDetails, design }: any) => {
  const { t } = useTranslation();

  const {
    cart: { rooms, services },
  } = useSelector((state: AppStore) => state);

  // Window Sizes
  const size = useWindowSize();
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const [policy, setPolicy] = useState(0);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleOpenCheckoutSucessModal = () => {
    document.body.style.overflow = 'hidden';
    setSuccessModalVisible(true);
  };
  const handleCloseCheckoutSucessModal = () => {
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
        <title>Hotel | Checkout</title>
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
            <h4>Total(BRL)</h4>
          </div>
          <div>
            <h3>R$ 148,00</h3>
          </div>
        </div>

        <div className={styles.contentBox}>
          <div className={styles.mainContainer}>
            <div className={styles.inputsContainer}>
              <div className={styles.contentHeaderDesk}>
                <div className={styles.btnGoBackDesk}>
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
                      rooms.slice(0, 2).map((room, index) => (
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
                                  {room.adults}{' '}
                                  {t('adult', { count: room.adults })} {'&'}{' '}
                                  {room.adults}{' '}
                                  {t('children', { count: room.children })}
                                </h5>
                                <h4>{room.objectName}</h4>
                              </div>

                              <div className={styles.roomQtndPriceContainer}>
                                <h5>{room.quantity + ' ' + t('room')} </h5>
                                <h4>{currency(room.price)}</h4>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    {size.width < 868 && rooms.length > 2 && (
                      <div
                        style={{ marginTop: '1.5rem' }}
                        className={styles.buttonSeeMoreRoomsContainer}
                      >
                        <button>Ver todos</button>
                      </div>
                    )}
                    {size.width < 868 && (
                      <div
                        className={styles.divisorContainer}
                        style={{ marginTop: '1rem' }}
                      >
                        <div></div>
                      </div>
                    )}

                    {size.width < 868 && (
                      <div style={{ marginTop: '20px' }}>
                        <h3>Serviços</h3>
                        {services.map((room, index) => (
                          <div key={index} className={styles.roomContainer}>
                            <div className={styles.row}>
                              <h4>{room.objectName}</h4>
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
                    )}
                  </div>

                  <div style={{ padding: '0 1rem', paddingTop: '1rem' }}>
                    <h3>Sua hospedagem</h3>

                    <div className={styles.infoHolder}>
                      <div>
                        <h4>Datas</h4>
                        <h5>23 - 29 de mai.</h5>
                      </div>
                      <div>
                        <h4>Total Hóspedes</h4>
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
                          <option value="">12h - 18h</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {size.width < 868 && (
                <div
                  className={styles.divisorContainer}
                  style={{ padding: '0 1rem' }}
                >
                  <div></div>
                </div>
              )}
              {size.width < 868 && (
                <div className={styles.mobPriceInformation}>
                  <h4>Informações de preço</h4>
                  <div className={styles.row}>
                    <h5>R$1.071 x 8 noites</h5>
                    <h5>{currency(8574.72)}</h5>
                  </div>
                  <div className={styles.row}>
                    <u>
                      <h5>Serviços</h5>
                    </u>
                    <h5>{currency(98)}</h5>
                  </div>
                  <div className={styles.row}>
                    <u>
                      <h5>Taxas</h5>
                    </u>
                    <h5>{currency(98)}</h5>
                  </div>
                  <div className={styles.row}>
                    <u>
                      <h5>Impostos</h5>
                    </u>
                    <h5>{currency(98)}</h5>
                  </div>

                  <div className={styles.mobMoreInfoHolder}>
                    <u>
                      <h5>Mais informações</h5>
                    </u>
                  </div>
                </div>
              )}
              {size.width > 868 && (
                <div
                  className={styles.divisorContainer}
                  style={{ padding: '0 1rem' }}
                >
                  <div></div>
                </div>
              )}
              <div className={styles.mobPersonalDataContainer}>
                <h3>Dados pessoais</h3>

                <Input
                  label={'Nome'}
                  type="text"
                  name="Nome"
                  placeholder="Nome"
                />
                <Input
                  label={'E-mail'}
                  type="text"
                  name="Nome"
                  placeholder="Nome"
                />
                <Input
                  label={'Telefone'}
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
                  <h3 className={styles.title}>Forma de pagamento</h3>
                  <div className={styles.payWithLogosContainer}>
                    <div className={styles.payWithLogosBox}>
                      <Image
                        src={'/icons/visa.svg'}
                        layout={'fill'}
                        objectFit={'contain'}
                        alt={'Credit Card Logo'}
                      />
                    </div>
                    <div className={styles.payWithLogosBox}>
                      <Image
                        src={'/icons/amex.svg'}
                        layout={'fill'}
                        objectFit={'contain'}
                        alt={'Credit Card Logo'}
                      />
                    </div>
                    <div className={styles.payWithLogosBox}>
                      <Image
                        src={'/icons/mastercard.svg'}
                        layout={'fill'}
                        objectFit={'contain'}
                        alt={'Credit Card Logo'}
                      />
                    </div>
                    <div className={styles.payWithLogosBox}>
                      <Image
                        src={'/icons/elo.svg'}
                        layout={'fill'}
                        objectFit={'contain'}
                        alt={'Credit Card Logo'}
                      />
                    </div>
                    <div className={styles.payWithLogosBox}>
                      <Image
                        src={'/icons/hipercard.svg'}
                        layout={'fill'}
                        objectFit={'contain'}
                        alt={'Credit Card Logo'}
                      />
                    </div>
                    <div className={styles.payWithLogosBox}>
                      <Image
                        src={'/icons/aura.svg'}
                        layout={'fill'}
                        objectFit={'contain'}
                        alt={'Credit Card Logo'}
                      />
                    </div>
                  </div>
                </div>

                <input
                  type="text"
                  className={styles.defaultInput}
                  placeholder="Cartão de crédito"
                />
                <input
                  type="text"
                  className={styles.defaultInput}
                  placeholder="Parcelamento"
                />

                <div className={styles.cardInfoHolder}>
                  <input
                    placeholder={'Número do cartão'}
                    className={styles.cardNumberInput}
                    type="text"
                  />
                  <div style={{ display: 'flex', width: '100%' }}>
                    <input
                      type="text"
                      placeholder={'Validade'}
                      className={styles.validityInput}
                    />
                    <input
                      type="text"
                      placeholder={'CVV'}
                      className={styles.cvvInput}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.webPaymentInfos}>
              <div>
                {rooms.slice(0, 2).map((room, index) => (
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
                          {room.adults} {t('adult', { count: room.adults })}{' '}
                          {'&'} {room.adults}{' '}
                          {t('children', { count: room.children })}
                        </h5>
                        <h4>{room.objectName}</h4>
                      </div>

                      <div className={styles.roomQtndPriceContainer}>
                        <h5>{room.quantity + ' ' + t('room')} </h5>
                        <h4>{currency(room.price)}</h4>
                      </div>
                    </div>
                  </div>
                ))}

                {rooms.length > 2 && (
                  <div className={styles.buttonSeeMoreRoomsContainer}>
                    <button>Ver todos</button>
                  </div>
                )}

                <div style={{ marginTop: '20px' }}>
                  <h3>Serviços</h3>
                  {services.map((room, index) => (
                    <div key={index} className={styles.roomContainer}>
                      <div className={styles.row}>
                        <h4>{room.objectName}</h4>
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

              <div className={styles.priceInformation}>
                <h4>Informações de preço</h4>
                <div className={styles.row}>
                  <h5>R$1.071 x 8 noites</h5>
                  <h5>{currency(8574.72)}</h5>
                </div>
                <div className={styles.row}>
                  <u>
                    <h5>Serviços</h5>
                  </u>
                  <h5>{currency(98)}</h5>
                </div>
                <div className={styles.row}>
                  <u>
                    <h5>Taxas</h5>
                  </u>
                  <h5>{currency(98)}</h5>
                </div>
                <div className={styles.row}>
                  <u>
                    <h5>Impostos</h5>
                  </u>
                  <h5>{currency(98)}</h5>
                </div>
              </div>

              <div>
                <div className={styles.row}>
                  <h4>Total (BRL)</h4>
                  <h4>{currency(2298)}</h4>
                </div>
                <motion.button
                  id={'button'}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.confirmBtn}
                  onClick={handleOpenCheckoutSucessModal}
                >
                  {t('confirmPay')}
                </motion.button>

                <div className={styles.termsArea}>
                  <h6>
                    Ao clicar no botão acima, concordo com as seguintes
                    políticas:{' '}
                    <strong>
                      {' '}
                      <u>
                        Políticas de Reserva, Política de Reembolso e Remarcação
                        de Reserva.
                      </u>
                    </strong>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.webPoliticsContainer}>
            <h3>Políticas</h3>
            <h5>
              Está reserva não é reembolsável.{' '}
              <a title="Políticas de reembolso" href="">
                Saiba mais
              </a>
            </h5>
            <h5>
              Nossa Política de Causas de Força Maior não cobre interrupções de
              viagem causadas pela COVID-19.{' '}
              <a title="Política de Causas de Força Maior" href="">
                Saiba mais
              </a>
            </h5>
            <div className={styles.policyCardContainer}>
              <div className={styles.policyCard}>
                <h3>Regras da casa</h3>
              </div>
              <div className={styles.policyCard}>
                <h3>Saúde {'&'} segurança</h3>
                <p>
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
                  ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
                  dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor
                  sit amet
                </p>
              </div>
              <div className={styles.policyCard}>
                <h3>Política de cancelamento</h3>
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
            <h3>Políticas</h3>
            <h5>
              Está reserva não é reembolsável.{' '}
              <a title="Políticas de reembolso" href="">
                Saiba mais
              </a>
            </h5>
            <h5>
              Nossa Política de Causas de Força Maior não cobre interrupções de
              viagem causadas pela COVID-19.{' '}
              <a title="Política de Causas de Força Maior" href="">
                Saiba mais
              </a>
            </h5>
            <div className={styles.policyCardContainer}>
              <div className={styles.policyCard} onClick={() => setPolicy(0)}>
                <div className={styles.row}>
                  <h3>Regras da casa</h3>
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
                  <h3>Saúde {'&'} segurança</h3>
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
                  <h3>Política de cancelamento</h3>
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
              Ao clicar no botão abaixo, concordo com as seguintes políticas:{' '}
              <strong>
                {' '}
                <u>
                  Políticas de Reserva, Política de Reembolso e Remarcação de
                  Reserva.
                </u>
              </strong>
            </h6>

            <motion.button
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              whileTap={{ scale: 0.9 }}
              className={styles.confirmBtn}
              onClick={handleOpenCheckoutSucessModal}
            >
              {t('confirmPay')}
            </motion.button>
          </div>
        </div>
      </main>
      <FooterCheckout />
      {successModalVisible && (
        <CheckoutSucessModal
          handleCloseCheckoutSucessModal={handleCloseCheckoutSucessModal}
        />
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const base_url = 'http://book.hospeda.in';

  const officeDetails = await fetch(base_url + '/offices/office1').then(
    (response) => response.json()
  );

  const design = await fetch(base_url + '/offices/office1/design').then(
    (response) => response.json()
  );

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
