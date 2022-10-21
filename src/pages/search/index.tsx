import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './search.module.scss';
import { HotelOutlined, AttractionsOutlined, ContentCutOutlined } from '@mui/icons-material';
import CardRoom from '../../components/CardRoom';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nConfig from '../../../next-i18next.config';
import { GetServerSideProps, GetStaticProps } from 'next';
import Header from '../../components/Header';
import { useTranslation } from 'next-i18next';
import Footer from '../../components/common/Footer';
import { OfficeDetails } from '../../../data/officeDetails';
import { Design } from '../../../data/design';
import CardService from '../../components/CardService';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../store/types';
import {
  GetRoomSearch,
  GetServiceSearch,
} from '../../services/requests/booking';
import {
  GetOfficeDesign,
  GetOfficeDetails,
  GetOfficeEvents,
  GetOfficeFacilities,
} from '../../services/requests/office';
import { Room } from '../../../data/room';
import { RoomDetails } from '../../components/RoomDetails';
import { Facility } from '../../../data/facilities';
import { useWindowSize } from '../../hooks/UseWindowSize';
import {
  GetAmenitiesDomain,
  GetContactDomain,
  GetFacilitiesDomain,
  GetIconsDomain,
  GetPaymethodDomain,
  GetPolicyDomain,
  GetServicePricesDomain,
  GetServicesDomain,
} from '../../services/requests/domain';
import { Domain } from '../../store/ducks/domain/types';
import {
  SetAmenitiesDomain,
  SetContactDomain,
  SetFacilitiesDomain,
  SetIconsDomain,
  SetPaymethodDomain,
  SetPolicyDomain,
  SetServicePricesDomain,
  SetServicesDomain,
} from '../../store/ducks/domain/actions';

import Skeleton from '@mui/material/Skeleton';
import { IconImportDynamically } from '../../components/common/ComponentWithIcon';
import { SetCartInfos } from '../../store/ducks/cart/actions';
import { pluralProfix } from '../../utils/pluralRules';
import { dynamicOffice, officeId } from '../../services/api';
import { EventsHome } from '../../../data/events';

interface ISearch {
  servicesResult: any;
  officeDetails: OfficeDetails;
  design: Design;
  facilities: Facility[];
  events: EventsHome[];
  iconsDomain: Domain;
  facilitiesDomain: Domain;
  contactDomain: Domain;
  amenititiesDomain: Domain;
  servicesDomain: Domain;
  servicePricesDomain: Domain;
  paymethodDomain: Domain;
  policyDomain: Domain;
}

