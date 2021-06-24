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
      <div className='container'>
        <div style={{ margin: "1rem 0 1rem", paddingBottom: "7rem" }}>
          <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageLayout;
