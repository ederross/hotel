import Head from 'next/head';
import { GetServerSideProps, GetStaticProps } from 'next';
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
import nextI18nConfig from '../../next-i18next.config';
import CardClient from '../components/CardClient';
import { HotelImages } from '../../data/images';
import HotelImagesSlider from '../components/HotelImagesSlider';
import {
  GetOfficeDesign,
  GetOfficeDetails,
  GetOfficeEvents,
  GetOfficeImages,
  GetOfficeReviews,
} from '../services/requests/office';
import { useEffect } from 'react';
import { SetCheckoutRedux } from '../store/ducks/checkout/actions';
import { useDispatch } from 'react-redux';
import { dynamicOffice, officeId } from '../services/api';
interface IHomeProps {
  officeDetails: OfficeDetails;
  design: Design;
  reviews: any[];
  events: EventsHome[];
  images: HotelImages[];
}

export default function Home(props: IHomeProps) {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const { t } = useTranslation('common');

  useEffect(() => {
    document.documentElement.className =
      props?.design?.templateName || 'default';
  }, [props]);

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

  useEffect(() => {
    dispatch(SetCheckoutRedux([]));
  }, [dispatch]);

  return (
    <div>
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
          <section
            className={styles.eventsContainer}
            style={{
              display: props.events?.length > 0 ? 'flex' : 'none',
              borderBottom: props.events?.length > 0 && '1px solid var(--gray)',
            }}
          >
            {props.events?.length > 0 && (
              <h2 className={styles.title}>{t('checkOutOurUpcomingEvents')}</h2>
            )}

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

          <HotelImagesSlider events={props?.events} images={props?.images} />

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
        <Footer
          officeDetails={props?.officeDetails}
          design={props?.design}
          marginTop={width < 868 && '4rem'}
        />
      </main>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({
//   locale,
//   req,
// }) => {
//   const id = dynamicOffice ? req.headers.host : officeId;

//   const officeDetails = await GetOfficeDetails(id);
//   const design = await GetOfficeDesign(id);
//   const reviews = await GetOfficeReviews(id);
//   const images = await GetOfficeImages(id);
//   const events = await GetOfficeEvents(id);

//   return {
//     props: {
//       officeDetails,
//       design,
//       reviews,
//       events,
//       images,
//       ...(await serverSideTranslations(locale, ['common'], nextI18nConfig)),
//     },
//   };
// };

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const officeDetails = await GetOfficeDetails(officeId);
  const design = await GetOfficeDesign(officeId);
  const reviews = await GetOfficeReviews(officeId);
  const images = await GetOfficeImages(officeId);
  const events = await GetOfficeEvents(officeId);
  return {
    props: {
      officeDetails,
      design,
      reviews,
      events,
      images,
      ...(await serverSideTranslations(locale, ['common'], nextI18nConfig)),
    },
    revalidate: 60,
  };
};
