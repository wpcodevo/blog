import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    // const ads = process.env.NODE_ENV === "production" && (
    //   <script
    //     defer
    //     async
    //     src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    //   ></script>
    // );

    return (
      <Html lang='en'>
        <Head>
          <link
            rel='icon'
            type='image/png'
            sizes='192x192'
            href='/favicons/favicon-196.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='180x180'
            href='/favicons/favicon-180.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='196x196'
            href='/favicons/favicon-196.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='167x167'
            href='/favicons/favicon-167.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='152x152'
            href='/favicons/favicon-152.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicons/favicon-32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='128x128'
            href='/favicons/favicon-128.png'
          />
          <link rel='manifest' href='/favicons/site.webmanifest' />
          <link
            rel='shortcut icon'
            href='/favicons/favicon-196.ico'
            type='image/x-icon'
          />
          {/* <link rel='stylesheet' href='/path/to/styles/theme-name.css'></link> */}

          {/* {ads && ads} */}
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
