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
import { OpenSSL_encrypt_hospeda } from '../../utils/encrypt';

interface ICreditCard {
  cardNumber: string;
  expiryYear: string;
  securityCode: string;
  cardHolder: string;
  setCardHolder: React.Dispatch<React.SetStateAction<string>>;
  setCardNumber: React.Dispatch<React.SetStateAction<string>>;
  setExpiryYear: React.Dispatch<React.SetStateAction<string>>;
  setSecurityCode: React.Dispatch<React.SetStateAction<string>>;
  fieldErrors: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
    cardNumber: string;
    expiryYear: string;
    securityCode: string;
  };
}

const CreditCard = ({
  cardNumber,
  expiryYear,
  securityCode,
  setCardNumber,
  setExpiryYear,
  setSecurityCode,
  cardHolder,
  setCardHolder,
  fieldErrors,
}: ICreditCard) => {
  const [focused, setFocused] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [issuer, setIssuer] = useState();
  const [cardTypeError, setCardTypeError] = useState(false);

  const { t } = useTranslation();

  const handleCallback = ({ issuer }, isValid) => {
    isValid && setIssuer(issuer);
  };

  const handleInputFocus = ({ target }) => {
    setFocused(target.name);
  };

  useEffect(() => {
    setCardNumber(OpenSSL_encrypt_hospeda(currentNumber));
  }, [currentNumber]);

  const handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      setCurrentNumber(target.value);
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      setSecurityCode(formatCVC(target.value));
    }

    // setName({ [target.name]: target.value });
  };

  const cardType = CreditCardType(cardNumber.substring(0, 4))[0]
    ?.niceType.toLowerCase()
    .replaceAll(' ', '');

  const cardFlag =
    !cardType || cardNumber.length < 1 || cardTypeError
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
          value={cardHolder}
          onChange={(v) => setCardHolder(v.target.value)}
        />
        <div
          className={styles.cardNumberContainer}
          style={{
            borderColor: fieldErrors.cardNumber
              ? '#FF2424'
              : 'rgb(194, 194, 194)',
          }}
        >
          <input
            type="tel"
            name="number"
            placeholder={t('cardNumber')}
            pattern="[\d| ]{16,16}"
            maxLength={19}
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
            value={expiryYear}
            onChange={(v) =>
              setExpiryYear(formatExpirationDate(v.target.value))
            }
            placeholder={t('validity')}
            className={styles.validityInput}
            style={{
              borderColor: fieldErrors.expiryYear
                ? '#FF2424'
                : 'rgb(194, 194, 194)',
            }}
          />
          <input
            type="tel"
            name="cvc"
            pattern="\d{3,4}"
            required
            value={securityCode}
            onChange={(v) => {
              setSecurityCode(formatCVC(v.target.value));
            }}
            placeholder={'CVV'}
            className={styles.cvvInput}
            style={{
              borderColor: fieldErrors.securityCode
                ? '#FF2424'
                : 'rgb(194, 194, 194)',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CreditCard;
