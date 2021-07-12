import { useState } from "react";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import dynamic from "next/dynamic";
const YouTubeSubscribe = dynamic(() => import("components/youtubeSubcribe"));

const BlogNavBar = () => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className='header'>
      <nav className='nav'>
        <div className='navigation d-flex container'>
          <div className='logo'>
            <Link href='/' as='/'>
              <a aria-label='home'>
                <h1>CODEVO</h1>
              </a>
            </Link>
          </div>

          <div className={`menu ${openNav ? "show" : ""}`}>
            <div className='top-nav'>
              <div className='logo'>
                <Link href='/'>
                  <a aria-label='logo' onClick={() => setOpenNav(!openNav)}>
                    <h1>Codevo</h1>
                  </a>
                </Link>
              </div>
              <div className='close' onClick={() => setOpenNav(!openNav)}>
                <FaTimes />
              </div>
            </div>

            <ul className='nav-list d-flex'>
              <li className='nav-item'>
                <Link aria-label='NavItem' href='/'>
                  <a className='nav-link' onClick={() => setOpenNav(!openNav)}>
                    Home
                  </a>
                </Link>
              </li>

              <li className='nav-item'>
                <Link href='/categories'>
                  <a
                    aria-label='NavItem'
                    className='nav-link'
                    onClick={() => setOpenNav(!openNav)}
                  >
                    Categories
                  </a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href='/blogs'>
                  <a
                    aria-label='NavItem'
                    className='nav-link'
                    onClick={() => setOpenNav(!openNav)}
                  >
                    Blogs
                  </a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href='/about'>
                  <a
                    aria-label='NavItem'
                    className='nav-link'
                    onClick={() => setOpenNav(!openNav)}
                  >
                    About
                  </a>
                </Link>
              </li>

              <li className='nav-item'>
                <Link href='/contact'>
                  <a
                    aria-label='NavItem'
                    className='nav-link'
                    onClick={() => setOpenNav(!openNav)}
                  >
                    Contact Us
                  </a>
                </Link>
              </li>

              <li className='nav-item'>
                <YouTubeSubscribe
                  // channelName={channelName}
                  channelid='UCRITDeojq9IsQfTWPeJ-pDQ'
                  theme={"default"}
                  layout={"default"}
                  count={"default"}
                />
              </li>
            </ul>
          </div>

          <div onClick={() => setOpenNav(!openNav)} className='hamburger'>
            <BiMenu />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default BlogNavBar;
