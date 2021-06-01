import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaRegEnvelope,
  FaPinterestP,
  FaBookReader,
  FaExclamationCircle,
  FaShoppingCart,
  FaChartBar,
  FaUnlockAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import Link from "next/link";
import GoogleAds from "./GoogleAds";

const Aside = () => {
  return (
    <aside className='aside'>
      <div className='subscribe widget'>
        <div className='heading'>
          Over 1,320,000+ Readers
          <p>Get fresh content from WPBeginner</p>
        </div>
        <div className='social-icons'>
          <Link href=''>
            <a className='icon icon-facebook'>
              <FaFacebookF />
            </a>
          </Link>
          <Link href='#'>
            <a className='icon icon-twitter'>
              <FaTwitter />
            </a>
          </Link>
          <Link href=''>
            <a className='icon icon-youtube'>
              <FaYoutube />
            </a>
          </Link>
          <Link href='#'>
            <a className='icon icon-linkin'>
              <FaLinkedinIn />
            </a>
          </Link>
          <Link href='#'>
            <a className='icon icon-pinterest'>
              <FaPinterestP />
            </a>
          </Link>
          <Link href='#'>
            <a className='icon icon-envelope'>
              <FaRegEnvelope />
            </a>
          </Link>
        </div>
      </div>
      <div className='widget advertisement' style={{ height: '400px !important'; }}>
        <GoogleAds slot='8841628189' />
      </div>

      <div className='widget help'>
        <div className='heading'>I need help with ...</div>
        <div className='guideicons'>
          <a href='' className='guideicon'>
            <span className='starting'>
              <FaBookReader />
            </span>
            Blog
          </a>
          <a href='' className='guideicon '>
            <span className='speed'>
              <FaTachometerAlt />
            </span>
            Performance
          </a>
          <a href='' className='guideicon security'>
            <span className='security'>
              <FaUnlockAlt />
            </span>
            Security
          </a>
          <a href='' className='guideicon'>
            <span className='seo'>
              <FaChartBar />
            </span>
            SEO
          </a>
          <a href='' className='guideicon'>
            <span className='error'>
              <FaExclamationCircle />
            </span>
            Error
          </a>
          <a href='' className='guideicon'>
            <span className='shop'>
              <FaShoppingCart />
            </span>
            Online Shop
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
