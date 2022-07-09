import { Search, Globe } from 'react-feather';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';
import Filters from './MobileFilters';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';

import { isWeekend, format } from 'date-fns';
import { useWindowSize } from '../../hooks/UseWindowSize';
import { Design } from '../../../data/design';
import { useTranslation } from 'next-i18next';
import WebFilters from './WebFilters';
import moment from 'moment';
import LanguageSwitcher from '../LanguageSwitcher';
import { EventsHome } from '../../../data/events';
import CartMenu from '../CartMenu';

interface IHeader {
  design: Design;
  events?: EventsHome[];
}

export default function Header({ design, events }: IHeader) {
  const { t } = useTranslation('common');
  const router = useRouter();

  const headerRef = useRef(null);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [inputCalendars, setInputCalendars] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [inputGuest, setInputGuest] = useState(false);
  const [openLanguageSwitcher, setOpenLanguageSwitcher] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const { startDate, endDate, adults, children }: any = router.query;

  // Window Sizes
  const size = useWindowSize();

  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 1);

  //Data Picker
  const [dateState, setDateState] = useState([
    {
      startDate: startDate ? new Date(`${startDate}T00:00`) : new Date(),
      endDate: endDate ? new Date(`${endDate}T00:00`) : defaultEndDate,
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
  const [childrenAges, setChildrenAges] = useState<number[]>([]);

  const openDatePicker = () => {
    setInputCalendars(true);
    setOpenCart(false);
    setInputGuest(false);
    setIsCalendarVisible(true);
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
    setOpenCart(false);
    setInputCalendars(false);
    setOpenLanguageSwitcher(true);
  };
  const handleCloseLanguageSwitcher = () => {
    document.body.style.overflow = 'initial';
    setScrolled(false);
    setOpenLanguageSwitcher(!openLanguageSwitcher);
  };
  const handleToggleCart = () => {
    if (!openCart) {
  
        setScrolled(true);
     
      document.body.style.overflow = 'hidden';
      setOpenCart(!openCart);
      setInputCalendars(false);
      setInputGuest(false);
      setIsCalendarVisible(false);

    } else {
      document.body.style.overflow = 'initial';
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      setOpenCart(!openCart);
    }
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
    // closeFilters();
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
    if (isWeekend(day)) {
      extraDot = <div className={'weekdayDot'} />;
    }
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
  } ${t('guest_other', {
    count: numberOfAdults + numberOfChildren,
  })}`;

  const dynamicPlaceholder =
    router.pathname === '/search' ? filterString : t('searchPeriod');

  return (
    <>
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
                  <div
                    className={styles.btnGoBack}
                    onClick={() => router.back()}
                  >
                    <ChevronLeftOutlinedIcon />
                  </div>
                )}
                <form
                  onClick={openDatePicker}
                  style={{
                    display: 'flex',
                    width: router.pathname !== '/search' ? '100%' : '75%',
                  }}
                >
                  <p className={styles.searchPlaceholder}>
                    {dynamicPlaceholder}
                  </p>
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
                    <span>{t('search')}</span>
                  </button>
                </form>
              </div>
            </>
          )}

          {/* Web Start Dynamic Input Search */}
          {size.width > 868 && router.pathname !== '/checkout' && (
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
                  style={
                    checkInDate !== checkOutDate
                      ? {
                          boxShadow:
                            isCalendarVisible &&
                            inputCalendars &&
                            '0 1rem 3rem -1rem #1e1e38',
                        }
                      : {}
                  }
                >
                  <label>{t('checkIn')}</label>
                  <input
                    disabled
                    readOnly={true}
                    placeholder="Add dates"
                    value={moment(dateState[0].startDate).format('ll')}
                  />
                </div>

                <div
                  className={styles.field}
                  style={
                    checkInDate === checkOutDate
                      ? {
                          boxShadow:
                            isCalendarVisible &&
                            inputCalendars &&
                            '0 1rem 3rem -1rem #1e1e38',
                        }
                      : {}
                  }
                  onClick={openDatePicker}
                >
                  <label>{t('checkOut')}</label>
                  <input
                    disabled
                    readOnly
                    placeholder="Add dates"
                    value={
                      dateState[0].endDate
                        ? moment(dateState[0].endDate).format('ll')
                        : `${t('when')}?`
                    }
                  />
                </div>

                <div
                  className={styles.field}
                  onClick={openGuestSelector}
                  style={{
                    boxShadow:
                      inputCalendars &&
                      inputGuest &&
                      '0 1rem 3rem -1rem #1e1e38',
                  }}
                >
                  <label>{t('guest_other')}</label>
                  <span className="guestNumber">
                    {numberOfChildren > 0 || numberOfAdults > 0 ? (
                      <p>
                        {t('guestWithCount_one', {
                          count: numberOfAdults + numberOfChildren,
                        })}
                      </p>
                    ) : (
                      <p className="empty">{t('howMany')}?</p>
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
              childrenAges={childrenAges}
              setChildrenAges={setChildrenAges}
              numberOfChildren={numberOfChildren}
              events={events}
            />
          )}

          {size.width <= 868 && inputCalendars && (
            <Filters
              handleSubmit={handleSubmit as any}
              closeMobileFilters={closeFilters}
              customDayContent={customDayContent}
              dateState={dateState}
              setDateState={setDateState}
              isCalendarVisible={isCalendarVisible}
              inputGuest={inputGuest}
              childrenAges={childrenAges}
              setChildrenAges={setChildrenAges}
              numberOfChildren={numberOfChildren}
              events={events}
            />
          )}
          {openLanguageSwitcher && (
            <LanguageSwitcher
              handleCloseLanguageSwitcher={handleCloseLanguageSwitcher}
            />
          )}

          {/* End Dynamic Input Search */}

          {router.pathname !== '/checkout' && (
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
              <div className={styles.cart} onClick={handleToggleCart}>
                {/* <Menu className={styles.menu} /> */}
                <ShoppingBagOutlinedIcon
                  className={styles.cartIcon}
                  style={{ color: inputCalendars ? 'black' : 'white' }}
                />
                <CartMenu openCart={openCart} />
              </div>
            </div>
          )}
        </div>
      </header>
      {size.width > 868 && openCart && (
        <div
          onClick={handleToggleCart}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 4,
            background: 'rgba(0,0,0,0.6)',
          }}
        ></div>
      )}
    </>
  );
}
