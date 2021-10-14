import AdSense from "react-adsense";

const CustomGoogleAds = ({
  slot,
  format = "fluid",
  layout = "",
  responsive = "true",
  styles = { display: "block" },
}) => {
  return (
    <div
      style={{
        overflow: "hidden !important",
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
      />
    </div>
  );
};

export default CustomGoogleAds;
