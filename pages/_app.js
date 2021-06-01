import "styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "highlight.js/styles/darcula.css";
import "styles/styles.scss";
import { Adsense } from "@ctrl/react-adsense";

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
      <title>Codevo</title>
      <Component {...pageProps} />
    </>
  );
};

export default App;
