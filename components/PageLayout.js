import dynamic from "next/dynamic";
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});
const Footer = dynamic(() => import("./Footer"));
const BlogNavBar = dynamic(() => import("./Navbar"));

const PageLayout = ({ children, className }) => {
  return (
    <div className='grid-layout'>
      <BlogNavBar />
      <div className={`page-wrapper ${className}`}>{children}</div>
      <GoogleAds
        format='auto'
        slot={process.env.HORIZONTAL_SLOT}
        responsive='true'
      />
      <Footer />
    </div>
  );
};

export default PageLayout;
