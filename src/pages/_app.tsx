import { AppProps } from 'next/app';
import '../../styles/globals.css';

import 'swiper/css';
import 'swiper/css/pagination';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';

import en from '../../lang/en.json';
import pt from '../../lang/pt.json';

const messages = {
  en,
  pt
};

function getDirection(locale) {
  if (locale === 'ar') {
    return 'rtl';
  }

  return 'ltr';
}

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  return (
    <>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Component {...pageProps} />{' '}
      </IntlProvider>
    </>
  );
}

export default MyApp;
