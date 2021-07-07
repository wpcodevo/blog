import dynamic from "next/dynamic";
import AdSense from "react-adsense";
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
          <div className='horizontal' style={{ margin: "1rem 0 1rem" }}>
            <AdSense.Google
              client='ca-pub-1057373061381635'
              slot='9967007599'
              style={{ display: "block", height: 200 }}
              format=''
              layout=''
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageLayout;
