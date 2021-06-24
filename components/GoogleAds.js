import React, { useEffect } from "react";
import AdSense from "react-adsense";

const GoogleAds = ({
  slot,
  format = "fluid",
  layout = "in-article",
  responsive = "",
  layoutKey = "",
  styles = { display: "block" },
}) => {
  useEffect(() => {
    const installGoogleAds = () => {
      const el = document.createElement("script");
      el.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      el.async = true;
      el.defer = true;
      document.body.insertBefore(el, document.body.firstChild);
    };

    if (process.env.NODE_ENV === "production") {
      installGoogleAds();
    }
  }, []);
  return (
    <div style={{ overflow: "hidden" }}>
      <AdSense.Google
        client='ca-pub-1057373061381635'
        slot={slot}
        style={styles}
        format={format}
        layout={layout}
        responsive={responsive}
        layoutKey={layoutKey}
      />
    </div>
  );
};

export default GoogleAds;
