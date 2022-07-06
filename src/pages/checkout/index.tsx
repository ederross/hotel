import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp } from 'react-feather';
import { CheckoutSucessModal } from '../../components/CheckoutSucessModal';
import Footer from '../../components/common/Footer';
import Input from '../../components/common/Input';
import Header from '../../components/Header';
import { currency } from '../../utils/currency';

import styles from './styles.module.scss';

const Checkout = ({ officeDetails, design }: any) => {
  const { t } = useTranslation();

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

  return (
    <>
      <Head>
        <title>Hotel | Checkout</title>
      </Head>
      <Header design={design} />
      <main className={styles.mainBox}>
        <div className={styles.mobHeader}>
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
            <h3>R$ 98,00</h3>
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
                    <h4>Previsão de chegada</h4>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className={styles.divisorContainer}>
                <div></div>
              </div>
              <div className={styles.mobInfoPriceContainer}>
                <h3>Informações de preço</h3>
                <div className={styles.mobInfoHolder}>
                  <div>
                    <u>
                      {' '}
                      <h5>Hospedagem 18 noites</h5>
                    </u>
                  </div>
                  <div>
                    <u>
                      {' '}
                      <h5>R$98,00</h5>
                    </u>
                  </div>
                </div>

                <div className={styles.mobInfoTotalHolder}>
                  <div>
                    <h5>Total(BRL)</h5>
                  </div>
                  <div>
                    <h5>R$198,00</h5>
                  </div>
                </div>

                <div className={styles.mobMoreInfoHolder}>
                  <u>
                    <h5 style={{ alignSelf: 'center' }}>Mais informações</h5>
                  </u>
                </div>
              </div>

              <div className={styles.mobPersonalDataContainer}>
                <h3>Dados pessoais</h3>

                <Input
                  label={'Nome'}
                  type="text"
                  name="Nome"
                  placeholder="Nome"
                />
                {/* <input
                  type="text"
                  className={styles.defaultInput}
                  placeholder="E-mail"
                />
                <input
                  type="text"
                  className={styles.defaultInput}
                  placeholder="Telefone"
                />
                <input
                  type="text"
                  className={styles.defaultInput}
                  placeholder="CPF"
                /> */}

                <h3 className={styles.title}>Pagar com</h3>

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
              <div style={{ marginBottom: '1rem' }}>
                <h3>Quartos</h3>
                {rooms.map((room, index) => (
                  <div key={index} className={styles.roomContainer}>
                    <div className={styles.row}>
                      <h4>{room.objectName}</h4>
                      <h5>x{room.quantity}</h5>
                    </div>

                    <div className={styles.row}>
                      <h6>
                        {room.adults} {t('adult', { count: room.adults })} {'&'}{' '}
                        {room.adults} {t('children', { count: room.children })}
                      </h6>
                      <h5>{currency(room.price)}</h5>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: '2rem' }}>
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
              <div className={styles.priceInformation}>
                <h4>Informações de preço</h4>
                <div className={styles.row}>
                  <h5>Hospedagem 18 noites</h5>
                  <h5>{currency(98)}</h5>
                </div>
                <div className={styles.row}>
                  <h5>Serviços</h5>
                  <h5>{currency(98)}</h5>
                </div>
                <div className={styles.row}>
                  <h5>Taxas</h5>
                  <h5>{currency(98)}</h5>
                </div>
                <div className={styles.row}>
                  <h5>Impostos</h5>
                  <h5>{currency(98)}</h5>
                </div>
              </div>
              <div>
                <div className={styles.row}>
                  <h4>Total (BRL)</h4>
                  <h4>{currency(2298)}</h4>
                </div>
                <button
                  className={styles.confirmBtn}
                  onClick={handleOpenCheckoutSucessModal}
                >
                  Confirmar
                </button>
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
                <p>
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
                  ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
                  dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor
                  sit amet
                </p>
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
                    <ChevronUp width={18} height={18} />
                  ) : (
                    <ChevronDown width={18} height={18} />
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
                    <ChevronUp width={18} height={18} />
                  ) : (
                    <ChevronDown width={18} height={18} />
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
                    <ChevronUp width={18} height={18} />
                  ) : (
                    <ChevronDown width={18} height={18} />
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

            <button
              className={styles.confirmBtn}
              onClick={handleOpenCheckoutSucessModal}
            >
              Confirmar
            </button>
          </div>
        </div>
      </main>
      <Footer officeDetails={officeDetails} />
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

const rooms = [
  {
    objectName: 'Standard',
    adults: 2,
    children: 1,
    quantity: 1,
    price: 98,
  },
  {
    objectName: 'Master',
    adults: 3,
    children: 1,
    quantity: 1,
    price: 130,
  },
  {
    objectName: 'Luxo',
    adults: 2,
    children: 2,
    quantity: 1,
    price: 125,
  },
];

const services = [
  {
    objectName: 'Passeio de balão',
    quantity: 2,
    price: 230,
  },
];
