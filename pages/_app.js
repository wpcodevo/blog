import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/styles.scss";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import PageLayout from "components/PageLayout";
import { SEO } from "components/MetaDecorator";
import { DefaultSeo } from "next-seo";
const CookieConsent = dynamic(() => import("react-cookie-consent"));
const ScrollTop = dynamic(() => import("components/ScrollTop"));
import { GA_TRACKING_ID } from "lib/gtag";
import Script from "next/script";

const App = ({ Component, pageProps }) => {
  const [size, setSize] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 567) {
      setSize(true);
    }
  }, []);
  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
      )}

      {process.env.NODE_ENV === "production" && size && (
        <Script
          strategy='lazyOnload'
          src='https://apis.google.com/js/platform.js'
        />
      )}

      {process.env.NODE_ENV === "production" && (
        <Script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      )}

      <DefaultSeo {...SEO} />
      <PageLayout className='container'>
        <Component {...pageProps} />
      </PageLayout>
      <CookieConsent
        buttonText='I Accept'
        style={{
          backgroundColor: "#fff",
          color: "#222",
          textAlign: "center",
          zIndex: 999999,
        }}
        buttonStyle={{ backgroundColor: "#46a5ff", color: "#fff" }}
        expires={150}
      >
        Codevo uses cookies to ensure you get the best experience on our
        website.{" "}
        <Link href='/privacy'>
          <a aria-label='learn more'>Learn more</a>
        </Link>
      </CookieConsent>
      <ScrollTop />
    </>
  );
};

export default App;
