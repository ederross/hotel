import Image from 'next/image';
import React, { useState } from 'react';
import { HotelImages } from '../../../data/images';
import CarouselHolder from '../common/CarouselHolder';
import styles from './styles.module.scss';

interface IHotelImagesSlider {
  images: HotelImages[];
}

const HotelImagesSlider = ({ images }: IHotelImagesSlider) => {
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(0);
  const [adjustScroller, setAdjustScroller] = useState(true)

  const imageData = images.map((i) => {
    return {
      alt: i.subTitle,
      title: i.subTitle,
      url: i.imageUrl,
    };
  });

  return (
    <section className={styles.slidesSection}>
      <div className={styles.hotelPhotosContainer}>
        <div className={styles.imgSlideContainer}>
          <CarouselHolder
            isDiscountBoxActive={false}
            showArrows={true}
            data={imageData}
            setSelected={setSelected}
            adjustScroller={adjustScroller}
          />
        </div>
        <div className={styles.imgDescriptionContainer}>
          <div>
            <h3>{images[selected].subTitle}</h3>
            <h2>{images[selected].subTitle}</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelImagesSlider;
