import BlogNavBar from "./Navbar";
import Footer from "./Footer";
import dynamic from "next/dynamic";
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});

const PageLayout = ({ children, className }) => {
  return (
    <div className='grid-layout'>
      <BlogNavBar />
      <div className={`page-wrapper ${className}`}>{children}</div>
      <GoogleAds
        format='auto'
        responsive='true'
        layoutKey={process.env.LAYOUTkEY}
        slot={process.env.HORIZONTAL_SLOT}
      />
      <Footer />
    </div>
  );
};

export default PageLayout;
