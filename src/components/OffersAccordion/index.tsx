import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { Add, RemoveOutlined } from '@mui/icons-material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

import styles from './styles.module.scss';

const imageData = [
  {
    url: 'https://images.unsplash.com/photo-1604156788856-2ce5f2171cce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'balões',
    alt: 'balões',
  },
  {
    url: 'https://images.unsplash.com/photo-1559686043-aef1bbc98d19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'balões',
    alt: 'balões',
  },
  {
    url: 'https://images.unsplash.com/photo-1514923995763-768e52f5af87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    title: 'balões',
    alt: 'balões',
  },
];

const OffersAccordion = () => {
  const { t } = useTranslation('common');
  const [ctaSelected, setCtaSelected] = useState(0);

  return (
    <>
      {imageData.map((item, index) => (
        <>
          <div
            key={index}
            className={styles.ctaItem}
            style={{
              borderBottom:
                imageData.length - 1 !== index
                  ? '1px solid var(--gray-150)'
                  : 'none',
            }}
            onClick={() => setCtaSelected(index)}
          >
            <div key={index} className={styles.ctaItemHeader}>
              <h3>Oferta {index}</h3>
              {ctaSelected !== index && (
                <>
                  <div className={styles.ctaItemHeaderNotSelected}>
                    <h4>R$ 128</h4>
                    <ExpandMoreOutlinedIcon
                      className={styles.chevronDownIcon}
                    />
                  </div>
                </>
              )}
              {ctaSelected === index && (
                <h4>
                  2 noites <span>R$ 128</span>
                </h4>
              )}{' '}
            </div>
            {ctaSelected === index && (
              <div className={styles.ctaItemContent}>
                <ul>
                  <li>Não reembolsável</li>
                  <li>Café da manhã incluso</li>
                  <li>All included</li>
                </ul>

                <div className={styles.addButtons}>
                  <button disabled>
                    <RemoveOutlined className={styles.removeIcon} />
                  </button>
                  <h5>0</h5>
                  <button>
                    <Add className={styles.addIcon} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ))}
    </>
  );
};

export default OffersAccordion;
