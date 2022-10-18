import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Container } from './styles';
import styles from './webFilters.module.scss';
import { DateRangePicker } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Add, RemoveOutlined } from '@mui/icons-material';
import { EventsHome } from '../../../data/events';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import CardEventType2 from '../cardsEvents/CardEventType2';
import { GetCalendarSearch } from '../../services/requests/booking';
import moment from 'moment';
import { AppStore } from '../../store/types';
import { useSelector } from 'react-redux';

interface IWebFilters {
  closeDatePickerWeb: () => void;
  customDayContent: (day: any, calendar: any) => JSX.Element;
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
  events?: EventsHome[];
  calendarSearch: any[];
  setFirstMonth: Dispatch<SetStateAction<Date>>;
}

const WebFilters = ({
  closeDatePickerWeb,
  customDayContent,
  setDateState,
  dateState,
  isCalendarVisible,
  inputGuest,
  numberOfChildren,
  childrenAges,
  setChildrenAges,
  events,
  calendarSearch,
  setFirstMonth,
}: IWebFilters) => {
  const { locale } = useRouter();
  const { t } = useTranslation('common');

  const {
    cart: { infos },
  } = useSelector((state: AppStore) => state);

  const date = new Date();
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 2,
    0
  ).getDate();
  const [maxLength, setMaxLength] = useState(
    new Date(date.getFullYear() + 2, 11, lastDay)
  );

  const handleUpdateState = (props: Object) =>
    setDateState([{ ...dateState[0], ...props }]);

  const findCalendarDay = (date: Date) => {
    const res = calendarSearch?.find(
      (c) =>
        moment(new Date(c.referenceDate).setUTCHours(3)).format(
          'YYYY-MM-DD'
        ) === moment(date).format('YYYY-MM-DD')
    );
    return res ? res : '-';
  };

  const handleEventDate = (event: EventsHome) => {
    const endDate = new Date(event.endDate);
    endDate.setDate(endDate.getDate() + 1);

    const startDate =
      new Date(event.startDate) < new Date()
        ? new Date()
        : new Date(event.startDate);

    setDateState([
      {
        ...dateState[0],
        startDate,
        endDate: endDate,
      },
    ] as any);
  };

  return (
    <>
      <div
        className={styles.controlsFullContainer}
        // onClick={(e) => {
        //   e.isPropagationStopped(), closeDatePickerWeb();
        // }}
      >
        <div
          className={styles.controlsContainerHolder}
          style={{
            minWidth: inputGuest && 500,
            left: inputGuest && '50%',
            height: inputGuest && 'auto',
            paddingTop: inputGuest && '4rem',
            transform: inputGuest && 'translate(-8%, 8%)',
          }}
        >
          <div
            style={{
              position: 'relative',
            }}
          >
            <div
              style={{
                flex: 1,
                width: '100%',
              }}
            >
              {isCalendarVisible && (
                <>
                  <Container>
                    <DateRangePicker
                      onChange={(item) =>
                        setDateState([
                          { ...dateState[0], ...item.selection },
                        ] as any)
                      }
                      moveRangeOnFirstSelection={false}
                      months={2}
                      ranges={dateState}
                      direction="horizontal"
                      showDateDisplay={false}
                      editableDateInputs={false}
                      showMonthAndYearPickers={false}
                      locale={locales[locale === 'ptBR' ? 'pt' : locale]}
                      inputRanges={[]}
                      staticRanges={[]}
                      dayContentRenderer={(date: Date) =>
                        customDayContent(date, findCalendarDay(date))
                      }
                      minDate={new Date()}
                      rangeColors={['var(--primary-color)']}
                      maxDate={maxLength}
                      calendarFocus={'forwards'}
                      preventSnapRefocus
                      showPreview
                      onShownDateChange={(date) =>
                        setFirstMonth(
                          new Date(date.getFullYear(), date.getMonth(), 1)
                        )
                      }
                    />
                  </Container>

                  {events?.length > 0 && (
                    <div className={styles.eventsContainer}>
                      <h3>{t('nextEvents')}</h3>
                      <Swiper
                        spaceBetween={16}
                        slidesPerView={'auto'}
                        freeMode={true}
                        navigation={true}
                        modules={[Navigation]}
                        className={styles.swiperContainer}
                      >
                        {events?.map((event, index) => (
                          <SwiperSlide
                            onClick={() => handleEventDate(event)}
                            key={index}
                            style={{ width: 'auto', cursor: 'pointer' }}
                          >
                            <CardEventType2 event={event} />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  )}
                </>
              )}

              {inputGuest && (
                <>
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
                          <div className={styles.cSelect}>
                            <select
                              value={childrenAges[index] || ''}
                              onChange={(v) =>
                                setChildrenAges([
                                  ...[...Array(numberOfChildren)].map((_, i) =>
                                    i === index
                                      ? parseInt(v.target.value as any)
                                      : childrenAges[i || 0] || 0
                                  ),
                                ])
                              }
                            >
                              <option value={''}>{t('age')}</option>
                              {[...Array(15)].map((_, index) => (
                                <option key={index} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={closeDatePickerWeb}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -2,
          background: 'rgba(0,0,0,0.6)',
        }}
      ></div>
    </>
  );
};

export default WebFilters;
