import dynamic from "next/dynamic";
import BlogNavBar from "./Navbar";
import FixGoogleAds from "./FixGoogleAds";
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
          {/* <FixGoogleAds /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageLayout;
