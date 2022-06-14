import { OfficeDetails } from '../../../data/officeDetails';
import styles from './styles.module.scss';

interface IHeroProps {
  officeDetails: OfficeDetails;
}

const Hero = ({ officeDetails }: IHeroProps) => {
  return (
    <section className={`${styles.heroSection}`}>
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
