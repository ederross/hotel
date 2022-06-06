import { AppProps } from 'next/app';
import '../../styles/globals.css';

import 'swiper/css';
import 'swiper/css/pagination';


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
