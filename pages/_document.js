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
          <meta name='theme-color' content='#fff' />
          <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
          <link rel='icon' sizes='16x16' href='/favicons/favicon-16x16.png' />
          <link rel='icon' sizes='32x32' href='/favicons/favicon-32x32.png' />
          <link rel='manifest' href='/favicons/site.webmanifest' />

          {/* <link rel='preconnect' href='https://fonts.googleapis.com' /> */}

          {/* <link
            rel='preload'
            href='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
            as='script'
            type='text/javascript'
          /> */}
          {/* <link
            rel='preload'
            href='https://apis.google.com/js/platform.js'
            as='script'
            type='text/javascript'
          /> */}
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
