import { Design } from '../../../data/design';
import { OfficeDetails } from '../../../data/officeDetails';
import styles from './styles.module.scss';

interface IHeroProps {
  officeDetails: OfficeDetails;
  design: Design;
}

const Hero = ({ officeDetails, design }: IHeroProps) => {
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
            {officeDetails?.officeDescription || 'A melhor vista da cidade'}
          </h1>
          <a href="/search" className={`${'btn'}`} title={'Explorar quartos'}>
            Explorar Quartos
          </a>
        </span>
      </div>
    </section>
  );
};

export default Hero;
