import { AppProps } from 'next/app';
import '../../styles/globals.css';

import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from 'next/router';

import { appWithTranslation } from 'next-i18next';
import nextI18nConfig from '../../next-i18next.config';
import moment from 'moment';
import 'moment/locale/pt-br';

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  moment.locale(locale);

  return (
    <>
      {/* <IntlProvider locale={locale} messages={messages[locale]}> */}
      <Component {...pageProps} />
      {/* </IntlProvider> */}
    </>
  );
}

export default appWithTranslation(MyApp, nextI18nConfig);
