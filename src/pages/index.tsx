import Head from 'next/head';
import { GetStaticProps } from 'next';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CarouselHolder from '../components/common/CarouselHolder';

import styles from './home.module.scss';

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
interface IHomeProps {
  officeDetails: OfficeDetails;
  design: Design;
  reviews: any[];
  events: EventsHome[];
  images: HotelImages[];
}

export default function Home(props: IHomeProps) {
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
        <Header design={props.design} placeholder="Sua Hospedagem" />
        <Hero officeDetails={props.officeDetails} design={props.design} />

        <section className={styles.eventsContainer}>
          <h2 className={styles.title}>
            {/* <FormattedMessage
              id="page.home.section.event.title"
              values={{ b: (chunks) => <b>{chunks}</b> }}
            /> */}
            {t('EDER_NAME')}
          </h2>

          <div className={`${styles.scrollContainer} ${styles.grabbable}`}>
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
          <h2 className={styles.title} style={{ textAlign: 'center' }}>
            Confira o que nossos
            <br />
            clientes estão dizendo
          </h2>

          <div className={`${styles.scrollContainer} ${styles.grabbable}`}>
            <Swiper
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
                  <CardClient data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <Footer officeDetails={props.officeDetails} />
      </main>
    </>
  );
}

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
  const events = await fetch(base_url + '/offices/office1/events').then(
    (response) => response.json()
  );
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
