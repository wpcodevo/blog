import "bootstrap/dist/css/bootstrap.min.css";
import "styles/styles.scss";
import Link from "next/link";
import dynamic from "next/dynamic";
import PageLayout from "components/PageLayout";
import ScrollTop from "components/ScrollTop";
import CookieConsent from "react-cookie-consent";
import MetaDecorator from "components/MetaDecorator";
const content = require("data/content");
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
const FixAdsBottom = dynamic(() => import("components/FixAdsBottom"));
import { GA_TRACKING_ID } from "lib/gtag";
import Script from "next/script";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Script src='//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script src='https://apis.google.com/js/platform.js' />
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
      <MetaDecorator
        title={content.pageTitle}
        description={content.pageDescription}
        imageUrl={content.pageImageUrl}
        imageAlt={content.pageImageAlt}
      />
      <PageLayout className='container'>
        <Component {...pageProps} />
      </PageLayout>
      <CookieConsent
        buttonText='I Accept'
        style={{
          backgroundColor: "#fff",
          color: "#222",
          textAlign: "center",
          margin: "0 0 7rem",
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
      <FixAdsBottom />
      <ScrollTop />
    </>
  );
};

export default App;
