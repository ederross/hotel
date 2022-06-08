import styles from './styles.module.scss';

export default function Hero() {
  return (
    <section className={`${styles.heroSection}`} >
      <div className={styles.heroInner}>
        <span>
          <h1>Precisa de um quarto? Perfeito.</h1>
          <p>O lugar perfeito para sua hospedagem.</p>
          <a href="#" className={`${'btn'}`}>
            Explorar Quartos
          </a>
        </span>
      </div>
    </section>
  );
}
