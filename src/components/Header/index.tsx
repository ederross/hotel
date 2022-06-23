import { Search, Globe } from 'react-feather';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';
import Filters from './MobileFilters';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import { addDays, format } from 'date-fns';
import { useWindowSize } from '../../hooks/UseWindowSize';
import { Design } from '../../../data/design';
import { useTranslation } from 'next-i18next';
import WebFilters from './WebFilters';
import moment from 'moment';
import LanguageSwitcher from '../LanguageSwitcher';

interface IHeader {
  placeholder: string;
  design: Design;
}

export default function Header({ placeholder, design }: IHeader) {
  const { t } = useTranslation('common');
  const router = useRouter();

  const headerRef = useRef(null);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [inputCalendars, setInputCalendars] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [inputGuest, setInputGuest] = useState(false);
  const primaryLocationRef = useRef(null);
  const secondaryLocationRef = useRef(null);
  const [openLanguageSwitcher, setOpenLanguageSwitcher] = useState(false);

  // Window Sizes
  const size = useWindowSize();

  //form data
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('2022-05-25');
  const [checkOutDate, setCheckOutDate] = useState('2022-05-30');
  const [numberOfAdults, setNumberOfAdults] = useState(2);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState();

  //Data Picker
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection',
    },
  ]);

  const openDatePicker = () => {
    setInputCalendars(true);
    setIsCalendarVisible(true);
    setInputGuest(false);
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (!(size.width >= 868) && secondaryLocationRef.current) {
        secondaryLocationRef.current.focus();
      }
    }, 10);
  };

  const openGuestSelector = () => {
    setInputGuest(true);
    setInputCalendars(true);
    setIsCalendarVisible(false);

    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (!(size.width >= 868) && secondaryLocationRef.current) {
        secondaryLocationRef.current.focus();
      }
    }, 10);
  };

  const handleOpenLanguageSwitcher = () => {
    document.body.style.overflow = 'hidden';
    setOpenLanguageSwitcher(true);
  };
  const handleCloseLanguageSwitcher = () => {
    document.body.style.overflow = 'initial';
    setOpenLanguageSwitcher(!openLanguageSwitcher);
  };

  const closeDatePickerWeb = () => {
    setInputCalendars(false);
    setLocation('');
    setNumberOfChildren(0);
    setNumberOfAdults(0);
    setCheckInDate('');
    setCheckOutDate('');
    document.body.style.overflow = 'initial';
  };

  const closeMobileFilters = () => {
    setInputCalendars(false);
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
      query: {
        startDate: checkInDate.toString(),
        endDate: checkOutDate.toString(),
        adults: numberOfAdults,
        children: numberOfChildren,
      },
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
    <header
      ref={headerRef}
      className={` ${styles.headerSection} ${
        scrolled || inputCalendars || router.pathname !== '/'
          ? styles.scrolled
          : null
      }
        ${inputCalendars ? styles.inputFocus : null}`}
      style={{
        display: router.pathname !== '/' && size.width <= 868 && 'none',
        position: router.pathname !== '/' ? 'relative' : 'fixed',
      }}
    >
      <div className={styles.headerInner}>
        <div
          className={styles.logo}
          style={{ color: inputCalendars || scrolled ? 'black' : 'white' }}
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

        {/* Mobile Start Dynamic Input Search */}
        {!inputCalendars && size.width <= 868 && (
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
                  inputCalendars &&
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

        {/* Web Start Dynamic Input Search */}
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
                style={{
                  boxShadow:
                    isCalendarVisible &&
                    inputCalendars &&
                    '0 1rem 3rem -1rem #1e1e38',
                }}
              >
                <label>{t('CHECK-IN')}</label>
                <input
                  readOnly
                  placeholder="Add dates"
                  value={moment(dateState[0].startDate).format('ll')}
                />
              </div>

              <div className={styles.field}>
                <label>{t('CHECK-OUT')}</label>
                <input
                  disabled
                  placeholder="Add dates"
                  value={moment(dateState[0].endDate).format('ll')}
                />
              </div>

              <div
                className={styles.field}
                onClick={openGuestSelector}
                style={{
                  boxShadow:
                    inputCalendars && inputGuest && '0 1rem 3rem -1rem #1e1e38',
                }}
              >
                <label>{t('GUEST_MANY')}</label>
                <span className="guestNumber">
                  {numberOfChildren || numberOfAdults ? (
                    <p>
                      {numberOfAdults + numberOfChildren}{' '}
                      {t('GUEST', {
                        count: numberOfAdults + numberOfChildren,
                      })}
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
                inputCalendars &&
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

        {size.width >= 868 && inputCalendars && (
          <WebFilters
            closeDatePickerWeb={closeDatePickerWeb}
            customDayContent={customDayContent}
            dateState={dateState}
            setDateState={setDateState}
            isCalendarVisible={isCalendarVisible}
            inputGuest={inputGuest}
          />
        )}

        {size.width <= 868 && inputCalendars && (
          <Filters
            handleSubmit={handleSubmit as any}
            closeMobileFilters={closeMobileFilters}
          />
        )}
        {openLanguageSwitcher && (
          <LanguageSwitcher
            handleCloseLanguageSwitcher={handleCloseLanguageSwitcher}
          />
        )}

        {/* End Dynamic Input Search */}

        <div className={styles.profile}>
          <a
            href="#"
            className={styles.globe}
            onClick={handleOpenLanguageSwitcher}
          >
            <Globe
              className={styles.globeIcon}
              style={{ color: inputCalendars ? 'black' : 'white' }}
            />
          </a>
          <div className={styles.cart}>
            {/* <Menu className={styles.menu} /> */}
            <ShoppingBagOutlinedIcon
              className={styles.cartIcon}
              style={{ color: inputCalendars ? 'black' : 'white' }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
