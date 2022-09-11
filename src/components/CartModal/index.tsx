import { CloseOutlined, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from '../../hooks/UseWindowSize';
import {
  CleanCart,
  RemoveProductToCart,
  RemoveServiceToCart,
} from '../../store/ducks/cart/actions';
import { AppStore } from '../../store/types';
import { currency } from '../../utils/currency';

import styles from './styles.module.scss';

interface ICartModal {
  handleCloseCartModal: () => void;
  isCheckoutSeeAllData?: boolean;
}

const CartModal = ({
  handleCloseCartModal,
  isCheckoutSeeAllData,
}: ICartModal) => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  const dispatch = useDispatch();

  // Window Sizes
  const size = useWindowSize();

  const {
    cart: { objects, services },
  } = useSelector((state: AppStore) => state);

  const handleCleanCart = () => dispatch(CleanCart());
  const handleReserve = () => router.push('/checkout');

  const handleRemoveItem = (id: any, service: boolean) => {
    if (service) {
      dispatch(RemoveServiceToCart(id));
    } else {
      dispatch(RemoveProductToCart(id));
    }
  };

  return (
    <>
      <div
        className={styles.modalContainer}
        style={{
          padding: size.width > 868 && '2rem',
        }}
      >
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>
              {!isCheckoutSeeAllData ? t('cart') : t('items')}
            </h3>
            <CloseOutlined
              onClick={handleCloseCartModal}
              className={styles.closeButton}
            />
          </div>{' '}
          <div className={styles.contentContainer}>
            <div>
              {objects.length > 0 && (
                <h3 className={styles.servicesTitle}>{t('Quartos')}</h3>
              )}
              {objects.map((room, index) => (
                <div key={index} className={styles.roomContainer}>
                  <div className={styles.imageRoomHolder}>
                    <Image
                      src={room?.infos?.image}
                      layout={'fill'}
                      alt={room?.infos?.objectName}
                    />
                  </div>

                  <div className={styles.roomInfo}>
                    <div className={styles.roomNameAdultChildContainer}>
                      <div className={styles.row}>
                        <h5>
                          {room.infos?.adults < 2 && room.infos?.adults > 0
                            ? t('adultWithCount_one', {
                                count: room.infos?.adults,
                              })
                            : room.infos?.adults === 0
                            ? t('adultWithCount_other', {
                                count: room.infos?.adults,
                              })
                            : t('adultWithCount_other', {
                                count: room.infos?.adults,
                              })}{' '}
                          {'&'}{' '}
                          {room.infos?.children < 2 && room.infos?.children > 0
                            ? t('childrenWithCount_one', {
                                count: room.infos?.children,
                              })
                            : room.infos?.children === 0
                            ? t('childrenWithCount_one', {
                                count: room.infos?.children,
                              })
                            : t('childrenWithCount_other', {
                                count: room.infos?.children,
                              })}
                        </h5>
                        {!isCheckoutSeeAllData && (
                          <Delete
                            onClick={() =>
                              handleRemoveItem(room?.objectId, false)
                            }
                            className={styles.closeButton}
                            style={{
                              cursor: 'pointer',
                              width: 16,
                              color: 'gray',
                            }}
                          />
                        )}
                      </div>
                      <h4>{room.infos?.objectName}</h4>
                    </div>

                    <div className={styles.roomQtndPriceContainer}>
                      <h5>{room?.prices[0]?.quantity + ' ' + t('room')} </h5>
                      <h4>{currency(room.prices[0]?.regularTotalAmount)}</h4>
                    </div>
                  </div>
                </div>
              ))}

              {objects && objects.length > 0 && (
                <div
                  className={styles.divisorContainer}
                  style={{ margin: '20px 0' }}
                >
                  <div></div>
                </div>
              )}

              {services.length > 0 && (
                <h3 className={styles.servicesTitle}>{t('Serviços')}</h3>
              )}
              {services.map((room, index) => (
                <div key={index} className={styles.roomContainer}>
                  <div className={styles.row}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        flexDirection: 'column',
                      }}
                    >
                      <h6 style={{ alignSelf: 'flex-start' }}>
                        x{room.quantity}
                      </h6>
                      <h4>{room.serviceName}</h4>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        flexDirection: 'column',
                      }}
                    >
                      {!isCheckoutSeeAllData && (
                        <Delete
                          onClick={() =>
                            handleRemoveItem(room?.serviceId, true)
                          }
                          className={styles.closeButton}
                          style={{
                            cursor: 'pointer',
                            marginBottom: 8,
                            width: 16,
                            color: 'gray',
                          }}
                        />
                      )}
                      <h5>{currency(room.price)}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* {!isCheckoutSeeAllData &&
              (services?.length > 0 || objects?.length > 0) && (
                <div
                  style={{ marginTop: '1.5rem' }}
                  className={styles.buttonClearAllContainer}
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

            {!isCheckoutSeeAllData && (
              <div className={styles.floatButtonContainer}>
                {objects && objects.length > 0 && (
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
              </div>
            )}
            {objects &&
              objects.length === 0 &&
              services &&
              services.length === 0 && (
                <div className={styles.emptyMessageContainer}>
                  <h4>{t('emptyCart')}</h4>
                </div>
              )}
          </div>
        </div>
        <div
          onClick={handleCloseCartModal}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 11,
            background: 'rgba(0,0,0,0.5)',
          }}
        ></div>
      </div>
    </>
  );
};

export default CartModal;
