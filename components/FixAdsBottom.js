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
          textAlign: "center",
        }}
      >
        <GoogleAds
          format='fluid'
          slot={process.env.HORIZONTAL_SLOT}
          responsive='true'
        />
      </div>
    </div>
  );
};

export default FixAdsBottom;
