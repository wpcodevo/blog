import { Container } from "react-bootstrap";
import BlogNavBar from "./Navbar";
import Footer from "./Footer";

const PageLayout = ({ children, className }) => {
  return (
    <>
      <BlogNavBar />
      <Container>
        <div className={`page-wrapper container ${className}`}>{children}</div>
        <Footer />
      </Container>
    </>
  );
};

export default PageLayout;
