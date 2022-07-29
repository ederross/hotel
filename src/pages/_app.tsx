import { AppProps } from 'next/app';
import '../../styles/globals.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'react-toastify/dist/ReactToastify.css';
import '@material/react-material-icon/dist/material-icon.css';
import { useRouter } from 'next/router';

import { appWithTranslation } from 'next-i18next';
import nextI18nConfig from '../../next-i18next.config';
import moment from 'moment';
import 'moment/locale/pt-br';
import store from '../store';

import { useEffect } from 'react';
import NextNProgress from 'nextjs-progressbar';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  useEffect(() => {
    moment.locale(locale);
  }, []);

  return (
    <>
      <NextNProgress
        color="var(--primary-color)"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <PersistGate persistor={store.persistor}>
        <Provider store={store.store}>
          <Component {...pageProps} />
        </Provider>
      </PersistGate>
    </>
  );
}

export default appWithTranslation(MyApp, nextI18nConfig);
