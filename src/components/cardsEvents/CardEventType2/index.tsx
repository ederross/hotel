import moment from 'moment';
import React, { useState } from 'react';
import { EventsHome } from '../../../../data/events';

import styles from './styles.module.scss';

interface ICardEventType2 {
  event: EventsHome;
}

const CardEventType2 = ({ event }: ICardEventType2) => {
  const [imageError, setImageError] = useState(false);

  const eventStart = new Date(event?.startDate);
  const eventEnd = new Date(event?.endDate);

  const eventDate =
    (moment(eventStart).format('DD MMM') || '*') +
    ' - ' +
    (moment(eventEnd).format('DD MMM') || '*');

  return (
    <>
      <div className={styles.container}>
        <div className={styles.floatDateContainer}>
          <h4>{eventDate}</h4>
        </div>
        <img
          src={
            !event?.imageUrl || imageError
              ? 'images/empty_image.png'
              : event?.imageUrl
          }
          alt=""
        />
        <div className={styles.contentContainer}>
          <h4>{event?.eventName}</h4>
        </div>
      </div>
    </>
  );
};

export default CardEventType2;
