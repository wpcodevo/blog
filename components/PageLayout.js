import BlogNavBar from "./Navbar";
import Footer from "./Footer";

const PageLayout = ({ children, className }) => {
  return (
    <div className='grid-layout'>
      <BlogNavBar />
      <div className={`page-wrapper ${className}`}>{children}</div>
      <Footer />
    </div>
  );
};

export default PageLayout;
