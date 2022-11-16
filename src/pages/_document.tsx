const newrelic = require('newrelic');

import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import Script from 'next/script';

type DocumentProps = {
  browserTimingHeader: string;
};
class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    const browserTimingHeader = newrelic.getBrowserTimingHeader({
      hasToRemoveScriptWrapper: true,
    });

    return {
      ...initialProps,
      // @ts-ignore
      browserTimingHeader,
    };
  }

  render() {
    const { browserTimingHeader } = this.props;
    return (
      <Html className="default">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Denk+One&family=Epilogue:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300&family=Poppins:wght@100;400;500;600&display=swap"
            rel="stylesheet"
          />
          <meta name="robots" content="INDEX,NOFOLLOW"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            id="newrelic-script"
            dangerouslySetInnerHTML={{ __html: browserTimingHeader }}
            strategy="beforeInteractive"
          ></Script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
