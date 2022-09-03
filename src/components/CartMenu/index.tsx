import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { currency } from '../../utils/currency';

import styles from './styles.module.scss';
import { AppStore } from '../../store/types';
import {
  CleanCart,
  RemoveProductToCart,
  RemoveServiceToCart,
} from '../../store/ducks/cart/actions';
import { Delete } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useWindowSize } from '../../hooks/UseWindowSize';
import { PostPaymentMethods } from '../../services/requests/booking';
import { SetCheckoutRedux } from '../../store/ducks/checkout/actions';

interface ICartMenu {
  openCart: boolean;
}

const CartMenu = ({ openCart }: ICartMenu) => {
  const { t } = useTranslation('common');

  const router = useRouter();
  const dispatch = useDispatch();

  const { cart } = useSelector((state: AppStore) => state);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const currentLength = cart?.objects?.length + cart?.services?.length;

  const [oldLength, setOldLength] = useState(currentLength);

  const { width } = useWindowSize();

  const handleCleanCart = () => dispatch(CleanCart());

  const handleReserve = () => {
    setLoadingCheckout(true);
    PostPaymentMethods(cart)
      .then((res) => {
        res?.data?.length > 0 && router.push('/checkout');
        console.log(res.data);
        res?.data && dispatch(SetCheckoutRedux(res?.data));
        setLoadingCheckout(false);
      })
      .catch((err) => {
        console.log('POST PAYMENT METHOD ERROR!', err);
        setLoadingCheckout(false);
        toast.error(`Falha ao reservar quartos`, toastConfig as any);
        return [];
      });
  };

  const handleRemoveItem = (id: any, service: boolean) => {
    if (service) {
      dispatch(RemoveServiceToCart(id));
    } else {
      dispatch(RemoveProductToCart(id));
    }
  };

  const toastConfig = {
    position: width < 868 ? 'top-left' : 'bottom-right',
    autoClose: 5000,
    theme: 'colored',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  useEffect(() => {
    if (width > 868) {
      if (currentLength > oldLength) {
        toast.success(`${t('itemAdded')}`, toastConfig as any);
      } else if (currentLength < oldLength) {
        toast.error(`${t('itemRemoved')}`, toastConfig as any);
      }
      setOldLength(currentLength);
    }
  }, [currentLength]);

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.2,
      },
      display: 'block',
    },
    exit: {
      opacity: 0,
      rotateX: -20,
      transition: {
        duration: 0.2,
        delay: 0.1,
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };

  return (
    <>
      <motion.div
        className={styles.subMenu}
        initial="exit"
        animate={openCart ? 'enter' : 'exit'}
        variants={subMenuAnimate}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {cart?.objects.length > 0 && (
          <h3 className={styles.servicesTitle}>{t('Quartos')}</h3>
        )}
        {cart?.objects.map((item, index) => (
          <div key={index}>
            {item?.prices?.map((price, index) => (
              <div key={index} className={styles.roomContainer}>
                <div className={styles.imageRoomHolder}>
                  <Image src={item?.infos?.image} layout={'fill'} />
                </div>

                <div className={styles.roomInfo}>
                  <div className={styles.roomNameAdultChildContainer}>
                    <div className={styles.row}>
                      <h5>
                        {item.infos?.adults < 2 && item.infos?.adults > 0
                          ? t('adultWithCount_one', {
                              count: item.infos?.adults,
                            })
                          : item.infos?.adults === 0
                          ? t('adultWithCount_other', {
                              count: item.infos?.adults,
                            })
                          : t('adultWithCount_other', {
                              count: item.infos?.adults,
                            })}{' '}
                        {'&'}{' '}
                        {item.infos?.children < 2 && item.infos?.children > 0
                          ? t('childrenWithCount_one', {
                              count: item.infos?.children,
                            })
                          : item.infos?.children === 0
                          ? t('childrenWithCount_one', {
                              count: item.infos?.children,
                            })
                          : t('childrenWithCount_other', {
                              count: item.infos?.children,
                            })}
                      </h5>
                      <Delete
                        onClick={() => handleRemoveItem(item?.objectId, false)}
                        className={styles.closeButton}
                        style={{ cursor: 'pointer', width: 16, color: 'gray' }}
                      />
                    </div>
                    <h4>{item.infos?.objectName}</h4>
                  </div>

                  <div className={styles.roomQtndPriceContainer}>
                    <h5>{price?.quantity + ' ' + t('room')}</h5>
                    <h4>{currency(price?.regularTotalAmount)}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {cart?.objects && cart?.objects.length > 0 && (
          <div className={styles.divisorContainer} style={{ margin: '20px 0' }}>
            <div></div>
          </div>
        )}

        {cart?.services.length > 0 && (
          <h3 className={styles.servicesTitle}>{t('Serviços')}</h3>
        )}
        {cart?.services.map((room, index) => (
          <div key={index} className={styles.roomContainer}>
            <div className={styles.row}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  flexDirection: 'column',
                }}
              >
                <h6 style={{ alignSelf: 'flex-start' }}>x{room.quantity}</h6>
                <h4>{room.serviceName}</h4>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  flexDirection: 'column',
                }}
              >
                <Delete
                  onClick={() => handleRemoveItem(room?.serviceId, true)}
                  className={styles.closeButton}
                  style={{
                    cursor: 'pointer',
                    marginBottom: 8,
                    width: 16,
                    color: 'gray',
                  }}
                />
                <h5>{currency(room.price)}</h5>
              </div>
            </div>
          </div>
        ))}

        {/* {(services?.length > 0 || objects?.length > 0) && (
          <div
            style={{ marginTop: '1.5rem' }}
            className={styles.buttonSeeMoreRoomsContainer}
          >
            <motion.button
              id={'button'}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCleanCart}
            >
              {t('clearAll')}
            </motion.button>
          </div>
        )} */}

        {cart?.objects && cart?.objects.length > 0 && (
          <motion.button
            id={'button'}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            whileTap={{ scale: 0.9 }}
            className={styles.confirmBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleReserve();
            }}
          >
            {t('checkout')}
          </motion.button>
        )}

        {cart?.objects &&
          cart?.objects.length === 0 &&
          cart?.services &&
          cart?.services.length === 0 && (
            <div className={styles.emptyMessageContainer}>
              <h4>Seu carrinho está vazio</h4>
            </div>
          )}
      </motion.div>
    </>
  );
};

export default CartMenu;
