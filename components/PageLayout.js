import { Container } from "react-bootstrap";
import BlogNavBar from "./Navbar";
import Footer from "./Footer";

const PageLayout = ({ children, className }) => {
  return (
    <div className='grid-layout'>
      <BlogNavBar />
      <Container>
        <div className={`page-wrapper ${className}`}>{children}</div>
      </Container>
      <Footer />
    </div>
  );
};

export default PageLayout;
