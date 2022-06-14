import Image from 'next/image';
import React, { useState } from 'react';
import styles from './styles.module.scss';

interface ICardClient {
  data: {
    reviewerPhoto: string;
    reviewerName: string;
    reviewerDescription: string;
  };
}

const CardClient = ({ data }: ICardClient) => {
  const [error, setError] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <img
          className={styles.img}
          alt={data.reviewerName}
          title={data.reviewerName}
          src={
            error || !data.reviewerPhoto
              ? '/icons/avatar.svg'
              : `${data.reviewerPhoto}`
          }
          onError={() => setError(true)}
        />
        <h4>{data.reviewerName}</h4>
        <p>"{data.reviewerDescription}"</p>
      </div>
    </>
  );
};

export default CardClient;
