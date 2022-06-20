import styled from 'styled-components';
import { Search, Menu, User } from 'react-feather';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';
import Filters from '../Filters';

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import * as locales from 'react-date-range/dist/locale';
import { addDays, format } from 'date-fns';
import { useWindowSize } from '../../hooks/UseWindowSize';
import { Design } from '../../../data/design';

interface IHeader {
  placeholder: string;
  design: Design;
}

export default function Header({ placeholder, design }: IHeader) {
  const router = useRouter();

  const navRef = useRef(null);
  const headerRef = useRef(null);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const primaryLocationRef = useRef(null);
  const secondaryLocationRef = useRef(null);

  // Window Sizes
  const size = useWindowSize();

  //form data

  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  //Data Picker
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection',
    },
  ]);

  const openDatePicker = () => {
    setInputFocus(true);
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (!(size.width >= 868) && secondaryLocationRef.current) {
        secondaryLocationRef.current.focus();
      }
    }, 10);
  };

  const closeDatePickerWeb = () => {
    setInputFocus(false);
    setLocation('');
    setNumberOfChildren(0);
    setNumberOfAdults(0);
    setCheckInDate('');
    setCheckOutDate('');
    document.body.style.overflow = 'initial';
  };

  const closeMobileFilters = () => {
    setInputFocus(false);
    setLocation('');
    setNumberOfChildren(0);
    setNumberOfAdults(0);
    setCheckInDate('');
    setCheckOutDate('');
    document.body.style.overflow = 'initial';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!location) {
    //   primaryLocationRef.current.focus();
    //   return;
    // }
    router.push({
      pathname: '/search',
      // query: {
      //   location: location,
      //   checkIn: checkInDate.toString(),
      //   checkOut: checkOutDate.toString(),
      //   guests: numberOfChildren + numberOfAdults,
      // },
    });
    setTimeout(() => closeMobileFilters(), 100);
  };

  // useEffect(() => {
  //   const handleClick = (event) => {
  //     if (!headerRef.current.contains(event.target)) {
  //       closeMobileFilters();
  //     }
  //   };

  //   document.addEventListener('click', handleClick);
  //   return () => document.removeEventListener('click', handleClick);
  // }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          {/* <span
            style={{
              fontSize: 10,
              position: 'absolute',
              bottom: -20,
              right: '55%',
            }}
          >
            999
          </span> */}
        </div>
      </>
    );
  }

  return (
    <header
      ref={headerRef}
      className={` ${styles.headerSection} ${
        scrolled || inputFocus || router.pathname !== '/'
          ? styles.scrolled
          : null
      }
        ${inputFocus ? styles.inputFocus : null}`}
    >
      <div className={styles.headerInner}>
        <div
          className={styles.logo}
          style={{ color: inputFocus || scrolled ? 'black' : 'white' }}
          onClick={() => router.push('/')}
        >
          {!logoError ? (
            <img
              src={design?.logoUrl}
              alt={design?.browserTitle}
              title={design?.browserTitle}
              onError={() => setLogoError(true)}
              draggable={false}
            />
          ) : (
            <span>{design?.browserTitle}</span>
          )}
        </div>

        {/* Start Dynamic Input Search */}
        {!inputFocus && size.width <= 868 && (
          <>
            <form className={styles.search}>
              <input
                type="text"
                ref={primaryLocationRef}
                placeholder={placeholder ? placeholder : 'Encontrar hospedagem'}
                onFocus={openDatePicker}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={
                  inputFocus &&
                  !(
                    location &&
                    checkInDate &&
                    checkOutDate &&
                    (numberOfAdults || numberOfChildren)
                  )
                }
                onClick={handleSubmit}
                aria-label="search places"
              >
                <Search />
                <span>Search</span>
              </button>
            </form>
          </>
        )}

        {/* Start Dynamic Input Search */}
        {size.width >= 868 && (
          <form className={styles.search}>
            <input
              type="text"
              ref={primaryLocationRef}
              placeholder={
                placeholder ? placeholder : 'Whsssere are you going?'
              }
              onFocus={openDatePicker}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <div className={styles.overlay}>
              <div
                className={styles.field}
                onClick={openDatePicker}
                style={{ boxShadow: inputFocus && '0 1rem 3rem -1rem #1e1e38' }}
              >
                <label>Check-in</label>
                <input
                  readOnly
                  placeholder="Add dates"
                  value={state[0].startDate as any}
                />
              </div>

              <div className={styles.field}>
                <label>Check-out</label>
                <input
                  disabled
                  placeholder="Add dates"
                  value={state[0].endDate as any}
                />
              </div>

              <div className={styles.field}>
                <label>Hóspedes</label>
                <span className="guestNumber">
                  {numberOfChildren || numberOfAdults ? (
                    <p>{numberOfAdults + numberOfChildren} hóspedes</p>
                  ) : (
                    <p className="empty">Quantos?</p>
                  )}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={
                inputFocus &&
                !(
                  location &&
                  checkInDate &&
                  checkOutDate &&
                  (numberOfAdults || numberOfChildren)
                )
              }
              onClick={handleSubmit}
              aria-label="search places"
            >
              <Search />
              <span>Search</span>
            </button>
          </form>
        )}

        {size.width >= 868 && inputFocus && (
          <div className={styles.controlsFullContainer}>
            <div className={styles.controlsContainerHolder}>
              <div
                style={{
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    width: '100%',
                    paddingBottom: 50,
                  }}
                >
                  <Container>
                    <DateRangePicker
                      onChange={(item) => setState([item.selection] as any)}
                      moveRangeOnFirstSelection={false}
                      months={2}
                      ranges={state}
                      direction="horizontal"
                      showDateDisplay={false}
                      editableDateInputs={false}
                      showMonthAndYearPickers={false}
                      locale={locales['pt']}
                      inputRanges={[]}
                      staticRanges={[]}
                      dayContentRenderer={customDayContent}
                      minDate={new Date()}
                      rangeColors={['var(--primary-color)']}
                    />
                  </Container>

                  <h4>Próximos Eventos</h4>
                  <div
                    style={{
                      flex: 1,
                      width: '100%',
                      minHeight: 200,
                      height: 'auto',
                      paddingTop: '1rem',
                    }}
                  >
                    {/* <Swiper
                      spaceBetween={16}
                      slidesPerView={'auto'}
                      freeMode={true}
                      style={{
                        paddingLeft: 0,
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
                      <SwiperSlide style={{ width: 'auto' }}>
                        <CardEventType2 />
                      </SwiperSlide>
                      <SwiperSlide style={{ width: 'auto' }}>
                        <CardEventType2 />
                      </SwiperSlide>
                      <SwiperSlide style={{ width: 'auto' }}>
                        <CardEventType2 />
                      </SwiperSlide>
                    </Swiper> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {size.width >= 868 && inputFocus && (
          <div
            onClick={closeDatePickerWeb}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: -2,
              background: 'rgba(0,0,0,0.5)',
            }}
          ></div>
        )}

        {size.width <= 868 && inputFocus && (
          <Filters
            handleSubmit={handleSubmit as any}
            closeMobileFilters={closeMobileFilters}
          />
        )}

        {/* End Dynamic Input Search */}

        <div className={styles.profile}>
          <a
            title="Minha reserva"
            href="#"
            style={{ color: inputFocus || scrolled ? 'black' : 'white' }}
          >
            Minha reserva
          </a>
          <div className={styles.user}>
            <Menu className={styles.menu} />
            <User className={styles.userIcon} />
          </div>
        </div>
      </div>
    </header>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  font-family: 'DM Sans';
  margin-bottom: 1rem;

  .button {
    transition: transform 0.2s;
    cursor: pointer;

    &:hover,
    &:focus {
      transform: scale(0.95);
      box-shadow: 0 0 0 1px currentColor;
    }
    &:disabled {
      opacity: 0.5;
      box-shadow: none;
    }
  }

  .guests {
    width: 100%;
    padding-top: 3rem;
  }
  .inputs {
    display: flex;
    padding-top: 1rem;
  }

  .inner {
    width: 100%;
    max-width: 720px;
    height: fit-content;
    max-height: calc(100vh - 18rem);
    overflow: scroll;
    opacity: 0;
    transition: opacity 0.5s 0.2s;
    position: relative;
    &::-webkit-scrollbar {
      display: none;
      -webkit-appearance: none;
    }
  }

  .close {
    position: absolute;
    top: 0;
    right: 0.5rem;
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    background: #ff585d20;
    color: var(--red);
    border-radius: 99px;
  }

  &.visible {
    transform: translate(-50%, 0);

    .inner {
      opacity: 1;
    }
  }

  .rdrCalendarWrapper {
    color: #000000;
    flex: 1;
  }

  .rdrMonth {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .rdrMonths {
    margin-top: -48px;
  }

  .rdrMonthAndYearPickers {
    display: none;
  }

  .rdrMonthName {
    align-self: center;
    text-transform: capitalize;
    color: black;
  }

  .rdrNextPrevButton {
    background: white;
  }

  .rdrDateRangePickerWrapper {
    display: flex;
    justify-content: space-between;
  }
  .rdrDateDisplayWrapper {
    background: none;
  }
  .rdrDayDisabled {
    background-color: var(--light);
  }
  .rdrDateDisplayItem {
    border-radius: 200px;
    background-color: var(--light);
    input {
      color: var(--dark);
    }
  }
  .rdrDefinedRangesWrapper {
    border: none;
    border-radius: 2rem;
  }
  .rdrCalendarWrapper {
    background: none;
    color: var(--dark);
  }
  .rdrStaticRange {
    border: none;
    background: none;
    &:hover,
    &:focus {
      .rdrStaticRangeLabel {
        background: var(--gray);
      }
    }
  }
  .rdrDefinedRangesWrapper {
    display: none;
    margin-right: 1.5rem;
    padding-top: 0.75rem;
    background: var(--dark);
  }
  .rdrDayNumber span {
    color: var(--dark-text);
  }
  .rdrDayPassive .rdrDayNumber span {
    color: var(--dark-text);
    opacity: 0.33;
  }
  .rdrDayToday .rdrDayNumber span:after {
    background: var(--primary-color);
  }

  @media (min-width: 768px) {
    .rdrDefinedRangesWrapper {
      font-size: 13px;
    }
    .rdrCalendarWrapper {
      font-size: 13px;
    }
  }

  @media (min-width: 1024px) {
    .rdrDefinedRangesWrapper {
      font-size: 14px;
    }
    .rdrCalendarWrapper {
      font-size: 14px;
    }
  }

  @media (min-width: 1200px) {
    .rdrDefinedRangesWrapper {
      font-size: 16px;
    }
    .rdrCalendarWrapper {
      font-size: 16px;
    }
  }
`;
