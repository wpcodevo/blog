import dynamic from "next/dynamic";
const CustomGoogleAds = dynamic(() => import("components/CustomGoogleAds"));

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
          overflow: "hidden !important",
        }}
      >
        <CustomGoogleAds
          format=''
          slot={process.env.NEXT_PUBLIC_DISPLAY_ADS}
          styles={{ display: "block", width: "100%", height: "7rem" }}
        />
      </div>
    </div>
  );
};

export default FixAdsBottom;
