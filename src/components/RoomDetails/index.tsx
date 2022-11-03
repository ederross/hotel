import React, { useState } from 'react';
import styles from './styles.module.scss';

import { ChevronLeft } from 'react-feather';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import SingleBedOutlinedIcon from '@mui/icons-material/SingleBedOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { AppsOutlined } from '@mui/icons-material';
import CarouselHolder from '../common/CarouselHolder';
import { useTranslation } from 'next-i18next';
import { useWindowSize } from '../../hooks/UseWindowSize';
import OffersRoomModal from '../OffersRoomModal';
import OffersAccordion from '../OffersAccordion';
import { useRouter } from 'next/router';
import { AmenitieDisplay } from '../common/AmenitieDisplay';
import { motion } from 'framer-motion';
import { Room, RoomImages } from '../../../data/room';
import { IconImportDynamically } from '../common/ComponentWithIcon';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../store/types';
import { PostPaymentMethods } from '../../services/requests/booking';
import { toast } from 'react-toastify';
import { SetCheckoutRedux } from '../../store/ducks/checkout/actions';
import { dynamicOffice, officeId } from '../../services/api';
import { pluralProfix } from '../../utils/pluralRules';
import { currency } from '../../utils/currency';

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

  const handleReserve = () => {
    setLoadingCheckout(true);
    if (cart?.objects?.length > 0) {
      PostPaymentMethods({
        ...cart,
        officeId: dynamicOffice
          ? window.location.hostname.split('.')[0]
          : officeId,
      })
        .then((res) => {
          router.push('/checkout');
          res?.data && dispatch(SetCheckoutRedux(res?.data));
          setLoadingCheckout(false);
        })
        .catch((err) => {
          console.log('POST PAYMENT METHOD ERROR!', err);
          setLoadingCheckout(false);
          toast.error(t(`bookingError`), toastConfig as any);
          return [];
        });
    } else {
      toast.error(t(`bookingError`), toastConfig as any);
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
              style={{
                backgroundImage: `url(${imageData ? imageData[0]?.url : ''})`,
              }}
            ></div>
            <div className={styles.imgRightSide}>
              <div
                className={styles.secondImgBox}
                style={{
                  backgroundImage: `url(${imageData ? imageData[1]?.url : ''})`,
                }}
              ></div>
              <div
                className={styles.thirdImgBox}
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
                <OffersAccordion room={room} />
                <motion.button
                  id={'button'}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.confirmBtn}
                  onClick={handleReserve}
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
            onClick={handleReserve}
          >
            {t('book')}
          </motion.button>
        </div>
      </div>
    </>
  );
};
