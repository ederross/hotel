import React from 'react';
import styles from './styles.module.scss';
import CarouselHolder from '../common/CarouselHolder';
import { Add, RemoveOutlined } from '@mui/icons-material';

const CardService = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerCarousel}>
          <CarouselHolder data={imageData} />
        </div>
        <div className={styles.typeServiceContainer}>
          <h5>Aluguel</h5>
        </div>

        <h2>Passeio de balão</h2>

        <p>
          Air Fun Balonismo está há 28 Anos no mercado passeio de Balão em
          Boituva. Faça sua reserva. Passeio de Balão com...
        </p>

        <div className={styles.priceAndControlsContainerHolder}>
          <div className={styles.pricesInfos}>
            <h4>
              R$ 100 <span>por dia</span>
            </h4>
          </div>
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
      </div>
    </>
  );
};

export default CardService;

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
