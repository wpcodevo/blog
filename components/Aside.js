import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaGithub,
  FaPinterest,
  FaDev,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
const GoogleAds = dynamic(() => import("components/GoogleAds"));

const Aside = () => {
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
          <Link href='https://dev.to/wpcodevo'>
            <a
              rel='noreferrer'
              aria-label='icon'
              className='icon icon-linkin'
              target='_blank'
            >
              <FaDev />
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
      <div className='widget' style={{ maxHeight: "60rem !important" }}>
        <GoogleAds slot={process.env.NEXT_PUBLIC_DISPLAY_ADS} />
      </div>

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
      <div className='widget' style={{ maxHeight: "60rem !important" }}>
        <GoogleAds slot={process.env.NEXT_PUBLIC_DISPLAY_ADS} />
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
      <div className='widget advertisement'>
        <GoogleAds format='auto' slot={process.env.NEXT_PUBLIC_DISPLAY_ADS} />
      </div>
    </aside>
  );
};

export default Aside;
