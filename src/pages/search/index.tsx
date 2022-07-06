import React, { useState } from 'react';
import Head from 'next/head';
import styles from './search.module.scss';
import { HotelOutlined, AttractionsOutlined } from '@mui/icons-material';
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
import { mockSearchResults } from '../../../mock/mockSearchResult';
import { mockServicesResults } from '../../../mock/mockServicesResult';

interface ISearch {
  servicesResult: any;
  searchResult: any;
  officeDetails: OfficeDetails;
  design: Design;
}

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
      servicesResult: mockServicesResults,
      searchResult: mockSearchResults,
      officeDetails,
      design,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60,
  };
};

const Search = ({
  searchResult,
  servicesResult,
  officeDetails,
  design,
}: ISearch) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [selectedTab, setSelectedTab] = useState('rooms');
  const { startDate, endDate, adults, children }: any = router.query;

  const formattedNumber = (number: number) =>
    number < 10 && number > 0 ? `0${number}` : '';

  return (
    <>
      <Head>
        <title>Hotel - Pesquisa</title>
      </Head>
      <main className={styles.mainContainer}>
        <Header design={design} />
        {!searchResult || searchResult?.errors ? (
          <>
            <section className={styles.filterInfo}>
              <div style={{ flex: 1, paddingTop: 1 }}>
                <h2>Nenhum resultado foi encontrado...</h2>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className={styles.filterInfo}>
              <div style={{ flex: 1, paddingTop: 1 }}>
                <h2>
                  <span>{formattedNumber(searchResult?.length || 0)}</span>{' '}
                  quartos com{' '}
                  <span>{formattedNumber(servicesResult?.length || 0)}</span>{' '}
                  serviços foram encontrados
                </h2>
              </div>
              <div className={styles.filtersMobileSection}>
                <div
                  style={
                    selectedTab === 'rooms'
                      ? {
                          borderBottom: '6px solid black',
                        }
                      : { opacity: 0.35, paddingBottom: '1.4rem' }
                  }
                  className={styles.filterButtonContainer}
                  onClick={() => setSelectedTab('rooms')}
                >
                  <HotelOutlined style={{ marginBottom: '0.2rem' }} />
                  <h4>Quartos</h4>
                </div>
                <div
                  style={
                    selectedTab === 'services'
                      ? {
                          borderBottom: '6px solid black',
                        }
                      : { opacity: 0.35, paddingBottom: '1.4rem' }
                  }
                  className={styles.filterButtonContainer}
                  onClick={() => setSelectedTab('services')}
                >
                  <AttractionsOutlined style={{ marginBottom: '0.2rem' }} />
                  <h4>Serviços</h4>
                </div>
              </div>
            </section>
            <div className={styles.webResults}>
              <section className={styles.contentResultContainer}>
                {searchResult?.map((room, index) => (
                  <CardRoom key={index} room={room} />
                ))}
              </section>
              <section className={styles.serviceResultContainer}>
                <h4 className={styles.subtitle}>Confira</h4>
                <h2 className={styles.title}>Serviços disponíveis</h2>
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
                  <h4 className={styles.subtitle}>Confira</h4>
                  <h2 className={styles.title}>Quartos disponíveis</h2>
                  <div className={styles.contentResultContainer}>
                    {searchResult?.map((room, index) => (
                      <CardRoom key={index} room={room} />
                    ))}
                  </div>
                </section>
              )}
              {selectedTab === 'services' && (
                <section className={styles.serviceResultContainer}>
                  <h4 className={styles.subtitle}>Confira</h4>
                  <h2 className={styles.title}>Serviços disponíveis</h2>
                  <div className={styles.contentResultContainer}>
                    {servicesResult?.map((service, index) => (
                      <CardService key={index} service={service} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          </>
        )}
        <Footer design={design} officeDetails={officeDetails} />
      </main>
    </>
  );
};

export default Search;
