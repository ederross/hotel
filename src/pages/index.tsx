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
import { useDispatch, useSelector } from 'react-redux';
import { dynamicOffice, officeId } from '../services/api';
import { useRouter } from 'next/router';
import moment from 'moment';
import { CleanCart, SetCartInfos } from '../store/ducks/cart/actions';
import { WhatsappButton } from '../components/WhatsappButton';
import { AppStore } from '../store/types';
import { logger } from '../components/Logger';
import Script from 'next/script';
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
  const router = useRouter();

  const {
    cart: { objects, services },
  } = useSelector((state: AppStore) => state);

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

  const handleEventSearch = (event: EventsHome) => {
    const eventEnd = new Date(event.endDate);
    eventEnd.setDate(eventEnd.getDate() + 1);
    const end = moment(eventEnd).format('YYYY-MM-DD');

    const start = moment(
      new Date(event.startDate) < new Date() ? new Date() : event.startDate
    ).format('YYYY-MM-DD');

    router.push({
      pathname: '/search',
      query: {
        startDate: start,
        endDate: end,
        adults: 1,
        children: 0,
      },
    });
    dispatch(SetCartInfos({ startDate: start, endDate: end }));
  };

  const whatsappNumber = props?.officeDetails?.contacts?.find(
    (c) => c.contactTypeCode === 5
  )?.contactText;

  useEffect(() => {
    const head = document.createElement('head');
    head.innerHTML = props?.design?.tagManagementScript;
    let node: any = head.firstChild;
    while (node) {
      const next = node.nextSibling;
      if (node.tagName === 'SCRIPT') {
        const newNode = document.createElement('script');
        if (node.src) {
          newNode.src = node.src;
        }
        while (node.firstChild) {
          newNode.appendChild(node.firstChild.cloneNode(true));
          node.removeChild(node.firstChild);
        }
        node = newNode;
      }
      document.head.appendChild(node);
      node = next;
    }
  }, []);

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
                    style={{
                      width: 'auto',
                      marginRight: '1rem',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleEventSearch(item)}
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
      {!!whatsappNumber && objects.length <= 0 && services.length <= 0 && (
        <WhatsappButton whatsappNumber={whatsappNumber} />
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
}) => {
  const xfowardedHost = req.headers['x-forwarded-host'];
  console.log(`X-fowardedHost: ${xfowardedHost}`);
  logger.info(`X-fowardedHost: ${xfowardedHost}`);

  const fwHost =
    !!xfowardedHost && xfowardedHost?.toString()?.split('.')[0] !== 'www'
      ? xfowardedHost?.toString()?.split('.')[0]
      : xfowardedHost?.toString()?.split('.')[1];

  const id = dynamicOffice && !!fwHost ? fwHost : officeId;

  const officeDetails = await GetOfficeDetails(id);
  const design = await GetOfficeDesign(id);
  const reviews = await GetOfficeReviews(id);
  const images = await GetOfficeImages(id);
  const events = await GetOfficeEvents(id);

  return {
    props: {
      officeDetails,
      design,
      reviews,
      events,
      images,
      ...(await serverSideTranslations(locale, ['common'], nextI18nConfig)),
    },
  };
};

/*export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
};*/
