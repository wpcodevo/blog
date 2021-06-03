import { Row } from "react-bootstrap";
import Aside from "./Aside";

const Layout = ({ children }) => {
  return (
    <Row className='mb-5'>
      <div className='wrapper-lg no-border'>
        <main className='main-content no-pad'>{children}</main>
      </div>
      {/* Aside */}
      <Aside />
    </Row>
  );
};

export default Layout;
