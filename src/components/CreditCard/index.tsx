import React, { useEffect, useState } from 'react';
import Card from 'react-credit-cards';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from './utils';

import styles from './styles.module.scss';
import CreditCardType from 'credit-card-type';
import { useTranslation } from 'next-i18next';

const CreditCard = () => {
  const [name, setName] = useState();
  const [number, setNumber] = useState('');
  const [expires, setExpires] = useState();
  const [cvc, setCvc] = useState();
  const [focused, setFocused] = useState(false);
  const [issuer, setIssuer] = useState();
  const [formData, setFormData] = useState();
  const [expiry, setExpiry] = useState();
  const [cardTypeError, setCardTypeError] = useState(false);

  const { t } = useTranslation();

  const handleCallback = ({ issuer }, isValid) => {
    isValid && setIssuer(issuer);
  };

  const handleInputFocus = ({ target }) => {
    setFocused(target.name);
  };

  const handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      setNumber(target.value);
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    // setName({ [target.name]: target.value });
  };

  const cardType = CreditCardType(
    number.substring(0, 4)
  )[0]?.niceType.toLowerCase().replaceAll(' ', '');

  const cardFlag =
    !cardType || number.length < 1 || cardTypeError
      ? '/icons/card.svg'
      : `/icons/${cardType}.svg`;

  useEffect(() => {
    setCardTypeError(false);
  }, [cardType]);

  return (
    <>
      {/* <Card
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focused}
        callback={handleCallback}
      /> */}

      <div className={styles.cardInfoHolder}>
        <input
          name="name"
          placeholder={t('cardholderName')}
          className={styles.cardHolderName}
          required
          onFocus={handleInputFocus}
        />
        <div className={styles.cardNumberContainer}>
          <input
            type="tel"
            name="number"
            placeholder={t('cardNumber')}
            //   pattern="[\d| ]{16,22}"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className={styles.cardNumberInput}
          />
          <img
            src={cardFlag}
            height={28}
            width={32}
            title={cardType}
            alt={cardType}
            onError={() => setCardTypeError(true)}
          />
        </div>
        <div style={{ display: 'flex', width: '100%' }}>
          <input
            type="tel"
            pattern="\d\d/\d\d"
            name="expiry"
            required
            onChange={handleInputChange}
            placeholder={t('validity')}
            className={styles.validityInput}
          />
          <input
            type="tel"
            name="cvc"
            pattern="\d{3,4}"
            required
            onChange={handleInputChange}
            placeholder={'CVV'}
            className={styles.cvvInput}
          />
        </div>
        <div className={styles.cSelect} style={{ marginTop: '0.5rem' }}>
          <select name="arrivalForecast" id="pet-select">
            <option value="">{t('installment')}</option>
            <option value="">1x</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default CreditCard;
