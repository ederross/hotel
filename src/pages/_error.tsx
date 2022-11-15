import { useTranslation } from 'next-i18next';
import styles from './home.module.scss';

function Error({ statusCode }) {
  const { t } = useTranslation('common');
  return (
    <div className={styles.errorContainer}>
      <h4>{t('errorPageTitle')}</h4>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  if (typeof window == 'undefined') {
    const newrelic = require('newrelic');
    newrelic.noticeError(err);
  } else {
    // @ts-ignore
    window.newrelic.noticeError(err);
  }

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
