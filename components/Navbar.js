import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiMenu } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import dynamic from "next/dynamic";
const YouTubeSubscribe = dynamic(() => import("components/youtubeSubcribe"));
import ScrollProgress from "components/ScrollProgress";
const SearchWidget = dynamic(() => import("components/SearchWidget"));

const BlogNavBar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <>
      <header className='header'>
        <nav className='nav'>
          <div className='navigation container'>
            <div className='logo'>
              <Link href='/' as='/'>
                <a aria-label='home'>
                  <Image
                    src='/images/codevo-logo.svg'
                    width='150'
                    height='70'
                  />
                </a>
              </Link>
            </div>

            <div className={`menu ${openNav ? "show" : ""}`}>
              <div className='top-nav'>
                <div className='logo'>
                  <Link href='/'>
                    <a aria-label='logo' onClick={() => setOpenNav(!openNav)}>
                      <Image
                        src='/images/codevo-logo.svg'
                        width='100'
                        height='50'
                      />
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
                    <a
                      className='nav-link'
                      onClick={() => setOpenNav(!openNav)}
                    >
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
                <li
                  className='nav-item search-nav'
                  onClick={() => setOpenSearch(true)}
                >
                  <BiSearch size={24} />
                </li>
              </ul>
            </div>

            <div className='search-hamburger'>
              <div
                onClick={() => setOpenSearch(true)}
                className='search-nav-mobile'
              >
                <BiSearch />
              </div>
              <div onClick={() => setOpenNav(!openNav)} className='hamburger'>
                <BiMenu />
              </div>
            </div>
          </div>
        </nav>
      </header>
      <ScrollProgress />
      <SearchWidget openSearch={openSearch} setOpenSearch={setOpenSearch} />
    </>
  );
};

export default BlogNavBar;
