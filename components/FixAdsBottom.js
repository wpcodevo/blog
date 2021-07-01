import dynamic from "next/dynamic";
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});

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
          styles={{ display: "block", width: "100%", height: "7rem" }}
        />
      </div>
    </div>
  );
};

export default FixAdsBottom;
