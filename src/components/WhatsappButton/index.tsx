import React, { useState } from 'react';
import styles from './styles.module.scss';

export const WhatsappButton = () => {
  return (
    <>
      <a
        title="whatsapp"
        // href="https://wa.me/message/IGVCXVTBD6ZPN1"
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
