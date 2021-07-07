import dynamic from "next/dynamic";
import GoogleAds from "components/GoogleAds";
import BlogNavBar from "./Navbar";
const Footer = dynamic(() => import("./Footer"));

const PageLayout = ({ children, className }) => {
  return (
    <>
      <BlogNavBar />
      <div className={`page-wrapper ${className}`}>{children}</div>
      <div className='container'>
        <div
          style={{
            margin: "1rem 0 1rem",
            paddingBottom: "7rem",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageLayout;
