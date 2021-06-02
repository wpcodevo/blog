import { useState } from "react";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import YouTubeSubscribe from "components/youtubeSubcribe";

const BlogNavBar = () => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className='header'>
      <nav className='nav'>
        <div className='navigation container'>
          <div className='logo'>
            <Link href='/' as='/'>
              <a>
                <h1>Codevo</h1>
              </a>
            </Link>
          </div>

          <div className={`menu ${openNav ? "show" : ""}`}>
            <div className='top-nav'>
              <div className='logo'>
                <Link href='/'>
                  <a onClick={() => setOpenNav(!openNav)}>
                    <h1>Codevo</h1>
                  </a>
                </Link>
              </div>
              <div className='close' onClick={() => setOpenNav(!openNav)}>
                <FaTimes />
              </div>
            </div>

            <ul className='nav-list'>
              <li className='nav-item'>
                <Link href='/'>
                  <a className='nav-link' onClick={() => setOpenNav(!openNav)}>
                    Home
                  </a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href='#'>
                  <a className='nav-link' onClick={() => setOpenNav(!openNav)}>
                    About
                  </a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href='#'>
                  <a className='nav-link' onClick={() => setOpenNav(!openNav)}>
                    Privacy
                  </a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href='#'>
                  <a className='nav-link' onClick={() => setOpenNav(!openNav)}>
                    Terms
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
