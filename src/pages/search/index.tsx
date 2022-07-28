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
  GetOfficeFacilities,
} from '../../services/requests/office';
import { mockSearchResults } from '../../../mock/mockSearchResult';
import { Room } from '../../../data/room';
import { RoomDetails } from '../../components/RoomDetails';
import { Facility } from '../../../data/facilities';
import { useWindowSize } from '../../hooks/UseWindowSize';

interface ISearch {
  servicesResult: any;
  officeDetails: OfficeDetails;
  design: Design;
  facilities: Facility[];
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const officeDetails = await GetOfficeDetails();
  const design = await GetOfficeDesign();
  const servicesResult = await GetServiceSearch();
  const facilities = await GetOfficeFacilities();

  return {
    props: {
      servicesResult,
      officeDetails,
      design,
      facilities,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60,
  };
};

const Search = ({
  servicesResult,
  officeDetails,
  design,
  facilities,
}: ISearch) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { width } = useWindowSize();

  const {
    cart: { rooms, services },
  } = useSelector((state: AppStore) => state);

  const [selectedTab, setSelectedTab] = useState('rooms');
  const [cartOpen, setCartOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(mockSearchResults);
  const { startDate, endDate, adults, children }: any = router.query;
  const [selectedRoom, setSelectedRoom] = useState<Room>(undefined);

  const formattedNumber = (number: number) =>
    number < 10 && number > 0 ? `0${number}` : '';

  useEffect(() => {
    if (startDate && endDate && adults && children) {
      GetRoomSearch({ startDate, endDate, adults, children })
        .then((res) => setSearchResult(res?.data))
        .catch(() => {
          console.log('>>> FALHA AO PEGAR A PESQUISA DE QUARTOS! <<<');
          setSearchResult(mockSearchResults);
        });
    }
  }, [startDate, endDate, adults, children]);

  return (
    <>
      <Head>
        <title>{design?.browserTitle} - Pesquisa</title>
        <meta name="description" content={design?.metaDescription} />
        <meta name="keywords" content={design?.metaKeywords} />
        <link rel="icon" href={design?.favIconUrl} />
      </Head>
      <main
        className={styles.mainContainer}
        style={{
          padding:
            selectedRoom && width < 868
              ? '0'
              : selectedRoom && width > 868
              ? '5rem 0 0'
              : '6rem 0 0',
        }}
      >
        <Header selectedRoom={selectedRoom} design={design} />
        {selectedRoom && (
          <RoomDetails room={selectedRoom} setSelectedRoom={setSelectedRoom} />
        )}
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
            {!selectedRoom && (
              <section className={styles.filterInfo}>
                <div style={{ flex: 1, paddingTop: 1 }}>
                  <h2>
                    <span>{formattedNumber(searchResult?.length) || 0}</span>{' '}
                    {t('roomsWith_other')}{' '}
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
            )}
            <div className={styles.webResults}>
              {!selectedRoom && (
                <section className={styles.contentResultContainer}>
                  {searchResult?.map((room, index) => (
                    <CardRoom
                      key={index}
                      room={room}
                      setSelectedRoom={setSelectedRoom}
                    />
                  ))}
                </section>
              )}
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

            {/* Mobile */}
            <div className={styles.mobileResults}>
              {selectedTab === 'rooms' && !selectedRoom && (
                <section className={styles.serviceResultContainer}>
                  <h4 className={styles.subtitle}>{t('look')}</h4>
                  <h2 className={styles.title}>{t('availableRooms')}</h2>
                  <div className={styles.contentResultContainer}>
                    {searchResult?.map((room, index) => (
                      <CardRoom
                        key={index}
                        room={room}
                        setSelectedRoom={setSelectedRoom}
                      />
                    ))}
                  </div>
                </section>
              )}
              {selectedTab === 'services' || selectedRoom ? (
                <section
                  className={styles.serviceResultContainer}
                  style={{
                    marginTop: selectedRoom && '2rem',
                    borderTop: selectedRoom && '1px solid var(--gray-150)',
                    paddingTop: selectedRoom && '2rem',
                    paddingBottom: width < 868 && '8rem',
                  }}
                >
                  <h4 className={styles.subtitle}>{t('look')}</h4>
                  <h2 className={styles.title}>{t('availableServices')}</h2>
                  <div className={styles.contentResultContainer}>
                    {servicesResult?.map((service, index) => (
                      <CardService key={index} service={service} />
                    ))}
                  </div>
                </section>
              ) : (
                <div />
              )}
            </div>

            {!selectedRoom && facilities && (
              <section className={styles.facilitiesContainerHolder}>
                <h4 className={styles.subtitle}>{t('look')}</h4>
                <h2 className={styles.title}>{t('whatThisPlaceOffer')}</h2>
                <div className={styles.facilitiesCardContainer}>
                  {facilities?.map((facility, index) => (
                    <div key={index} className={styles.facilitiesCard}>
                      <h3>{facility?.categoryName || '-'}</h3>
                      {facility?.facilityDetails?.map((item, index) => (
                        <div className={styles.row} key={index}>
                          <CookieOutlined fontSize={'small'} />
                          <p>{item?.facilityName || '-'}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {selectedRoom && width < 868 ? (
          <div></div>
        ) : (
          <Footer design={design} officeDetails={officeDetails} />
        )}
      </main>
    </>
  );
};

export default Search;
