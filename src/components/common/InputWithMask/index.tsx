import React, { useState } from 'react';
import CpfCnpj from '@react-br-forms/cpf-cnpj-mask';
import TelefoneBrasileiroInput from 'react-telefone-brasileiro';
import styles from './styles.module.scss';

interface IInput {
  typeInput?: 'CPF' | 'CNPJ' | 'PHONE';
  label: string;
  name: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  downMessage?: string;
}

const InputWithMask = ({
  typeInput = 'CPF',
  label,
  name,
  value,
  setValue,
  placeholder,
  downMessage,
}: IInput) => {
  return (
    <>
      <div className={styles.inputContainer}>
        {typeInput === 'PHONE' ? (
          <TelefoneBrasileiroInput
            className={styles.inputWithMask}
            value={value}
            temDDD={true}
            onChange={(event) => setValue(event.target.value)}
            style={{
              borderColor: downMessage ? '#FF2424' : 'rgb(194, 194, 194)',
            }}
          />
        ) : (
          <CpfCnpj
            className={styles.inputWithMask}
            value={value}
            maxLength={14}
            onChange={(event, type) => {
              setValue(event.target.value);
              type === typeInput;
            }}
            style={{
              borderColor: downMessage ? '#FF2424' : 'rgb(194, 194, 194)',
            }}
          />
        )}
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

export default InputWithMask;
