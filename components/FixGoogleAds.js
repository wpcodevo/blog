import AdSense from "react-adsense";
import { useState, useEffect } from "react";

const FixGoogleAds = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ads = document.querySelector("ins.adsbygoogle");
    const showAds = setTimeout(() => {
      if (ads.getAttribute("data-ad-status") === "filled") {
        setShow(true);
        console.log("show empty div");
      }
    }, 2000);

    clearTimeout(showAds);
  });
  return show ? (
    <div className='horizontal' style={{ margin: "1rem 0 1rem" }}>
      <AdSense.Google
        client={process.env.NEXT_PUBLIC_DATA_AD_CLIENT}
        slot={process.env.NEXT_PUBLIC_DISPLAY_ADS}
        style={{ display: "block", height: 200 }}
        format=''
        layout=''
      />
    </div>
  ) : (
    <div></div>
  );
};

export default FixGoogleAds;
