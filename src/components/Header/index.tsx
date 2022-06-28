import { Search, Globe } from 'react-feather';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';
import Filters from './MobileFilters';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';

import { addDays, format } from 'date-fns';
import { useWindowSize } from '../../hooks/UseWindowSize';
import { Design } from '../../../data/design';
import { useTranslation } from 'next-i18next';
import WebFilters from './WebFilters';
import moment from 'moment';
import LanguageSwitcher from '../LanguageSwitcher';

interface IHeader {
  design: Design;
}

export default function Header({ design }: IHeader) {
  const { t } = useTranslation('common');
  const router = useRouter();

  const headerRef = useRef(null);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [inputCalendars, setInputCalendars] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [inputGuest, setInputGuest] = useState(false);
  const [openLanguageSwitcher, setOpenLanguageSwitcher] = useState(false);

  const { startDate, endDate, adults, children }: any = router.query;

  // Window Sizes
  const size = useWindowSize();

  //Data Picker
  const [dateState, setDateState] = useState([
    {
      startDate: startDate ? new Date(`${startDate}T00:00`) : new Date(),
      endDate: endDate ? new Date(`${endDate}T00:00`) : addDays(new Date(), 3),
      adults: parseInt(adults) || 1,
      children: parseInt(children) || 0,
      key: 'selection',
    },
  ]);

  //form data
  const checkInDate = moment(dateState[0].startDate).format('YYYY-MM-DD');
  const checkOutDate = moment(dateState[0].endDate).format('YYYY-MM-DD');
  const numberOfAdults = dateState[0].adults;
  const numberOfChildren = dateState[0].children;
  const [childrenAges, setChildrenAges] = useState();

  const openDatePicker = () => {
    setInputCalendars(true);
    setIsCalendarVisible(true);
    setInputGuest(false);
    document.body.style.overflow = 'hidden';
  };

  const openGuestSelector = () => {
    setInputGuest(true);
    setInputCalendars(true);
    setIsCalendarVisible(false);

    document.body.style.overflow = 'hidden';
  };

  const handleOpenLanguageSwitcher = () => {
    document.body.style.overflow = 'hidden';
    setOpenLanguageSwitcher(true);
  };
  const handleCloseLanguageSwitcher = () => {
    document.body.style.overflow = 'initial';
    setOpenLanguageSwitcher(!openLanguageSwitcher);
  };

  const closeFilters = () => {
    setInputCalendars(false);
    setInputGuest(false);
    document.body.style.overflow = 'initial';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/search',
      query: {
        startDate: checkInDate,
        endDate: checkOutDate,
        adults: numberOfAdults,
        children: numberOfChildren,
      },
    });
    setTimeout(() => closeFilters(), 100);
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

  const filterString = `${moment(dateState[0].startDate).format(
    'DD'
  )} - ${moment(dateState[0].endDate).format('ll')} | ${
    numberOfAdults + numberOfChildren
  } ${t('GUEST', {
    count: numberOfAdults + numberOfChildren,
  })}`;

  const dynamicPlaceholder =
    router.pathname === '/search' ? filterString : t('YOUR-HOSTING');

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
        display:
          router.pathname !== '/' &&
          router.pathname !== '/search' &&
          size.width <= 868 &&
          'none',
        position:
          router.pathname !== '/' && router.pathname !== '/search'
            ? 'relative'
            : 'fixed',
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
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent:
                  router.pathname === '/search' ? 'space-between' : 'center',
                alignItems: 'center',
              }}
            >
              {router.pathname === '/search' && (
                <div className={styles.btnGoBack} onClick={() => router.back()}>
                  <ChevronLeftOutlinedIcon />
                </div>
              )}
              <form
                onClick={openDatePicker}
                style={{ width: router.pathname !== '/search' ? '100%' : '70%'}}
              >
                <p className={styles.searchPlaceholder}>{dynamicPlaceholder}</p>
                <button
                  type="submit"
                  disabled={
                    inputCalendars &&
                    !(
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
            </div>
          </>
        )}

        {/* Web Start Dynamic Input Search */}
        {size.width > 868 && (
          <form
            className={styles.search}
            onClick={
              (scrolled || router.pathname !== '/') &&
              !inputCalendars &&
              !inputGuest
                ? openDatePicker
                : () => {}
            }
          >
            <p className={styles.searchPlaceholder}>{dynamicPlaceholder}</p>
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
                <label>{t('checkIn')}</label>
                <input
                  readOnly
                  placeholder="Add dates"
                  value={moment(dateState[0].startDate).format('ll')}
                />
              </div>

              <div className={styles.field}>
                <label>{t('checkOut')}</label>
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
                <label>{t('guest_other')}</label>
                <span className="guestNumber">
                  {numberOfChildren || numberOfAdults ? (
                    <p>
                      {numberOfAdults + numberOfChildren}{' '}
                      {t('guestWithCount_other', {
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
              disabled={!(checkInDate && checkOutDate && numberOfAdults > 0)}
              onClick={scrolled ? openDatePicker : handleSubmit}
              aria-label="search places"
            >
              <Search />
              <span>{t('search')}</span>
            </button>
          </form>
        )}

        {size.width >= 868 && inputCalendars && (
          <WebFilters
            closeDatePickerWeb={closeFilters}
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
            closeMobileFilters={closeFilters}
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
