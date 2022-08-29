import React, { useState } from 'react';

import styles from './styles.module.scss';

interface IInput {
  type?: string;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  downMessage?: string;
}

const Input = ({
  type = 'text',
  label,
  name,
  placeholder,
  value,
  setValue,
  downMessage,
}: IInput) => {
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
          style={{
            borderColor: downMessage ? '#FF2424' : 'rgb(194, 194, 194)',
          }}
        />
        <label
          className={`${styles.label} ${value && styles.filled}`}
          htmlFor={name}
        >
          {label}
        </label>
        {!!downMessage && (
          <p className={styles.downMessage}>{`${downMessage}`}</p>
        )}
      </div>
    </>
  );
};

export default Input;
