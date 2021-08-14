import Document, { Html, Head, Main, NextScript } from "next/document";
const content = require("data/content");

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
          <link
            rel='alternate'
            type='application/rss+xml'
            href='https://www.wpcodevo.com/rss/rss.xml'
          />
          <link
            rel='alternate'
            type='application/atom+xml'
            href='https://www.wpcodevo.com/rss/atom.xml'
          />
          <link
            rel='alternate'
            type='application/json'
            href='https://www.wpcodevo.com/rss/feed.json'
          />
          <meta
            name='google-site-verification'
            content='QVihTzJUN1bwjjME4WQtDetK-P8gRUstoBhg1-baD1o'
          />
          <meta name='keywords' content={content.keywords} />
          <meta
            name='p:domain_verify'
            content='263ed5cf94ded2830175910f7d8f7183'
          />
          <meta name='theme-color' content='#fff' />
          <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
          <link rel='icon' sizes='16x16' href='/favicons/favicon-16x16.png' />
          <link rel='icon' sizes='32x32' href='/favicons/favicon-32x32.png' />
          <link rel='manifest' href='/favicons/site.webmanifest' />
          <link
            rel='apple-touch-icon'
            href='/favicons/apple-touch-icon.png'
          ></link>
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
