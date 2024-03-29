import React, { useState } from 'react';
import styles from './styles.module.scss';

import { ChevronLeft } from 'react-feather';
import { AppsOutlined } from '@mui/icons-material';
import CarouselHolder from '../common/CarouselHolder';
import { useTranslation } from 'next-i18next';
import { useWindowSize } from '../../hooks/UseWindowSize';
import OffersRoomModal from '../OffersRoomModal';
import OffersAccordion from '../OffersAccordion';
import { useRouter } from 'next/router';
import { AmenitieDisplay } from '../common/AmenitieDisplay';
import { motion } from 'framer-motion';
import { Price, Room, RoomImages } from '../../../data/room';
import { IconImportDynamically } from '../common/ComponentWithIcon';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../store/types';
import { toast } from 'react-toastify';
import { SetCheckoutRedux } from '../../store/ducks/checkout/actions';
import { dynamicOffice, officeId } from '../../services/api';
import { pluralProfix } from '../../utils/pluralRules';
import { currency } from '../../utils/currency';
import axios from 'axios';
import { logger } from '../Logger';
import {
  AddProductToCart,
  RemoveProductToCart,
} from '../../store/ducks/cart/actions';
import moment from 'moment';

interface IRoomDetailsProps {
  room: Room;
  setSelectedRoom: React.Dispatch<React.SetStateAction<Room>>;
  setShowPhotosModal: React.Dispatch<React.SetStateAction<RoomImages[]>>;
}

