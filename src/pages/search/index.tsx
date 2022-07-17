import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './search.module.scss';
import {
  HotelOutlined,
  AttractionsOutlined,
  CookieOutlined,
} from '@mui/icons-material';
import CardRoom from '../../components/CardRoom';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Header from '../../components/Header';
import { useTranslation } from 'next-i18next';
import Footer from '../../components/common/Footer';
import { OfficeDetails } from '../../../data/officeDetails';
import { Design } from '../../../data/design';
import CardService from '../../components/CardService';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/types';
import {
  GetRoomSearch,
  GetServiceSearch,
} from '../../services/requests/booking';
import {
  GetOfficeDesign,
  GetOfficeDetails,
} from '../../services/requests/office';
import { mockSearchResults } from '../../../mock/mockSearchResult';

interface ISearch {
  servicesResult: any;
  officeDetails: OfficeDetails;
  design: Design;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const officeDetails = await GetOfficeDetails();
  const design = await GetOfficeDesign();
  const servicesResult = await GetServiceSearch();

  return {
    props: {
      servicesResult,
      officeDetails,
      design,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60,
  };
};

const Search = ({ servicesResult, officeDetails, design }: ISearch) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const {
    cart: { rooms, services },
  } = useSelector((state: AppStore) => state);

  const [selectedTab, setSelectedTab] = useState('rooms');
  const [cartOpen, setCartOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(mockSearchResults);
  const { startDate, endDate, adults, children }: any = router.query;

  const formattedNumber = (number: number) =>
    number < 10 && number > 0 ? `0${number}` : '';

  // useEffect(() => {
  //   if (startDate && endDate && adults && children) {
  //     GetRoomSearch({ startDate, endDate, adults, children }).then((res) =>
  //       setSearchResult(res)
  //     );
  //   }
  // }, [startDate, endDate, adults, children]);

  return (
    <>
      <Head>
        <title>{design?.browserTitle} - Pesquisa</title>
        <meta name="description" content={design?.metaDescription} />
        <meta name="keywords" content={design?.metaKeywords} />
        <link rel="icon" href={design?.favIconUrl} />
      </Head>
      <main className={styles.mainContainer}>
        <Header design={design} />
        {!searchResult || searchResult?.errors ? (
          <>
            <section className={styles.filterInfo}>
              <div style={{ flex: 1, paddingTop: 1 }}>
                <h2>{t('noResultWereFound')}</h2>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className={styles.filterInfo}>
              <div style={{ flex: 1, paddingTop: 1 }}>
                <h2>
                  <span>{formattedNumber(searchResult?.length) || 0}</span>{' '}
                  {t('roomsWith_other')} {' '}
                  <span>{formattedNumber(servicesResult?.length) || 0}</span>{' '}
                  {t('servicesWereFound_other')}
                </h2>
              </div>
              <div className={styles.filtersMobileSection}>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={
                    selectedTab === 'rooms'
                      ? {
                          borderBottom: '6px solid black',
                        }
                      : { opacity: 0.35, paddingBottom: '1.4rem' }
                  }
                  className={styles.filterButtonContainer}
                  onClick={() => {
                    (document.body.style.overflow = 'initial'),
                      setSelectedTab('rooms');
                  }}
                >
                  <HotelOutlined style={{ marginBottom: '0.2rem' }} />
                  <h4>{t('room_other')}</h4>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={
                    selectedTab === 'services'
                      ? {
                          borderBottom: '6px solid black',
                        }
                      : { opacity: 0.35, paddingBottom: '1.4rem' }
                  }
                  className={styles.filterButtonContainer}
                  onClick={() => {
                    (document.body.style.overflow = 'initial'),
                      setSelectedTab('services');
                  }}
                >
                  <AttractionsOutlined style={{ marginBottom: '0.2rem' }} />
                  <h4>{t('service_other')}</h4>
                </motion.div>
              </div>
            </section>
            <div className={styles.webResults}>
              <section className={styles.contentResultContainer}>
                {searchResult?.map((room, index) => (
                  <CardRoom key={index} room={room} />
                ))}
              </section>
              <section className={styles.serviceResultContainer}>
                <h4 className={styles.subtitle}>{t('look')}</h4>
                <h2 className={styles.title}>{t('availableServices')}</h2>
                <div className={styles.contentResultContainer}>
                  {servicesResult?.map((service, index) => (
                    <CardService key={index} service={service} />
                  ))}
                </div>
              </section>
            </div>
            <div className={styles.mobileResults}>
              {selectedTab === 'rooms' && (
                <section className={styles.serviceResultContainer}>
                  <h4 className={styles.subtitle}>{t('look')}</h4>
                  <h2 className={styles.title}>{t('availableRooms')}</h2>
                  <div className={styles.contentResultContainer}>
                    {searchResult?.map((room, index) => (
                      <CardRoom key={index} room={room} />
                    ))}
                  </div>
                </section>
              )}
              {selectedTab === 'services' && (
                <section className={styles.serviceResultContainer}>
                  <h4 className={styles.subtitle}>{t('look')}</h4>
                  <h2 className={styles.title}>{t('availableServices')}</h2>
                  <div className={styles.contentResultContainer}>
                    {servicesResult?.map((service, index) => (
                      <CardService key={index} service={service} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            <section className={styles.facilitiesContainerHolder}>
              <h4 className={styles.subtitle}>{t('look')}</h4>
              <h2 className={styles.title}>{t('whatThisPlaceOffer')}</h2>
              <div className={styles.facilitiesCardContainer}>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className={styles.facilitiesCard}>
                    <h3>{t('whatThisPlaceOffer')}</h3>
                    {[...Array(7)].map((_, index) => (
                      <div className={styles.row} key={index}>
                        <CookieOutlined fontSize={'small'} />
                        <p>{t('kitchen')}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <Footer design={design} officeDetails={officeDetails} />
      </main>
    </>
  );
};

export default Search;
