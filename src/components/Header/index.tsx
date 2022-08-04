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
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../store/types';
import { motion } from 'framer-motion';
import CartModal from '../CartModal';
import { ToastContainer } from 'react-toastify';
import { CleanCart } from '../../store/ducks/cart/actions';
import { GetCalendarSearch } from '../../services/requests/booking';

interface IHeader {
  design: Design;
  events?: EventsHome[];
  selectedRoom?: any;
}

export default function Header({ design, events, selectedRoom }: IHeader) {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    cart: { rooms, services },
  } = useSelector((state: AppStore) => state);

  const headerRef = useRef(null);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [inputCalendars, setInputCalendars] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [inputGuest, setInputGuest] = useState(false);
  const [openLanguageSwitcher, setOpenLanguageSwitcher] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [cartMobileOpen, setCartMobileOpen] = useState(false);

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
    setOpenCart(false);
    setInputGuest(false);
    setCartMobileOpen(false);
    setInputCalendars(true);
    setIsCalendarVisible(true);
    document.body.style.overflow = 'hidden';
  };
  // Open Calendar on Guest Selector
  const openGuestSelector = () => {
    setInputGuest(true);
    setInputCalendars(true);
    setIsCalendarVisible(false);
    setCartMobileOpen(false);
    document.body.style.overflow = 'hidden';
  };

  // Open Language Switcher
  const handleOpenLanguageSwitcher = () => {
    document.body.style.overflow = 'hidden';
    setOpenCart(false);
    setInputCalendars(false);
    setCartMobileOpen(false);
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
      // document.body.style.overflow = 'initial';
      router.pathname === '/' ? (document.body.style.overflow = 'hidden') : '';
      setOpenCart(!openCart);
      setInputCalendars(false);
      setInputGuest(false);
      setIsCalendarVisible(false);
      setCartMobileOpen(false);
    } else {
      router.pathname === '/' ? (document.body.style.overflow = 'initial') : '';
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      setOpenCart(!openCart);
    }
  };

  const closeCalendar = () => {
    setInputCalendars(false);
    setIsCalendarVisible(false);
    setInputGuest(false);
    setCartMobileOpen(false);
    document.body.style.overflow = 'initial';
  };

  // Search Submit Method
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
    dispatch(CleanCart());
    setTimeout(() => closeCalendar(), 100);
  };

  // Scroll Header Animation
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

  // Cart Feedback Animation
  useEffect(() => {
    if (router.pathname === '/rooms') {
      return;
    }
    if (rooms.length > 0 || services.length > 0) {
      setScrolled(true);

      document.body.style.overflow = 'initial';
      router.pathname !== '/rooms/[id]' && setOpenCart(true);

      setInputCalendars(false);
      setInputGuest(false);
      setIsCalendarVisible(false);
      setCartMobileOpen(false);
    }
  }, [rooms.length > 0, services.length > 0]);

  // Open Cart Modal
  const handleOpenCart = () => {
    document.body.style.overflow = 'hidden';
    setCartMobileOpen(true);
  };
  const handleCloseCart = () => {
    document.body.style.overflow = 'initial';
    setCartMobileOpen(false);
  };

  // Calendar Events Dots
  function customDayContent(day: Date, calendar: any) {
    let extraDot = null;
    let priceDay = null;
    // if (isWeekend(day)) {
    //   extraDot = <div className={'weekdayDot'} />;
    // }

    const today = new Date(checkOutDate);
    const tomorrow = new Date(checkOutDate);
    tomorrow.setDate(today.getDate() + 1);

    const isNotSelected = day < new Date(checkInDate) || day > tomorrow;

    if (isNotSelected) {
      priceDay = (
        <div className={'priceDayIndicator'}>
          <p>{calendar?.baseAmount || '-'}</p>
        </div>
      );
    }
    return (
      <>
        <div>
          {/* {extraDot} */}
          <span>{format(day, 'd')}</span>
          {priceDay}
        </div>
      </>
    );
  }

  // Filter Calendar Strings Format
  const filterString = `${moment(dateState[0].startDate).format(
    'DD'
  )} - ${moment(dateState[0].endDate).format('ll')} | ${
    numberOfAdults + numberOfChildren
  } ${t('guest_other', {
    count: numberOfAdults + numberOfChildren,
  })}`;

  const dynamicPlaceholder =
    router.pathname === '/search' ? filterString : t('searchPeriod');

  const cartLength =
    rooms.map((a) => a.quantity).reduce((a, b) => a + b, 0) +
    services.map((s) => s.quantity).reduce((a, b) => a + b, 0);

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
            router.pathname !== '/' && selectedRoom && size.width <= 868
              ? 'none'
              : router.pathname === '/checkout' && size.width <= 868
              ? 'none'
              : 'block',
          position:
            router.pathname !== '/' && router.pathname !== '/search'
              ? 'fixed'
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
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={styles.btnGoBack}
                    onClick={() => router.back()}
                  >
                    <ChevronLeftOutlinedIcon />
                  </motion.div>
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
                  <div
                    className={styles.button}
                    onClick={
                      !isCalendarVisible && !inputGuest
                        ? openDatePicker
                        : handleSubmit
                    }
                    // disabled={
                    //   inputCalendars &&
                    //   !(
                    //     checkInDate &&
                    //     checkOutDate &&
                    //     (numberOfAdults || numberOfChildren)
                    //   )
                    // }
                    // onClick={handleSubmit}
                    // aria-label="search places"
                  >
                    <Search />
                    <span>{t('search')}</span>
                  </div>
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
                        {numberOfAdults + numberOfChildren < 2 &&
                        numberOfAdults + numberOfChildren > 0
                          ? t('guestWithCount_one', {
                              count: numberOfAdults + numberOfChildren,
                            })
                          : numberOfAdults + numberOfChildren === 0
                          ? t('guestWithCount_other', {
                              count: numberOfAdults + numberOfChildren,
                            })
                          : t('guestWithCount_other', {
                              count: numberOfAdults + numberOfChildren,
                            })}
                      </p>
                    ) : (
                      // t('guestWithCount_one', {
                      //   count: numberOfAdults + numberOfChildren,
                      // })
                      <p className="empty">{t('howMany')}?</p>
                    )}
                  </span>
                </div>
              </div>

              {router.pathname !== '/search' && router.pathname !== '/rooms' ? (
                <div
                  // type="submit"
                  // disabled={
                  //   !(checkInDate && checkOutDate && numberOfAdults > 0)
                  // }
                  className={styles.button}
                  onClick={
                    !isCalendarVisible && !inputGuest
                      ? openDatePicker
                      : handleSubmit
                  }
                  // aria-label="search places"
                >
                  <Search />
                  <span>{t('search')}</span>
                </div>
              ) : (
                <div
                  className={styles.button}
                  // disabled={
                  //   !(checkInDate && checkOutDate && numberOfAdults > 0)
                  // }
                  onClick={
                    !isCalendarVisible && !inputGuest
                      ? openDatePicker
                      : handleSubmit
                  }
                  // aria-label="search places"
                >
                  <Search />
                  <span>{t('search')}</span>
                </div>
              )}
            </form>
          )}

          {size.width >= 868 && inputCalendars && (
            <WebFilters
              closeDatePickerWeb={closeCalendar}
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
              closeMobileFilters={closeCalendar}
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
              openLanguageSwitcher={openLanguageSwitcher}
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
              <motion.div
                className={styles.cart}
                initial="exit"
                animate={rooms.length > 0 ? 'enter' : 'exit'}
                variants={{
                  enter: {
                    transition: {
                      duration: 0.5,
                    },
                    display: 'flex',
                  },
                  exit: {
                    transition: {
                      duration: 0.2,
                      delay: 0.1,
                    },
                    transitionEnd: {
                      display: 'flex',
                    },
                  },
                }}
                onClick={handleToggleCart}
                style={{ flexDirection: 'column' }}
              >
                {/* <Menu className={styles.menu} /> */}
                {rooms && rooms.length > 0 && (
                  <motion.div
                    animate={{ scale: 2 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: 28,
                      width: 3,
                      height: 3,
                      borderRadius: 6,
                      background:
                        router.pathname === '/' &&
                        !scrolled &&
                        !isCalendarVisible &&
                        !inputGuest
                          ? 'white'
                          : scrolled || isCalendarVisible || inputGuest
                          ? 'red'
                          : 'red',
                    }}
                  ></motion.div>
                )}
                <ShoppingBagOutlinedIcon
                  className={styles.cartIcon}
                  style={{ color: inputCalendars ? 'black' : 'white' }}
                />
                <CartMenu openCart={openCart} />
              </motion.div>
            </div>
          )}
        </div>
      </header>

      {size.width < 868 && router.pathname !== '/checkout' && (
        <div className={styles.cartFloatingContainer}>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.cartFloatingButton}
            onClick={handleOpenCart}
          >
            {/* {rooms && rooms.length > 0 && (
              <motion.div
                animate={{ scale: 2 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'fixed',
                  top: 14,
                  right: 16,
                  width: 3,
                  zIndex: 99,
                  height: 3,
                  borderRadius: 6,
                  background: 'red',
                }}
              ></motion.div>
            )} */}
            <ShoppingBagOutlinedIcon className={styles.cartIcon} />
            <h4>{t('cart') + ' ' + '(' + `${`${cartLength}`}` + ')'}</h4>
          </motion.div>
        </div>
      )}
      {cartMobileOpen && <CartModal handleCloseCartModal={handleCloseCart} />}

      {size.width > 868 && openCart && router.pathname !== '/checkout' && (
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
