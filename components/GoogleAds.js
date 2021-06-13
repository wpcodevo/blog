import React, { useEffect } from "react";
import AdSense from "react-adsense";

const GoogleAds = ({ slot, format, layout = "auto" }) => {
  useEffect(() => {
    const installGoogleAds = () => {
      const el = document.createElement("script");
      el.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      el.async = true;
      el.defer = true;
      document.body.insertBefore(el, document.body.firstChild);
    };
    installGoogleAds();
  }, []);
  return (
    <AdSense.Google
      client='ca-pub-1057373061381635'
      slot={slot}
      style={{ display: "block" }}
      format={format}
      layout={layout}
      responsive='true'
    />
  );
};

export default GoogleAds;
