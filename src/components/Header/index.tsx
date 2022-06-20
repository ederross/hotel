import styled from 'styled-components';
import { Search, Menu, User } from 'react-feather';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';
import Filters from './MobileFilters';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { addDays, format } from 'date-fns';
import { useWindowSize } from '../../hooks/UseWindowSize';
import { Design } from '../../../data/design';
import { useTranslation } from 'next-i18next';
import WebFilters from './WebFilters';
import moment from 'moment';

interface IHeader {
  placeholder: string;
  design: Design;
}

export default function Header({ placeholder, design }: IHeader) {
  const { t } = useTranslation('common');
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
                placeholder={placeholder || t('YOUR-HOSTING')}
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
                <span>{t('SEARCH')}</span>
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
              placeholder={placeholder || t('YOUR-HOSTING')}
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
                <label>{t('CHECK-IN')}</label>
                <input
                  readOnly
                  placeholder="Add dates"
                  value={moment(state[0].startDate).format('ll')}
                />
              </div>

              <div className={styles.field}>
                <label>{t('CHECK-OUT')}</label>
                <input
                  disabled
                  placeholder="Add dates"
                  value={moment(state[0].endDate).format('ll')}
                />
              </div>

              <div className={styles.field}>
                <label>{t('GUEST_MANY')}</label>
                <span className="guestNumber">
                  {numberOfChildren || numberOfAdults ? (
                    <p>
                      {numberOfAdults + numberOfChildren}{' '}
                      {t('GUEST', { count: numberOfAdults + numberOfChildren })}
                    </p>
                  ) : (
                    <p className="empty">{t('HOW-MANY')}?</p>
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
              <span>{t('SEARCH')}</span>
            </button>
          </form>
        )}

        {size.width >= 868 && inputFocus && (
          <WebFilters
            closeDatePickerWeb={closeDatePickerWeb}
            customDayContent={customDayContent}
            state={state}
            setState={setState}
          />
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
            {t('CART')}
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
