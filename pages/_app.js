import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "styles/styles.scss";
import Link from "next/link";
import PageLayout from "components/PageLayout";
import ScrollTop from "components/ScrollTop";
import CookieConsent from "react-cookie-consent";
import MetaDecorator from "components/MetaDecorator";
const content = require("data/content");
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

const App = ({ Component, pageProps }) => {
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
