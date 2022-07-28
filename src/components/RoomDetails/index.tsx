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
import { Room } from '../../../data/room';

interface IRoomDetailsProps {
  room: Room;
  setSelectedRoom: React.Dispatch<React.SetStateAction<Room>>;
}

export const RoomDetails = ({ room, setSelectedRoom }: IRoomDetailsProps) => {
  const { t } = useTranslation('common');
  const [openOffersModal, setOpenOffersModal] = useState(false);
  const [showMoreDescription, setShowMoreDescription] = useState(false);

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

  const handleReserve = () => router.push('/checkout');

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
                backgroundImage: `url(${imageData[0]?.url})`,
              }}
            ></div>
            <div className={styles.imgRightSide}>
              <div
                className={styles.secondImgBox}
                style={{
                  backgroundImage: `url(${imageData[1]?.url})`,
                }}
              ></div>
              <div
                className={styles.thirdImgBox}
                style={{
                  backgroundImage: `url(${imageData[2]?.url})`,
                }}
              >
                {imageData.length > 3 && (
                  <div className={styles.allButton}>
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
                <div className={styles.iconWithNumberContainer}>
                  <BedOutlinedIcon fontSize={'small'} />
                  <h5>3</h5>
                </div>
                <div className={styles.iconWithNumberContainer}>
                  <SingleBedOutlinedIcon fontSize={'small'} />
                  <h5>1</h5>
                </div>
                <div className={styles.iconWithNumberContainer}>
                  <PersonOutlinedIcon fontSize={'small'} />
                  <h5>5</h5>
                </div>
              </div>

              <h2>{room?.objectName || '-'}</h2>

              <p>
                {room?.objectDescription.substring(
                  0,
                  showMoreDescription ? room?.objectDescription?.length : 300
                ) || '-'}
                <span
                  onClick={() => setShowMoreDescription(!showMoreDescription)}
                  style={{ cursor: 'pointer' }}
                >
                  {' '}
                  {showMoreDescription ? t('showLess') : `...${t('showMore')}`}
                </span>
              </p>

              <div className={styles.amenitiesContainer}>
                {room?.amenities?.map((item, index) => (
                  <AmenitieDisplay key={index} amenitie={item as any} />
                ))}
              </div>
            </div>

            <div className={styles.ctaBoxHolder}>
              <div className={styles.ctaBox}>
                <OffersAccordion offers={room?.prices} />
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
          offers={room?.prices}
          openOffersModal={openOffersModal}
          handleOpenMobileOffersModal={handleOpenMobileOffersModal}
        />
      )}
      <div className={styles.offersControlContainer}>
        <div className={styles.leftSide}>
          <h4>
            R$ 98 <span>2 {t('nights')}</span>{' '}
          </h4>
          <u onClick={() => handleOpenMobileOffersModal()}>
            <h6>
              {t('see')} {room?.prices?.length}{' '}
              {room?.prices?.length > 1
                ? t('offers')
                : room?.prices?.length === 0
                ? t('offers')
                : t('offer')}
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
