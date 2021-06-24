import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaFacebookF,
} from "react-icons/fa";
import { FacebookShareButton, FacebookShareCount } from "react-share";

const ShareSocial = () => {
  const [count, setCount] = useState(0);
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  console.log(url);

  return (
    <div className='sharerHorizontal d-flex'>
      <div className='sharerTitle'>
        <span>208</span>
        <span>shares</span>
      </div>
      <FacebookShareButton url={url}>
        <a aria-label='facebook'>
          <div className='social-button d-flex sharerFacebook'>
            <FaFacebookF />
            <span>Share</span>
          </div>
        </a>
      </FacebookShareButton>
      <FacebookShareCount url={url}>
        {(shareCount) => {
          setCount(shareCount);
        }}
      </FacebookShareCount>
      <Link href='#'>
        <a aria-label='twitter'>
          <div className='social-button d-flex sharerTwitter'>
            <FaTwitter />

            <span>Tweet</span>
          </div>
        </a>
      </Link>
      <Link href='#'>
        <a aria-label='linkedin'>
          <div className='social-button d-flex sharerLinkin'>
            <FaLinkedinIn />

            <span>Share</span>
          </div>
        </a>
      </Link>
      <Link href='#'>
        <a aria-label='pinterest'>
          <div className='social-button d-flex sharerPinterest'>
            <FaPinterestP />
            <span>Pin</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ShareSocial;
