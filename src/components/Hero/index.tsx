import { useTranslation } from 'next-i18next';
import { Design } from '../../../data/design';
import { OfficeDetails } from '../../../data/officeDetails';
import styles from './styles.module.scss';

interface IHeroProps {
  officeDetails: OfficeDetails;
  design: Design;
}

const Hero = ({ officeDetails, design }: IHeroProps) => {
  const { t } = useTranslation('common');
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
        <span>
          <p>{officeDetails?.officeName}</p>
          <h1>
            {officeDetails?.officeDescription || t('THE-BEST-VIEW-IN-THE-CITY')}
          </h1>
          <a href="/search" className={`${'btn'}`} title={t('EXPLORE-ROOMS')}>
            {t('EXPLORE-ROOMS')}
          </a>
        </span>
      </div>
    </section>
  );
};

export default Hero;
