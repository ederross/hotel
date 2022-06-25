import { AppProps } from 'next/app';
import '../../styles/globals.css';

import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from 'next/router';

import { appWithTranslation } from 'next-i18next';
import nextI18nConfig from '../../next-i18next.config';
import moment from 'moment';
import 'moment/locale/pt-br';

import NProgress from 'nprogress';
import Router from 'next/router';
import { useEffect } from 'react';
import NextNProgress from 'nextjs-progressbar';
function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  useEffect(() => {
    moment.locale(locale);
  }, [locale]);

  return (
    <>
      <NextNProgress
        color="var(--primary-color)"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp, nextI18nConfig);
