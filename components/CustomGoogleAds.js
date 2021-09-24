import AdSense from "react-adsense";

const CustomGoogleAds = ({
  slot,
  format = "fluid",
  layout = "in-article",
  responsive = "",
  layoutKey = "",
  styles = { display: "block" },
}) => {
  return (
    <div
      style={{
        overflow: "hidden",
        textAlign: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <AdSense.Google
        client={process.env.NEXT_PUBLIC_DATA_AD_CLIENT}
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

export default CustomGoogleAds;
