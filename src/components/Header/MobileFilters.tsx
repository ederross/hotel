import React, { Dispatch, SetStateAction, useState } from 'react';

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
import { Add, Close, RemoveOutlined } from '@mui/icons-material';

interface IFilters {
  closeMobileFilters: () => void;
  handleSubmit: () => void;
  customDayContent: (day: any) => JSX.Element;
  dateState: {
    startDate: Date;
    endDate: Date;
    key: string;
    adults: number;
    children: number;
  }[];
  setDateState: any;
  isCalendarVisible: boolean;
  inputGuest: boolean;
  numberOfChildren: number;
  childrenAges: number[];
  setChildrenAges: Dispatch<SetStateAction<number[]>>;
}

const Filters = ({
  handleSubmit,
  closeMobileFilters,

  setDateState,
  dateState,
  isCalendarVisible,
  inputGuest,
  numberOfChildren,
  childrenAges,
  setChildrenAges,
}: IFilters) => {
  const { locale } = useRouter();
  const { t } = useTranslation('common');

  const date = new Date();
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 2,
    0
  ).getDate();
  const maxLength = new Date(date.getFullYear() + 2, 11, lastDay);

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

  const handleUpdateState = (props: Object) =>
    setDateState([{ ...dateState[0], ...props }]);

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
            {/* {t('close')} */}
            <Close className={styles.closeIcon} />
          </button>

          <Container>
            <h2>{t('selectCheckInCheckOutDates')}</h2>
            <DateRange
              editableDateInputs={true}
              onChange={(item) =>
                setDateState([{ ...dateState[0], ...item.selection }] as any)
              }
              moveRangeOnFirstSelection={false}
              ranges={dateState}
              months={1}
              locale={locales[locale === 'ptBR' ? 'pt' : locale]}
              dayContentRenderer={customDayContent}
              direction={'vertical'}
              minDate={new Date()}
              rangeColors={['var(--primary-color)']}
              showMonthAndYearPickers={true}
              showPreview
              maxDate={maxLength}
            />
          </Container>

          <div className={styles.divisor}></div>

          <div className={styles.eventsContainer}>
            <h3>{t('nextEvents')}</h3>
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
          <h3>{t('guest_other')}</h3>

          <div className={styles.guestsContainer}>
            <h4>{t('adult_other')}</h4>
            <div className={styles.addButtons}>
              <button
                disabled={dateState[0].adults < 2}
                onClick={() =>
                  handleUpdateState({ adults: dateState[0].adults - 1 })
                }
              >
                <RemoveOutlined className={styles.removeIcon} />
              </button>
              <h5>{dateState[0].adults}</h5>
              <button
                onClick={() =>
                  handleUpdateState({ adults: dateState[0].adults + 1 })
                }
              >
                <Add className={styles.addIcon} />
              </button>
            </div>
          </div>
          <div
            className={styles.guestsContainer}
            style={{ marginTop: '1.5rem', border: 'none' }}
          >
            <h4>{t('children_other')}</h4>
            <div className={styles.addButtons}>
              <button
                disabled={dateState[0].children <= 0}
                onClick={() =>
                  handleUpdateState({
                    children: dateState[0].children - 1,
                  })
                }
              >
                <RemoveOutlined className={styles.removeIcon} />
              </button>
              <h5>{dateState[0].children}</h5>
              <button
                onClick={() =>
                  handleUpdateState({
                    children: dateState[0].children + 1,
                  })
                }
              >
                <Add className={styles.addIcon} />
              </button>
            </div>
          </div>

          {numberOfChildren > 0 && (
            <div className={styles.childrenAgeContainer}>
              <h4 className={styles.title}>{t('selectAge')}</h4>
              {[...Array(numberOfChildren)].map((_, index) => (
                <div
                  key={index}
                  className={styles.sideToSideAgeControllerContainer}
                >
                  <h4>
                    {index + 1}º {t('children_one')}
                  </h4>
                  <select name="pets" id="pet-select">
                    <option value="">{t('age')}</option>
                    {[...Array(15)].map((_, index) => (
                      <option key={index} value="one">
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}

          <div className={styles.buttonContainer}>
            <button onClick={handleSubmit} className={styles.searchButton}>
              {t('search')}
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
