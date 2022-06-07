import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

import styles  from './styles.module.scss';

const ImageComponent = ({ index, url }) => {
  const [loading, setLoading] = useState(true);

  return (
      <div className={styles.img}>
        <Image
          layout="fill"
          objectFit="cover"
          src={`${url}`}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
  );
};

export default ImageComponent;
