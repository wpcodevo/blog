import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaGithub,
  FaPinterest,
} from "react-icons/fa";
import Link from "next/link";
import GoogleAds from "components/GoogleAds";
import PopularBlogs from "components/PopularBlogs";
import AsideCateogories from "components/AsideCategories";
import Image from "next/image";

const Aside2 = ({ blog }) => {
  return (
    <aside className='aside'>
      <div className='subscribe widget'>
        <p className='heading'>
          Over 100+ Readers
          <span>Get fresh content from Codevo</span>
        </p>
        <div className='social-icons d-flex'>
          <Link href='https://web.facebook.com/codevv/'>
            <a
              rel='noreferrer'
              aria-label='icon'
              className='icon icon-facebook'
              target='_blank'
            >
              <FaFacebookF />
            </a>
          </Link>
          <Link href='https://twitter.com/EdemZiddah2'>
            <a
              rel='noreferrer'
              aria-label='icon'
              className='icon icon-twitter'
              target='_blank'
            >
              <FaTwitter />
            </a>
          </Link>
          <Link href='https://www.youtube.com/channel/UCRITDeojq9IsQfTWPeJ-pDQ?sub_confirmation=1'>
            <a
              rel='noreferrer'
              aria-label='icon'
              className='icon icon-youtube'
              target='_blank'
            >
              <FaYoutube />
            </a>
          </Link>
          <Link href='#'>
            <a
              rel='noreferrer'
              aria-label='icon'
              className='icon icon-linkin'
              target='_blank'
            >
              <FaLinkedinIn />
            </a>
          </Link>
          <Link href='https://github.com/ziddahedem'>
            <a
              rel='noreferrer'
              aria-label='icon'
              className='icon icon-envelope'
              target='_blank'
            >
              <FaGithub />
            </a>
          </Link>
          <Link href='https://www.pinterest.com/ekziddah/'>
            <a
              rel='noreferrer'
              aria-label='icon'
              className='icon icon-pinterest'
              target='_blank'
            >
              <FaPinterest />
            </a>
          </Link>
        </div>
      </div>
      <div className='widget' style={{ maxHeight: "200px !important" }}>
        <GoogleAds
          slot={process.env.VERTICAL_SLOT}
          styles={{ height: "200px", display: "block" }}
          layout=''
          format=''
        />
      </div>
      <div className='widget' style={{ height: 517 }}>
        <p style={{ fontSize: 23, textAlign: "center" }}>
          <span className='orange-text'>Popular</span> Blogs
        </p>
        <PopularBlogs />
      </div>

      <div className='widget advertisement'>
        <GoogleAds format='auto' slot={process.env.VERTICAL_SLOT} />
      </div>

      <AsideCateogories />
      <div className='widget no-pad promo'>
        <Link href='https://www.hostg.xyz/aff_c?offer_id=6&aff_id=79354'>
          <a rel='noreferrer' target='_blank'>
            <Image
              src='/images/hostinger.svg'
              alt='hostinger coupon code'
              width='300'
              height='400'
            />
          </a>
        </Link>
      </div>
      <div className='widget advertisement'>
        <GoogleAds format='auto' slot={process.env.VERTICAL_SLOT} />
      </div>
      <div className='widget no-pad promo'>
        <Link href='https://www.bluehost.com/track/edemziddah/Aside'>
          <a rel='noreferrer' target='_blank'>
            <Image
              src='/images/bluehost.svg'
              alt='bluehost coupon code'
              width='300'
              height='400'
            />
          </a>
        </Link>
      </div>
      <div className='widget' style={{ maxHeight: "200px !important" }}>
        <GoogleAds
          slot={process.env.VERTICAL_SLOT}
          styles={{ height: "200px", display: "block" }}
          layout=''
          format=''
        />
      </div>
      <div className='widget tags'>
        {blog.tags.map((tag, index) => (
          <div key={`${index}-list`}>{tag.value}</div>
        ))}
      </div>
      <div className={`widget advertisement`}>
        <GoogleAds format='auto' slot={process.env.VERTICAL_SLOT} />
      </div>
    </aside>
  );
};

export default Aside2;
