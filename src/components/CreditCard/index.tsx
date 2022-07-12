import React, { useState } from 'react';
import Card from 'react-credit-cards';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from './utils';

import styles from './styles.module.scss';

const CreditCard = () => {
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [expires, setExpires] = useState();
  const [cvc, setCvc] = useState();
  const [focused, setFocused] = useState(false);
  const [issuer, setIssuer] = useState();
  const [formData, setFormData] = useState();
  const [expiry, setExpiry] = useState();

  const handleCallback = ({ issuer }, isValid) => {
    isValid && setIssuer(issuer);
  };

  const handleInputFocus = ({ target }) => {
    setFocused(target.name);
  };

  const handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    // setName({ [target.name]: target.value });
  };

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
          type="tel"
          name="number"
          placeholder={'Nome do titular'}
          className={styles.cardHolderName}
          //   pattern="[\d| ]{16,22}"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="tel"
          name="number"
          placeholder={'Número do cartão'}
          className={styles.cardNumberInput}
          //   pattern="[\d| ]{16,22}"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <div style={{ display: 'flex', width: '100%' }}>
          <input
            type="text"
            placeholder={'Validade'}
            className={styles.validityInput}
          />
          <input type="text" placeholder={'CVV'} className={styles.cvvInput} />
        </div>
        <div className={styles.cSelect} style={{ marginTop: '0.5rem' }}>
          <select name="arrivalForecast" id="pet-select">
            <option value="">Parcelamento</option>
            <option value="">1x</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default CreditCard;
