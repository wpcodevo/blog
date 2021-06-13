import "styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "highlight.js/styles/darcula.css";
import "styles/styles.scss";
import { Adsense } from "@ctrl/react-adsense";
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

  console.log(content.pageTitle);

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
          backgroundColor: "#222",
          color: "#fff",
          textAlign: "center",
        }}
        buttonStyle={{ backgroundColor: "#ff6200", color: "#fff" }}
      >
        Hello and welcome
      </CookieConsent>
      <ScrollTop />
    </>
  );
};

export default App;
