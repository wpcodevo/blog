import dynamic from "next/dynamic";
const CustomGoogleAds = dynamic(() => import("components/CustomGoogleAds"));

const FixFooterAds = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: " flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden !important",
      }}
    >
      <CustomGoogleAds format='' slot={process.env.NEXT_PUBLIC_DISPLAY_ADS} />
    </div>
  );
};

export default FixFooterAds;
