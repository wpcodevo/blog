import AdSense from "react-adsense";

const FixGoogleAds = () => {
  return (
    <div
      className='horizontal'
      style={{ margin: "1.5rem 0 1.5rem", overflow: "hidden" }}
    >
      <AdSense.Google
        client={process.env.NEXT_PUBLIC_DATA_AD_CLIENT}
        slot={process.env.NEXT_PUBLIC_DISPLAY_ADS}
        style={{ display: "block", height: 280 }}
        format=''
        layout=''
      />
    </div>
  );
};

export default FixGoogleAds;
