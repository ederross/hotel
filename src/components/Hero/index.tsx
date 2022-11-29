import moment from 'moment';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Design } from '../../../data/design';
import { OfficeDetails } from '../../../data/officeDetails';
import { CleanCart, SetCartInfos } from '../../store/ducks/cart/actions';
import { AppStore } from '../../store/types';
import styles from './styles.module.scss';

interface IHeroProps {
  officeDetails: OfficeDetails;
  design: Design;
}

const Hero = ({ officeDetails, design }: IHeroProps) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleExploreRooms = (e) => {
    const endDate = moment().add(15, 'days').format('YYYY-MM-DD');
    const startDate = moment().add(1, 'day').format('YYYY-MM-DD');

    router.push({
      pathname: '/search',
      query: {
        startDate,
        endDate,
        adults: 1,
        children: 0,
      },
    });

    dispatch(SetCartInfos({ startDate, endDate }));
  };

  return (
    <section
      className={`${styles.heroSection}`}
      style={{
        background: `linear-gradient(
      to top,
      rgba(0, 0, 0, 0.5) 3rem,
      transparent 100rem
    ),
    url(${design?.headerImgUrl})`,
      }}
    >
      <div className={styles.heroInner}>
        <div>
          <p>{officeDetails?.officeName}</p>
          <h1>
            {officeDetails?.officeSlogan?.substring(0, 40) ||
              t('theBestViewInTheCity')}
          </h1>
          <div onClick={handleExploreRooms}>
            <a
              style={{ cursor: 'pointer' }}
              className={`${'btn'}`}
              title={t('exploreRooms')}
            >
              {t('exploreRooms')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
