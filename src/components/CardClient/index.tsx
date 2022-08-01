import Image from 'next/image';
import React, { useState } from 'react';
import { IconImportDynamically } from '../common/ComponentWithIcon';
import styles from './styles.module.scss';

interface ICardClient {
  data: {
    reviewerPhoto: string;
    reviewerName: string;
    reviewerDescription: string;
  };
  index: number;
}

const CardClient = ({ data, index }: ICardClient) => {
  const [error, setError] = useState(false);

  return (
    <>
      <div className={styles.container}>
        {/* <div className={styles.img}>
          <Image
            layout="fill"
            objectFit="cover"
            alt={data.reviewerName}
            title={data.reviewerName}
            src={imageDate[index]}
            onError={() => setError(true)}
          />
        </div> */}

        <div className={styles.ratingsContainer}>
          <IconImportDynamically
            iconName={'Star'}
            size={20}
            color={'var(--yellow)'}
          />
          <IconImportDynamically
            iconName={'Star'}
            size={20}
            color={'var(--yellow)'}
          />
          <IconImportDynamically
            iconName={'Star'}
            size={20}
            color={'var(--yellow)'}
          />
          <IconImportDynamically
            iconName={'Star'}
            size={20}
            color={'var(--yellow)'}
          />
          <IconImportDynamically
            iconName={'Star'}
            size={20}
            color={'var(--yellow)'}
          />
        </div>
        <p>{`"${data.reviewerDescription}"`}</p>

        <ul>
          {' '}
          <li> {data.reviewerName}</li>
        </ul>
      </div>
    </>
  );
};

export default CardClient;

const imageDate = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=100',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=100',
  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=100',
];