export const RoomDetails = ({
  room,
  setSelectedRoom,
  setShowPhotosModal,
}: IRoomDetailsProps) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const [openOffersModal, setOpenOffersModal] = useState(false);
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const { cart } = useSelector((state: AppStore) => state);

  const currentRoom = cart?.objects.find((r) => r.objectId === room.objectId);

  const handleOpenMobileOffersModal = () => {
    if (document.body.style.overflow === 'hidden') {
      setOpenOffersModal(false);
      document.body.style.overflow = 'initial';
    } else {
      document.body.style.overflow = 'hidden';
      setOpenOffersModal(true);
    }
  };
  const router = useRouter();
  // Window Sizes
  const size = useWindowSize();

  const toastConfig = {
    position: size?.width < 868 ? 'top-left' : 'bottom-right',
    autoClose: 5000,
    theme: 'colored',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const {
    cart: { objects },
  } = useSelector((state: AppStore) => state);

  const {
    startDate = moment().add(1, 'day').format('YYYY-MM-DD'),
    endDate = moment(startDate).add(15, 'days').format('YYYY-MM-DD'),
    adults = 1,
    children = 0,
  }: any = router.query;

  const currentCart = objects.find((r) => r.objectId === room?.objectId);

  const handleAddToCart = (quantity: number, price: Price) => {
    if (quantity > 0) {
      dispatch(
        AddProductToCart({
          objectId: room.objectId,
          identificationCode: '',
          prices: !!currentCart?.prices?.find(
            (p) => p.quoteId === price?.quoteId
          )
            ? currentCart?.prices.map((p) =>
                p.quoteId !== price?.quoteId
                  ? p
                  : {
                      ...p,
                      quantity,
                      checkIn: startDate,
                      checkOut: endDate,
                      priceDescription: price?.priceDescription,
                      taxes: p.taxes || [],
                      fees: p.fees || [],
                      travelers: {
                        adults,
                        childrens: children,
                        ages: [],
                      },
                    }
              )
            : currentCart
            ? [
                ...currentCart?.prices,
                {
                  quantity,
                  quoteId: price?.quoteId,
                  regularTotalAmount: price?.regularTotalAmount,
                  checkIn: startDate,
                  checkOut: endDate,
                  priceDescription: room?.prices[0].priceDescription,
                  taxes: price?.taxes || [],
                  fees: price?.fees || [],
                  travelers: {
                    adults: parseInt(adults),
                    childrens: parseInt(children),
                    ages: [],
                  },
                },
              ]
            : [
                {
                  quantity,
                  quoteId: price?.quoteId,
                  regularTotalAmount: price?.regularTotalAmount,
                  checkIn: startDate,
                  checkOut: endDate,
                  priceDescription: room?.prices[0].priceDescription,
                  taxes: price?.taxes || [],
                  fees: price?.fees || [],
                  travelers: {
                    adults,
                    childrens: children,
                    ages: [],
                  },
                },
              ],
          infos: {
            adults,
            children,
            image: room?.images ? room?.images[0]?.imageUrl : '',
            objectName: room?.objectName,
          },
        })
      );
    } else {
      dispatch(
        currentCart.prices.length > 1
          ? AddProductToCart({
              objectId: currentCart?.objectId,
              identificationCode: '',
              prices: currentCart?.prices.filter(
                (p) => p.quoteId !== price?.quoteId
              ),
              infos: currentCart?.infos,
            })
          : dispatch(RemoveProductToCart(currentCart?.objectId))
      );
    }
  };

  const handleReserve = (isMobile = false) => {
    if (isMobile) {
      handleAddToCart(1, room?.prices[0]);
      setSelectedRoom(undefined);
    } else if (cart?.objects?.length > 0) {
      setLoadingCheckout(true);
      const { error, endDate, startDate, loading, ...rest } = cart;
      const hotelId =
        window.location.hostname.split('.')[0] === 'www'
          ? window.location.hostname.split('.')[1]
          : window.location.hostname.split('.')[0];

      axios
        .post('/api/payment-methods', {
          ...rest,
          officeId: dynamicOffice ? hotelId : officeId,
        })
        .then((res) => {
          res?.data?.length > 0 && router.push('/checkout');
          res?.data && dispatch(SetCheckoutRedux(res?.data));
          setLoadingCheckout(false);
        })
        .catch((err) => {
          logger.error('POST BOOKING ERROR!', { errorDescription: err });
          setLoadingCheckout(false);
          toast.error(t(`bookingError`), toastConfig as any);
          return [];
        });
    } else {
      toast.error(t(`selectRoomError`), toastConfig as any);
    }
  };

  const imageData = room.images?.map((image) => {
    return {
      url: image?.imageUrl,
      title: image?.subTitle,
      alt: image?.subTitle,
    };
  });

  return (
    <>
      <main className={styles.mainBox}>
        <motion.button
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          whileTap={{ scale: 0.98 }}
          className={styles.btnGoBackDesk}
          onClick={() => setSelectedRoom(undefined)}
        >
          <ChevronLeft width={18} height={18} />
        </motion.button>

        <div className={styles.contentBox}>
          {size.width < 868 && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedRoom(undefined)}
              className={styles.btnGoBack}
            >
              <ChevronLeft width={18} height={18} />
            </motion.div>
          )}

          <div className={styles.carouselContainer}>
            <CarouselHolder
              discont={room?.prices && room?.prices[0]?.discountPercentage}
              data={imageData}
            />
          </div>

          <div className={styles.imgsBox}>
            <div
              className={styles.imgLeftSide}
              onClick={() => setShowPhotosModal(room?.images)}
              style={{
                backgroundImage: `url(${imageData ? imageData[0]?.url : ''})`,
              }}
            ></div>
            <div className={styles.imgRightSide}>
              <div
                onClick={() => setShowPhotosModal(room?.images)}
                className={styles.secondImgBox}
                style={{
                  backgroundImage: `url(${imageData ? imageData[1]?.url : ''})`,
                }}
              ></div>
              <div
                className={styles.thirdImgBox}
                onClick={() => setShowPhotosModal(room?.images)}
                style={{
                  backgroundImage: `url(${imageData ? imageData[2]?.url : ''})`,
                }}
              >
                {imageData?.length > 3 && (
                  <div
                    className={styles.allButton}
                    onClick={() => setShowPhotosModal(room?.images)}
                  >
                    <AppsOutlined
                      fontSize={'small'}
                      style={{ color: '#000' }}
                    />
                    <p>{t('showAllPhotos')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.infoBox}>
              <div className={styles.iconsContainerHolder}>
                {room?.objectDetails?.sleepArrangements?.map(
                  (arrangement, index) => (
                    <div
                      className={styles.iconWithNumberContainer}
                      key={index}
                      title={arrangement?.bedName}
                    >
                      <IconImportDynamically
                        iconName={arrangement?.displayIconTypeCode}
                        size={20}
                      />
                      <h5>{arrangement?.bedQuantity}</h5>
                    </div>
                  )
                )}
              </div>

              <h2>{room?.objectName || '-'}</h2>

              <p>
                {room?.objectDescription.substring(
                  0,
                  showMoreDescription ? room?.objectDescription?.length : 320
                ) || '-'}
                {room?.objectDescription?.length > 320 && (
                  <span
                    onClick={() => setShowMoreDescription(!showMoreDescription)}
                    style={{ cursor: 'pointer' }}
                  >
                    {' '}
                    {showMoreDescription
                      ? t('showLess')
                      : `...${t('showMore')}`}
                  </span>
                )}
              </p>

              <div className={styles.amenitiesContainer}>
                {room?.amenities?.map((item, index) => (
                  <AmenitieDisplay
                    key={index}
                    amenitie={item as any}
                    style={{
                      margin: 8,
                      width: 160,
                      justifyContent: 'flex-start',
                    }}
                  />
                ))}
              </div>
            </div>

            <div className={styles.ctaBoxHolder}>
              <div className={styles.ctaBox}>
                <OffersAccordion
                  room={room}
                  handleAddToCart={handleAddToCart}
                />
                <motion.button
                  id={'button'}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.confirmBtn}
                  onClick={() => handleReserve(false)}
                >
                  {t('book')}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {size.width < 868 && openOffersModal && (
        <OffersRoomModal
          room={room}
          openOffersModal={openOffersModal}
          handleOpenMobileOffersModal={handleOpenMobileOffersModal}
          handleAddToCart={handleAddToCart}
        />
      )}
      <div className={styles.offersControlContainer}>
        <div className={styles.leftSide}>
          <h4>
            {currency(room?.prices[0]?.regularTotalAmount)}{' '}
            <span>
              {room?.prices[0].nightQty}{' '}
              {t(
                `night_${pluralProfix(room?.prices[0].nightQty, router.locale)}`
              )}
            </span>{' '}
          </h4>
          <u onClick={() => handleOpenMobileOffersModal()}>
            <h6>
              {t('see')} {room?.prices?.length}{' '}
              {t(`offers_${pluralProfix(room?.prices?.length, router.locale)}`)}
            </h6>
          </u>
        </div>

        <div className={styles.rightSide}>
          <motion.button
            id={'button'}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.confirmBtn}
            onClick={() => handleReserve(true)}
          >
            {t(cart?.objects?.length === 0 ? 'addToCart' : 'book')}
          </motion.button>
        </div>
      </div>
    </>
  );
};
