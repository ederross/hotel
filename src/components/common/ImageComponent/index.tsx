import Image from 'next/image';
import React, { useState } from 'react';
import styles from './styles.module.scss';

interface IImageComponent {
  url: string | null;
  style?: React.CSSProperties;
  className?: string;
  alt?: string;
  title?: string;
}

const ImageComponent = ({
  url,
  style,
  className,
  alt,
  title,
}: IImageComponent) => {
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(url);

  return (
    <div className={styles.img}>
      <Image
        className={`${className}` + `${loading ? styles.loading : null}`}
        style={style}
        layout="fill"
        objectFit="cover"
        alt={alt}
        title={title}
        src={`${photo}` || '/images/empty_image.png'}
        onError={() => setPhoto('/images/empty_image.png')}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

export default ImageComponent;
