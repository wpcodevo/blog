import "styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "highlight.js/styles/darcula.css";
import "styles/styles.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <title>Edem</title>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