const Search = ({
  servicesResult,
  officeDetails,
  design,
  facilities = [],
  events = [],
  amenititiesDomain,
  contactDomain,
  facilitiesDomain,
  servicePricesDomain,
  servicesDomain,
  iconsDomain,
  paymethodDomain,
  policyDomain,
}: ISearch) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation('common');
  const { width } = useWindowSize();

  useEffect(() => {
    document.documentElement.className = design?.templateName || 'default';
  }, [design]);

  const {
    domain: { facilitiesDomain: facilitiesDomainRedux },
    cart: { infos },
  } = useSelector((state: AppStore) => state);

  const [selectedTab, setSelectedTab] = useState('rooms');
  const [searchResult, setSearchResult] = useState<any>();
  const [searchLoading, setSearchLoading] = useState(true);
  const { startDate, endDate, adults, children }: any = router.query;
  const [selectedRoom, setSelectedRoom] = useState<Room>(undefined);

  const formattedNumber = (number: number) =>
    number < 10 && number > 0 ? `0${number}` : '';

  useEffect(() => {
    if (startDate && endDate && adults && children) {
      setSearchLoading(true);
      GetRoomSearch({
        startDate,
        endDate,
        adults,
        children,
        ages: infos?.ages || [],
        officeId: dynamicOffice ? window?.location?.hostname.split('.')[0] : officeId,
      })
        .then((res: any) => {
          setSearchResult(res?.data);
          setSearchLoading(false);
        })
        .catch(() => {
          console.log('>>> FALHA AO PEGAR A PESQUISA DE QUARTOS! <<<');
          setSearchResult([]);
          setSearchLoading(false);
        });
    } else {
      setSearchLoading(false);
    }
    dispatch(
      SetCartInfos({
        totalGuest: parseInt(adults) + parseInt(children),
        startDate,
        endDate,
        adults,
        children,
        ages: infos?.ages || [],
      })
    );
  }, [startDate, endDate, adults, children, dispatch]);

  useEffect(() => {
    dispatch(SetIconsDomain(iconsDomain));
    dispatch(SetAmenitiesDomain(amenititiesDomain));
    dispatch(SetContactDomain(contactDomain));
    dispatch(SetFacilitiesDomain(facilitiesDomain));
    dispatch(SetServicesDomain(servicesDomain));
    dispatch(SetServicePricesDomain(servicePricesDomain));
    dispatch(SetPaymethodDomain(paymethodDomain));
    dispatch(SetPolicyDomain(policyDomain));
  }, [
    dispatch,
    iconsDomain,
    amenititiesDomain,
    contactDomain,
    facilitiesDomain,
    servicesDomain,
    servicePricesDomain,
    paymethodDomain,
    policyDomain,
  ]);

  const GetFacilityFromDomain = (facilityCategoryTypeCode: number) =>
    facilitiesDomainRedux.data.find(
      (i) => i.domainItemCode === facilityCategoryTypeCode
    )?.domainItemValue || '-';

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
        <Header selectedRoom={selectedRoom} design={design} events={events} />
        {selectedRoom && (
          <RoomDetails room={selectedRoom} setSelectedRoom={setSelectedRoom} />
        )}

        <>
          {searchLoading ? (
            <>
              <section className={styles.filterInfo}>
                <Skeleton animation="wave" width={300} />
                <Skeleton animation="wave" width={300} />
              </section>
              <div className={styles.webResults}>
                <section className={styles.contentResultContainer}>
                  {Array.from(new Array(4)).map((_, index) => (
                    <Skeleton
                      key={index}
                      animation="wave"
                      variant="rectangular"
                      width={'100%'}
                      height={316}
                    />
                  ))}
                </section>
              </div>
              {/* Mobile Results */}
              <div className={styles.mobileResults}>
                <section
                  style={{ paddingLeft: 16, paddingRight: 16 }}
                  className={styles.serviceResultContainer}
                >
                  {Array.from(new Array(4)).map((_, index) => (
                    <Skeleton
                      key={index}
                      style={{ marginBottom: 16 }}
                      animation="wave"
                      variant="rectangular"
                      width={'100%'}
                      height={200}
                    />
                  ))}
                </section>
              </div>
            </>
          ) : (
            !selectedRoom && (
              <>
                <section className={styles.filterInfo}>
                  {searchResult?.length < 1 || searchResult?.errors ? (
                    <>
                      <section className={styles.filterInfo}>
                        <div style={{ flex: 1, paddingTop: 1 }}>
                          <h2>{t('noRoomAvailable')}</h2>
                        </div>
                      </section>
                    </>
                  ) : (
                    <div style={{ flex: 1, paddingTop: 1 }}>
                      <h2>
                        <span>
                          {formattedNumber(searchResult?.length) || 0}
                        </span>{' '}
                        {t(
                          `roomsWith_${pluralProfix(
                            searchResult?.length,
                            router.locale
                          )}`
                        )}{' '}
                        <span>
                          {formattedNumber(servicesResult?.length) || 0}
                        </span>{' '}
                        {t(
                          `servicesWereFound_${pluralProfix(
                            servicesResult?.length,
                            router.locale
                          )}`
                        )}
                      </h2>
                    </div>
                  )}
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
                {/* Desktop Results */}
                <div className={styles.webResults}>
                  {!selectedRoom && (
                    <>
                      <section className={styles.contentResultContainer}>
                        {searchResult?.map((room, index) => (
                          <CardRoom
                            isResultOneRoom={
                              searchResult?.length === 1 ? true : false
                            }
                            key={index}
                            room={room}
                            setSelectedRoom={setSelectedRoom}
                          />
                        ))}
                      </section>
                    </>
                  )}
                  {servicesResult?.length > 0 && (
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
                {/* Mobile Results */}
                <div className={styles.mobileResults}>
                  {selectedTab === 'rooms' && !selectedRoom && (
                    <section className={styles.serviceResultContainer}>
                      <h4 className={styles.subtitle}>{t('look')}</h4>
                      <h2 className={styles.title}>{t('availableRooms')}</h2>
                      <div className={styles.contentResultContainer}>
                        {searchResult?.map((room, index) => (
                          <CardRoom
                            isResultOneRoom={room.length === 1 ? true : false}
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
              </>
            )
          )}

          {!selectedRoom && facilities?.length > 0 && (
            <section className={styles.facilitiesContainerHolder}>
              <h4 className={styles.subtitle}>{t('look')}</h4>
              <h2 className={styles.title}>{t('whatThisPlaceOffer')}</h2>
              <div className={styles.facilitiesCardContainer}>
                {!!facilities &&
                  facilities?.map((facility, index) => (
                    <div key={index} className={styles.facilitiesCard}>
                      <h3>
                        {GetFacilityFromDomain(
                          facility?.facilityCategoryTypeCode
                        )}
                      </h3>
                      {facility?.facilityDetails.map((item, index) => (
                        <div className={styles.row} key={index}>
                          <IconImportDynamically
                            iconName={item?.displayIconTypeCode}
                            size={20}
                          />
                          <p>{item?.facilityName || '-'}</p>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </section>
          )}
        </>

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

/*export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const officeDetails = await GetOfficeDetails(officeId);
  const design = await GetOfficeDesign(officeId);
  const servicesResult = await GetServiceSearch(officeId);
  const facilities = await GetOfficeFacilities(officeId);
  const events = await GetOfficeEvents(officeId);

  //Domain
  const iconsDomain = await GetIconsDomain(locale);
  const facilitiesDomain = await GetFacilitiesDomain(locale);
  const contactDomain = await GetContactDomain(locale);
  const amenititiesDomain = await GetAmenitiesDomain(locale);
  const servicesDomain = await GetServicesDomain(locale);
  const servicePricesDomain = await GetServicePricesDomain(locale);
  const paymethodDomain = await GetPaymethodDomain(locale);
  const policyDomain = await GetPolicyDomain(locale);

  return {
    props: {
      servicesResult,
      officeDetails,
      design,
      facilities,
      events,
      iconsDomain,
      facilitiesDomain,
      contactDomain,
      amenititiesDomain,
      servicesDomain,
      servicePricesDomain,
      paymethodDomain,
      policyDomain,
      ...(await serverSideTranslations(locale, ['common'], nextI18nConfig)),
      revalidate: 60,
    },
  };
};*/

export const getServerSideProps: GetServerSideProps = async ({ locale, req }) => {
  const xfowardedHost = req.headers['x-forwarded-host'][0];
  console.log("X-fowardedHost: " + xfowardedHost);
  console.log("X-fowardedHost.split: " + xfowardedHost.split('.'));
  console.log("X-fowardedHost.split: " + xfowardedHost.split('.')[0]);

  const id = dynamicOffice ? xfowardedHost.split('.')[0] : officeId;

  const officeDetails = await GetOfficeDetails(id);
  const design = await GetOfficeDesign(id);
  const servicesResult = await GetServiceSearch(id);
  const facilities = await GetOfficeFacilities(id);
  const events = await GetOfficeEvents(id);

  //Domain
  const iconsDomain = await GetIconsDomain(locale);
  const facilitiesDomain = await GetFacilitiesDomain(locale);
  const contactDomain = await GetContactDomain(locale);
  const amenititiesDomain = await GetAmenitiesDomain(locale);
  const servicesDomain = await GetServicesDomain(locale);
  const servicePricesDomain = await GetServicePricesDomain(locale);
  const paymethodDomain = await GetPaymethodDomain(locale);
  const policyDomain = await GetPolicyDomain(locale);

  return {
    props: {
      servicesResult,
      officeDetails,
      design,
      facilities,
      events,
      iconsDomain,
      facilitiesDomain,
      contactDomain,
      amenititiesDomain,
      servicesDomain,
      servicePricesDomain,
      paymethodDomain,
      policyDomain,
      ...(await serverSideTranslations(locale, ['common'], nextI18nConfig)),
    },
  };
};
