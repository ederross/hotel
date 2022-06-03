import React, { useState } from 'react';

import styles from './styles.module.scss';

import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays, isWeekend, format } from 'date-fns';

import * as locales from 'react-date-range/dist/locale';
import styled from 'styled-components';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { FreeMode } from 'swiper';
import CardEventType2 from '../cardsEvents/CardEventType2';

export interface IFilters {}

const Filters = ({}: IFilters) => {
  const swiper = useSwiper();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  // function customDayContent(day) {
  //   let extraDot = null;
  //   if (isWeekend(day)) {
  //     extraDot = (
  //       <div
  //         style={{
  //           height: '5px',
  //           width: '5px',
  //           borderRadius: '100%',
  //           background: 'red',
  //           position: 'absolute',
  //           top: 2,
  //           right: 2,
  //         }}
  //       />
  //     );
  //   }
  //   return (
  //     <>
  //       <div>
  //         {extraDot}

  //         <span>{format(day, 'd')}</span>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      <section className={styles.container}>
        <div
          style={{
            position: 'relative',
            height: 'auto',
          }}
        >
          <button className={styles.btnClose}>Fechar</button>

          <Container>
            <h2>Selecione as datas de Check-in {'&'} Check-out</h2>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setState([item?.selection] as any)}
              moveRangeOnFirstSelection={false}
              ranges={state}
              months={1}
              locale={locales['pt']}
              // dayContentRenderer={customDayContent}
              direction={'vertical'}
              minDate={new Date()}
              rangeColors={['var(--primary-color)']}
            />
          </Container>

          <div className={styles.divisor}></div>

          <div className={styles.eventsContainer}>
            <h3>Próximos Eventos</h3>
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
            <h3>Hóspedes</h3>
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
  font-family: 'DM Sans';
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
