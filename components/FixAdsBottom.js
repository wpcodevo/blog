import GoogleAds from "components/GoogleAds";

const FixAdsBottom = () => {
  return (
    <div className='fix-ads-bottom'>
      <div
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "80% !important",
          margin: "0 auto",
          display: " flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GoogleAds
          format=''
          slot={process.env.HORIZONTAL_SLOT}
          styles={{ display: "block", height: "6.5rem", width: " 100%" }}
        />
      </div>
    </div>
  );
};

export default FixAdsBottom;
