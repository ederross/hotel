import React, { useState } from 'react';

import styles from './mobileFilters.module.scss';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { isWeekend, format } from 'date-fns';

import * as locales from 'react-date-range/dist/locale';
import styled from 'styled-components';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import CardEventType2 from '../cardsEvents/CardEventType2';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface IFilters {
  closeMobileFilters: () => void;
  handleSubmit: () => void;
}

const Filters = ({ handleSubmit, closeMobileFilters }: IFilters) => {
  const swiper = useSwiper();
  const { locale } = useRouter();
  const { t } = useTranslation('common');
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  function customDayContent(day) {
    let extraDot = null;
    // if (isWeekend(day)) {
    //   extraDot = (
    //     <div
    //       style={{
    //         height: '5px',
    //         width: '5px',
    //         borderRadius: '100%',
    //         background: 'red',
    //         position: 'absolute',
    //         top: 2,
    //         right: 2,
    //       }}
    //     />
    //   );
    // }
    return (
      <>
        <div>
          {extraDot}

          <span>{format(day, 'd')}</span>
        </div>
      </>
    );
  }

  return (
    <>
      <section className={styles.container}>
        <div
          style={{
            position: 'relative',
            height: 'auto',
          }}
        >
          <button onClick={closeMobileFilters} className={styles.btnClose}>
            {t('CLOSE')}
          </button>

          <Container>
            <h2>{t('SELECT-CHECK-IN-&-CHECK-OUT-DATES')}</h2>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setState([item?.selection] as any)}
              moveRangeOnFirstSelection={false}
              ranges={state}
              months={1}
              locale={locales[locale === 'ptBR' ? 'pt' : locale]}
              dayContentRenderer={customDayContent}
              direction={'vertical'}
              minDate={new Date()}
              rangeColors={['var(--primary-color)']}
            />
          </Container>

          <div className={styles.divisor}></div>

          <div className={styles.eventsContainer}>
            <h3>{t('NEXT-EVENTS')}</h3>
            <Swiper
              spaceBetween={16}
              slidesPerView={'auto'}
              freeMode={true}
              style={{
                paddingLeft: 16,
                paddingRight: 48,
                paddingBottom: 16,
                marginBottom: 48,
              }}
            >
              <SwiperSlide style={{ width: 'auto' }}>
                <CardEventType2 />
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <CardEventType2 />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className={styles.divisor}></div>

          <div className={styles.guestsContainer}>
            <h3>{t('GUEST_MANY')}</h3>
          </div>

          <div className={styles.buttonContainer}>
            <button onClick={handleSubmit} className={styles.searchButton}>
              {t('SEARCH')}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  /* font-family: 'DM Sans'; */
  font-weight: bold;
  padding: 0 1rem;

  .rdrCalendarWrapper {
    color: #000000;
    flex: 1;
  }

  .rdrMonth {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .rdrDateDisplayWrapper {
    background-color: white;
  }

  .rdrDateDisplayItem {
    border-radius: 2rem;
  }
`;

export default Filters;
