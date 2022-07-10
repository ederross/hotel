import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import CarouselHolder from '../common/CarouselHolder';
import { Add, RemoveOutlined } from '@mui/icons-material';
import { Service } from '../../../data/services';
import { currency } from '../../utils/currency';
import { Counter } from '../common/Counter';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../store/types';
import {
  AddServiceToCart,
  RemoveServiceToCart,
} from '../../store/ducks/cart/actions';

interface ICardService {
  service: Service;
}

const CardService = ({ service }: ICardService) => {
  const formattedValue = currency(99.8);

  const dispatch = useDispatch();

  const {
    cart: { services },
  } = useSelector((state: AppStore) => state);

  const currentService = services.find(
    (r) => r.serviceId === service.serviceId
  );

  const [quantity, setQuantity] = useState(currentService?.quantity);

  const handleAddToCart = () => {
    dispatch(
      AddServiceToCart({
        serviceId: service?.serviceId,
        serviceName: service?.serviceName,
        price: service?.serviceAmount || 0,
        quantity: quantity,
      })
    );
  };

  useEffect(() => {
    if (quantity > 0) {
      handleAddToCart();
    } else {
      dispatch(RemoveServiceToCart(service?.serviceId));
    }
  }, [quantity]);

  useEffect(() => {
    if (currentService?.quantity > 0) {
      setQuantity(currentService?.quantity);
    } else {
      setQuantity(0);
    }
  }, [currentService]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerCarousel}>
          <CarouselHolder isDiscountBoxActive={true} data={imageData} />
        </div>
        <div className={styles.typeServiceContainer}>
          <h5>Aluguel</h5>
        </div>

        <h2>{service.serviceName}</h2>

        <p>
          {service.serviceDescription.length < 1
            ? 'Ainda não existe uma descrição para esse serviço'
            : service.serviceDescription}
        </p>

        <div className={styles.priceAndControlsContainerHolder}>
          <div className={styles.pricesInfos}>
            <h4>
              {formattedValue.split(',')[0]}
              <span className={styles.cents}>
                ,{formattedValue.split(',')[1]}
              </span>{' '}
              <span> por dia</span>
            </h4>
          </div>
          <Counter quantity={quantity} setQuantity={setQuantity} />
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
