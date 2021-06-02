import Link from "next/link";
import {
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaFacebookF,
} from "react-icons/fa";

const ShareSocial = () => {
  return (
    <div className='sharerHorizontal d-flex'>
      <div className='sharerTitle'>
        <span>208</span>
        <span>shares</span>
      </div>
      <Link href='#'>
        <a>
          <div className='social-button sharerFacebook'>
            <FaFacebookF />

            <span>Share</span>
          </div>
        </a>
      </Link>
      <Link href='#'>
        <a>
          <div className='social-button sharerTwitter'>
            <FaTwitter />

            <span>Tweet</span>
          </div>
        </a>
      </Link>
      <Link href='#'>
        <a>
          <div className='social-button sharerLinkin'>
            <FaLinkedinIn />

            <span>Share</span>
          </div>
        </a>
      </Link>
      <Link href='#'>
        <a>
          <div className='social-button sharerPinterest'>
            <FaPinterestP />
            <span>Pin</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ShareSocial;
