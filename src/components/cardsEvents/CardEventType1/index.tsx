import moment from 'moment';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { EventsHome } from '../../../../data/events';

import styles from './styles.module.scss';

interface ICardEventType1 {
  event: EventsHome;
}

const CardEventType1 = ({ event }: ICardEventType1) => {
  const { t } = useTranslation('common');
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
        <img
          src={
            !event.imageUrl || !imageError
              ? 'images/empty_image.png'
              : event?.imageUrl
          }
          alt={event.eventName}
          title={event.eventName}
          onError={() => setImageError(true)}
        />
        <h4>{event?.eventName}</h4>
        <p>
          {event?.eventDescription}
          {'...'} <span>{t('READ-MORE')}</span>
        </p>
        <h3>{eventDate}</h3>
      </div>
    </>
  );
};

export default CardEventType1;
