import Head from 'next/head';
import { GetStaticProps } from 'next';
import Header from '../components/Header';
import Hero from '../components/Hero';

import styles from './home.module.scss';

// import 'react-credit-cards/lib/styles.scss';

// import 'react-credit-cards/es/styles-compiled.css';


import { Swiper, SwiperSlide } from 'swiper/react';
import CardEventType1 from '../components/cardsEvents/CardEventType1';
import { useWindowSize } from '../hooks/UseWindowSize';
import Footer from '../components/common/Footer';
import { OfficeDetails } from '../../data/officeDetails';
import { EventsHome } from '../../data/events';
import { Design } from '../../data/design';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import CardClient from '../components/CardClient';
import { HotelImages } from '../../data/images';
import HotelImagesSlider from '../components/HotelImagesSlider';
import { URLSearchParams } from 'url';
import moment from 'moment';
import {
  GetOfficeDesign,
  GetOfficeDetails,
  GetOfficeEvents,
  GetOfficeImages,
  GetOfficeReviews,
} from '../services/requests/office';
interface IHomeProps {
  officeDetails: OfficeDetails;
  design: Design;
  reviews: any[];
  events: EventsHome[];
  images: HotelImages[];
}

export default function Home(props: IHomeProps) {
  // Window Sizes
  const { width } = useWindowSize();
  const { t } = useTranslation('common');

  const swiperStyle = {
    paddingLeft:
      width >= 320 && width < 524
        ? '1rem'
        : width >= 524 && width < 1024
        ? '2rem'
        : width >= 628 && width < 1024
        ? '2rem'
        : width >= 1024 && width < 1280
        ? '4rem'
        : '8rem',
    paddingRight: 16,
    paddingBottom: 16,
    marginBottom: 48,
  };

  return (
    <>
      <Head>
        <title>{props?.design?.browserTitle}</title>
        <meta name="description" content={props?.design?.metaDescription} />
        <meta name="keywords" content={props?.design?.metaKeywords} />
        <link rel="icon" href={props?.design?.favIconUrl} />
      </Head>

      <main>
        <Header design={props.design} events={props.events} />
        <Hero officeDetails={props.officeDetails} design={props.design} />

        <div className={styles.mainBox}>
          <section className={styles.eventsContainer}>
            <h2 className={styles.title}>{t('checkOutOurUpcomingEvents')}</h2>

            <div className={`${styles.scrollContainer}`}>
              <Swiper
                spaceBetween={16}
                slidesPerView={'auto'}
                freeMode={true}
                style={swiperStyle}
              >
                {props?.events?.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    style={{ width: 'auto', marginRight: '1rem' }}
                  >
                    <CardEventType1 event={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          <HotelImagesSlider images={props?.images} />

          <section className={styles.clientsContainer}>
            <h2 className={`${styles.title}`}>
              {t('seeWhatOurCostumersAreSaying')}
            </h2>

            {/* <Swiper
                spaceBetween={16}
                slidesPerView={'auto'}
                freeMode={true}
                style={swiperStyle}
              >
                {props?.reviews?.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    style={{ width: 'auto', marginRight: '2rem' }}
                  >
                    
                  </SwiperSlide>
                ))}
              </Swiper> */}
            <div className={styles.clientsCardContainer}>
              {props?.reviews?.map((item, index) => (
                <CardClient key={index} data={item} index={index} />
              ))}
            </div>
          </section>
        </div>
        <Footer officeDetails={props?.officeDetails} design={props?.design} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const officeDetails = await GetOfficeDetails();
  const design = await GetOfficeDesign();
  const reviews = await GetOfficeReviews();
  const images = await GetOfficeImages();
  const events = await GetOfficeEvents();

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
