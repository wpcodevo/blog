import "styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "highlight.js/styles/darcula.css";
import "styles/styles.scss";
import { Adsense } from "@ctrl/react-adsense";
import Link from "next/link";
import PageLayout from "components/PageLayout";
import ScrollTop from "components/ScrollTop";
import CookieConsent from "react-cookie-consent";
import MetaDecorator from "components/MetaDecorator";
const metaContent = require("data/metaContent");
const content = require("data/content");

const App = ({ Component, pageProps }) => {
  <Adsense
    client={process.env.DATA_AD_CLIENT}
    slot='7259870550'
    style={{ display: "block" }}
    layout='in-article'
    format='fluid'
  />;

  return (
    <>
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
        debug={true}
        buttonText='I Accept'
        style={{
          backgroundColor: "#fff",
          color: "#222",
          textAlign: "center",
        }}
        buttonStyle={{ backgroundColor: "#46a5ff", color: "#fff" }}
        expires={150}
      >
        Codevo uses cookies to ensure you get the best experience on our
        website.{" "}
        <Link href='/privacy'>
          <a>Learn more</a>
        </Link>
      </CookieConsent>
      <ScrollTop />
    </>
  );
};

export default App;
