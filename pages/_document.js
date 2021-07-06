import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='canonical' href='https://www.wpcodevo.com/' />
          <meta
            name='p:domain_verify'
            content='263ed5cf94ded2830175910f7d8f7183'
          />
          <meta name='theme-color' content='#444' />
          <link rel='manifest' href='/favicons/site.webmanifest' />
          <link
            rel='shortcut icon'
            href='/favicons/favicon.ico'
            type='image/x-icon'
          />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
