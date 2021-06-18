import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaGithub,
  FaBookReader,
  FaExclamationCircle,
  FaShoppingCart,
  FaChartBar,
  FaUnlockAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import dynamic from "next/dynamic";
import Link from "next/link";
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});

const Aside = () => {
  return (
    <aside className='aside'>
      <div className='subscribe widget'>
        <h3 className='heading'>
          Over 100+ Readers
          <p>Get fresh content from Codevo</p>
        </h3>
        <div className='social-icons'>
          <Link href='https://web.facebook.com/codevv/'>
            <a aria-label='icon' className='icon icon-facebook' target='_blank'>
              <FaFacebookF />
            </a>
          </Link>
          <Link href='https://twitter.com/EdemZiddah2'>
            <a aria-label='icon' className='icon icon-twitter' target='_blank'>
              <FaTwitter />
            </a>
          </Link>
          <Link href='https://www.youtube.com/channel/UCRITDeojq9IsQfTWPeJ-pDQ?sub_confirmation=1'>
            <a aria-label='icon' className='icon icon-youtube' target='_blank'>
              <FaYoutube />
            </a>
          </Link>
          <Link href='#'>
            <a aria-label='icon' className='icon icon-linkin' target='_blank'>
              <FaLinkedinIn />
            </a>
          </Link>
          <Link href='https://github.com/ziddahedem'>
            <a aria-label='icon' className='icon icon-envelope' target='_blank'>
              <FaGithub />
            </a>
          </Link>
        </div>
      </div>
      <div className='widget advertisement'>
        <GoogleAds
          format='auto'
          responsive='true'
          slot={process.env.VERTICAL_SLOT}
        />
      </div>

      <div className='widget help'>
        <div className='heading'>I need help with ...</div>
        <div className='guideicons'>
          <Link href='#'>
            <a aria-label='icon' className='guideicon'>
              <span className='starting'>
                <FaBookReader />
              </span>
              Blog
            </a>
          </Link>

          <Link href='#'>
            <a aria-label='icon' className='guideicon '>
              <span className='speed'>
                <FaTachometerAlt />
              </span>
              Performance
            </a>
          </Link>
          <Link href='#'>
            <a aria-label='icon' className='guideicon security'>
              <span className='security'>
                <FaUnlockAlt />
              </span>
              Security
            </a>
          </Link>
          <Link href='#'>
            <a aria-label='icon' className='guideicon'>
              <span className='seo'>
                <FaChartBar />
              </span>
              SEO
            </a>
          </Link>
          <Link href='#'>
            <a aria-label='icon' className='guideicon'>
              <span className='error'>
                <FaExclamationCircle />
              </span>
              Error
            </a>
          </Link>
          <Link href='#'>
            <a aria-label='icon' className='guideicon'>
              <span className='shop'>
                <FaShoppingCart />
              </span>
              Online Shop
            </a>
          </Link>
        </div>
      </div>
      {/* {tags && (
        <div className='widget tags'>
          <h4>Main Tags</h4>
          <p>{tags}</p>
        </div>
      )} */}
    </aside>
  );
};

export default Aside;
