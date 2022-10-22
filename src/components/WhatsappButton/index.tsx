import React, { useState } from 'react';
import styles from './styles.module.scss';

interface IWhatsappButton {
  whatsappNumber: string;
}

export const WhatsappButton = ({ whatsappNumber }: IWhatsappButton) => {
  return (
    <>
      <a
        title="whatsapp"
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        className={styles.button}
      >
        <img
          alt="whatsapp"
          title="Whatsapp"
          src={'icons/whatsapp.svg'}
          draggable={false}
        />
      </a>
    </>
  );
};
