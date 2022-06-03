import React from 'react';

import styles from './styles.module.scss';

const CardEventType2 = () => {
  return (
      <>
        <div className={styles.container}>
          <div className={styles.floatDateContainer}>
            <h4>18 - 19 Out</h4>
          </div>
          <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/0a/60/fe/heaton-park.jpg?w=1200&h=-1&s=1" alt="" />
          <div className={styles.contentContainer}>
              <h4>
                Event Label
              </h4>
          </div>
        </div>
      </>
  )
}

export default CardEventType2;