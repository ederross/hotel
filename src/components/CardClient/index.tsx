import Image from 'next/image';
import React from 'react';
import styles from './styles.module.scss';

interface ICardClient {
  data: {
    url: string;
    name: string;
    description: string;
  };
}

const CardClient = ({ data }: ICardClient) => {
  return (
    <>
      <div className={styles.container}>
        <img className={styles.img} src={`${data.url}`} />
        <h3>{data.name}</h3>
        <p>{data.description}</p>
      </div>
    </>
  );
};

export default CardClient;
