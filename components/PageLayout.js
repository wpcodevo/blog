import dynamic from "next/dynamic";
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0, width: 0 }}></div>,
});
const Footer = dynamic(() => import("./Footer"));
const BlogNavBar = dynamic(() => import("./Navbar"));

const PageLayout = ({ children, className }) => {
  return (
    <>
      <BlogNavBar />
      <div className={`page-wrapper ${className}`}>{children}</div>
      <GoogleAds
        format='fluid'
        slot={process.env.HORIZONTAL_SLOT}
        responsive='true'
      />
      <Footer />
    </>
  );
};

export default PageLayout;
