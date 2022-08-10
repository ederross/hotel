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
import { useWindowSize } from '../../hooks/UseWindowSize';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

interface ICardService {
  service: Service;
}

const CardService = ({ service }: ICardService) => {
  const formattedValue = currency(service?.serviceAmount || 0);

  const dispatch = useDispatch();

  const {
    cart: { services },
    domain: { servicePriceDomain, serviceTypeDomain },
  } = useSelector((state: AppStore) => state);

  const currentService = services.find(
    (r) => r.serviceId === service.serviceId
  );

  const { t } = useTranslation('common');
  const { width } = useWindowSize();

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

  const GetServiceTypeDomain = (serviceTypeCode: number) =>
    serviceTypeDomain?.data?.find((i) => i.domainItemCode === serviceTypeCode)
      ?.domainItemValue || 'Undefined';

  const GetServicePriceTypeDomain = (servicePriceTypeCode: number) =>
    servicePriceDomain?.data?.find(
      (i) => i.domainItemCode === servicePriceTypeCode
    )?.domainItemValue || 'Undefined';

  return (
    <>
      <div className={styles.container}>
        <CarouselHolder
          data={[
            {
              alt: service.serviceName,
              title: service.serviceName,
              url: service?.imageUrl,
            },
          ]}
          styleImageComponent={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
          style={{ height: 232 }}
        />
        <div className={styles.typeServiceContainer}>
          <h5>{t(GetServiceTypeDomain(service.serviceTypeCode))}</h5>
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
              <span>
                {' '}
                {t(GetServicePriceTypeDomain(service.servicePriceTypeCode))}
              </span>
            </h4>
          </div>
          <Counter quantity={quantity} setQuantity={setQuantity} />
        </div>
      </div>
    </>
  );
};

export default CardService;
