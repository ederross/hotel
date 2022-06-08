import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

import styles from './styles.module.scss';

interface IImageComponent {
  url: string;
  style?: React.CSSProperties;
  className?: string;
}

const ImageComponent = ({ url, style, className }: IImageComponent) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={styles.img}>
      <Image
        className={className}
        style={style}
        layout="fill"
        objectFit="cover"
        src={`${url}`}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

export default ImageComponent;
