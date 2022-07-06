import React, { useState } from 'react';

import styles from './styles.module.scss';

interface IInput {
  type?: string;
  label: string;
  name: string;
  placeholder: string;
}

const Input = ({ type = 'text', label, name, placeholder }: IInput) => {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputBox}
          type={type}
          value={value}
          onChange={handleChange}
        />
        <label
          className={`${styles.label} ${value && styles.filled}`}
          htmlFor={name}
        >
          {label}
        </label>
      </div>
    </>
  );
};

export default Input;
