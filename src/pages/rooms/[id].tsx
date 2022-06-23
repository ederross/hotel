import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

import { ChevronLeft } from 'react-feather';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import SingleBedOutlinedIcon from '@mui/icons-material/SingleBedOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import {
  SignalWifi4BarOutlined,
  TvOutlined,
  LocalPhoneOutlined,
} from '@mui/icons-material';
import Head from 'next/head';
import CardService from '../../components/CardService';
import CarouselHolder from '../../components/common/CarouselHolder';
import Footer from '../../components/common/Footer';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { OfficeDetails } from '../../../data/officeDetails';
import Header from '../../components/Header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import moment from 'moment';
import { Design } from '../../../data/design';
import { useTranslation } from 'next-i18next';
import { useWindowSize } from '../../hooks/UseWindowSize';

interface IRoomDetailsProps {
  officeDetails: OfficeDetails;
  design: Design;
}

const RoomDetails = (props: IRoomDetailsProps) => {
  const { t } = useTranslation('common');

  // Window Sizes
  const size = useWindowSize();

  return (
    <>
      <Head>
        <title>Hotel</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header design={props.design} placeholder={t('YOUR-HOSTING')} />
      <main className={styles.mainBox}>
        {/* <div className={styles.btnGoBackDesk}>
          <ChevronLeft width={18} height={18} />
        </div> */}

        <div className={styles.contentBox}>
          {size.width < 868 && (
            <div className={styles.btnGoBack}>
              <ChevronLeft width={18} height={18} />
            </div>
          )}

          <div className={styles.carouselContainer}>
            <CarouselHolder data={imageData} />
          </div>

          <div className={styles.imgsBox}>
            <div
              className={styles.imgLeftSide}
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,
                backgroundSize: 'cover',
              }}
            ></div>
            <div className={styles.imgRightSide}>
              <div
                className={styles.secondImgBox}
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')`,
                  backgroundSize: 'cover',
                }}
              ></div>
              <div
                className={styles.thirdImgBox}
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1157&q=80')`,
                  backgroundSize: 'cover',
                }}
              ></div>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.infoBox}>
              <div className={styles.iconsContainerHolder}>
                <div className={styles.iconWithNumberContainer}>
                  <BedOutlinedIcon fontSize={'small'} />
                  <h5>3</h5>
                </div>
                <div className={styles.iconWithNumberContainer}>
                  <SingleBedOutlinedIcon fontSize={'small'} />
                  <h5>1</h5>
                </div>
                <div className={styles.iconWithNumberContainer}>
                  <PersonOutlinedIcon fontSize={'small'} />
                  <h5>5</h5>
                </div>
              </div>

              <h2>Quarto Estofado suíte Deluxe</h2>

              <p>
                Localizado em Terrasini, em um vale maravilhoso com vista para a
                costa do Golfo de Castellammare, Container Suite, cercado por
                uma exuberante extensão de pêras espinhosas, integra-se na
                paisagem em perfeita harmonia com o território circundante.
                {/* <span>Ler mais</span> */}
              </p>

              <div className={styles.amenitiesContainer}>
                <div className={styles.amenitie}>
                  <TvOutlined fontSize={'small'} />
                  <h5>TV</h5>
                </div>
                <div className={styles.amenitie}>
                  <SignalWifi4BarOutlined fontSize={'small'} />
                  <h5>Wi-Fi</h5>
                </div>
                <div className={styles.amenitie}>
                  <LocalPhoneOutlined fontSize={'small'} />
                  <h5>Telefone</h5>
                </div>
              </div>
            </div>

            <div className={styles.ctaBoxHolder}>
              <div className={styles.ctaBox}>
                <div></div>
              </div>
            </div>
          </div>

          <section className={styles.servicesContainer}>
            <h4 className={styles.customSubtitle}>Confira</h4>
            <h2 className={styles.customTitle}>Serviços disponíveis</h2>
            <div className={styles.gridHolder}>
              <CardService />
              <CardService />
              <CardService />
            </div>
          </section>
        </div>
      </main>

      <div className={styles.offersControlContainer}>
        <div className={styles.leftSide}>
          <h4>
            R$ 98 <span>2 noites</span>{' '}
          </h4>
          <u>
            <h6>Ver 2 ofertas</h6>
          </u>
        </div>

        <div className={styles.rightSide}>
          <button>Reservar</button>
        </div>
      </div>
      {/* <Footer officeDetails={props.officeDetails} /> */}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // pegar os quartos mais vistos e colocar nos paths

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const base_url = 'http://book.hospeda.in';
  const officeDetails = await fetch(base_url + '/offices/office1').then(
    (response) => response.json()
  );
  const design = await fetch(base_url + '/offices/office1/design').then(
    (response) => response.json()
  );
  const reviews = await fetch(base_url + '/offices/office1/reviews').then(
    (response) => response.json()
  );
  const events = await fetch(
    base_url +
      '/offices/office1/events/?' +
      new URLSearchParams({
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(2, 'M').format('YYYY-MM-DD'),
      })
  ).then((response) => response.json());
  const images = await fetch(base_url + '/offices/office1/images').then(
    (response) => response.json()
  );

  return {
    props: {
      officeDetails,
      design,
      reviews,
      events,
      images,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60,
  };
};

const imageData = [
  {
    url: 'https://images.unsplash.com/photo-1604156788856-2ce5f2171cce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'balões',
    alt: 'balões',
  },
  {
    url: 'https://images.unsplash.com/photo-1559686043-aef1bbc98d19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'balões',
    alt: 'balões',
  },
  {
    url: 'https://images.unsplash.com/photo-1514923995763-768e52f5af87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    title: 'balões',
    alt: 'balões',
  },
];

export default RoomDetails;

// export const getServerSideProps: GetServerSideProps = async ({
//   locale,
//   query,
// }) => {
//   const base_url = 'http://book.hospeda.in';

//   const { id }: any = query;

//   try {
//     const searchResult = await fetch(
//       base_url +
//         '/booking/room-search/?' +
//         new URLSearchParams({
//           officeId: 'office1',
//         })
//     )
//       .then((response) => response.json())
//       .catch(() => {
//         return false;
//       });

//     return {
//       props: {
//         searchResult: searchResult,
//         ...(await serverSideTranslations(locale, ['common'])),
//       },
//     };
//   } catch (error) {
//     console.log('ERRO', error);

//     return {
//       props: {
//         searchResult: false,
//         ...(await serverSideTranslations(locale, ['common'])),
//       },
//     };
//   }
// };
