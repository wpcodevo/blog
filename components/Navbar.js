import { Navbar, Nav } from "react-bootstrap";
import Link from "next/link";

const BlogNavBar = () => {
  return (
    <div className='header'>
      <Navbar
        className='fj-navbar fj-nav-base container'
        bg='transparent'
        expand='lg'
      >
        <Navbar.Brand className='fj-navbar-brand'>
          <Link href='/'>
            <a>
              <img src='/logo.svg' alt='' width='170px' height='40px' />
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link
              as={() => (
                <Link href='/'>
                  <a className='fj-navbar-item fj-navbar-link'>Home</a>
                </Link>
              )}
            >
              Home
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default BlogNavBar;
