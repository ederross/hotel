import styles from './home.module.scss';

export default function Error() {
  return (
    <div className={styles.errorContainer}>
      <p>Ops! Algo deu errado...</p>
    </div>
  );
}
