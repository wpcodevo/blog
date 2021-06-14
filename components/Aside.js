import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaGithub,
  FaPinterestP,
  FaBookReader,
  FaExclamationCircle,
  FaShoppingCart,
  FaChartBar,
  FaUnlockAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import Link from "next/link";
import GoogleAds from "components/GoogleAds";

const Aside = ({ tags }) => {
  return (
    <aside className='aside'>
      <div className='subscribe widget'>
        <h3 className='heading'>
          Over 100+ Readers
          <p>Get fresh content from Codevo</p>
        </h3>
        <div className='social-icons'>
          <Link href='https://web.facebook.com/codevv/'>
            <a className='icon icon-facebook' target='_blank'>
              <FaFacebookF />
            </a>
          </Link>
          <Link href='https://twitter.com/EdemZiddah2'>
            <a className='icon icon-twitter' target='_blank'>
              <FaTwitter />
            </a>
          </Link>
          <Link href='https://www.youtube.com/channel/UCRITDeojq9IsQfTWPeJ-pDQ?sub_confirmation=1'>
            <a className='icon icon-youtube' target='_blank'>
              <FaYoutube />
            </a>
          </Link>
          <Link href='#'>
            <a className='icon icon-linkin' target='_blank'>
              <FaLinkedinIn />
            </a>
          </Link>
          <Link href='#'>
            <a className='icon icon-pinterest' target='_blank'>
              <FaPinterestP />
            </a>
          </Link>
          <Link href='https://github.com/ziddahedem'>
            <a className='icon icon-envelope' target='_blank'>
              <FaGithub />
            </a>
          </Link>
        </div>
      </div>
      <div className='widget advertisement'>
        <GoogleAds slot='8841628189' layout='in-article' format='fluid' />
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
      {tags && (
        <div className='widget tags'>
          <h4>Main Tags</h4>
          <p>{tags}</p>
        </div>
      )}
    </aside>
  );
};

export default Aside;
