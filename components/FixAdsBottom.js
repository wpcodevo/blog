import GoogleAds from "components/GoogleAds";

const FixAdsBottom = () => {
  return (
    <div className='fix-ads-bottom'>
      <GoogleAds
        format='fluid'
        slot={process.env.HORIZONTAL_SLOT}
        responsive='true'
      />
    </div>
  );
};

export default FixAdsBottom;
