import styled from 'styled-components';
import { Search, Globe, Menu, User } from 'react-feather';
import { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';
import Filters from '../Filters';

export default function Header({ placeholder }) {
  const router = useRouter();

  const navRef = useRef(null);
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const primaryLocationRef = useRef(null);
  const secondaryLocationRef = useRef(null);

  const isSmallScreen = useMediaQuery('(max-width: 36rem)');

  //form data

  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  const openDatePicker = () => {
    setInputFocus(true);
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (!isSmallScreen && secondaryLocationRef.current) {
        secondaryLocationRef.current.focus();
      }
    }, 10);
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
    if (!location) {
      primaryLocationRef.current.focus();
      return;
    }
    router.push({
      pathname: '/search',
      query: {
        location: location,
        checkIn: checkInDate.toString(),
        checkOut: checkOutDate.toString(),
        guests: numberOfChildren + numberOfAdults,
      },
    });
    setTimeout(() => closeMobileFilters(), 100);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (!headerRef.current.contains(event.target)) {
        closeMobileFilters();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

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
        <div className={styles.logo} onClick={() => router.push('/')}>
          <span>hotel</span>
        </div>
        {/* <nav ref={navRef}>
          <a href="#" className={styles.active}>
            Places to stay
          </a>
          <a href="#">Experiences</a>
          <a href="#">Online Experiences</a>
        </nav> */}

        {/* Start Dynamic Input Search */}

        {!inputFocus && (
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
        )}

        {inputFocus && <Filters closeMobileFilters={closeMobileFilters} />}

        {/* End Dynamic Input Search */}

        <div className={styles.profile}>
          <a href="#">Carrinho</a>
          <div className={styles.user}>
            <Menu className={styles.menu} />
            <User className={styles.userIcon} />
          </div>
        </div>
      </div>
    </header>
  );
}
