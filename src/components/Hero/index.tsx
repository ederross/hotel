import styles from './styles.module.scss';

export default function Hero() {
  return (
    <section className={`${styles.heroSection}`} >
      <div className={styles.heroInner}>
        <span>
          <p>Hotel Central Parque</p>
          <h1>A melhor vista da cidade</h1>
          <a href="#" className={`${'btn'}`}>
            Explorar Quartos
          </a>
        </span>
      </div>
    </section>
  );
}
