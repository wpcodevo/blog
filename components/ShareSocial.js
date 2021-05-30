import Link from "next/link";

const ShareSocial = () => {
  return (
    <div className='sharerHorizontal d-flex'>
      <div className='sharerTitle'>
        <span>208</span>
        <span>shares</span>
      </div>
      <Link href='#'>
        <a>
          <div className='social-button sharerFacebook d-flex'>
            <span>
              <i className='bx bxl-facebook'></i>
            </span>
            <span>Share</span>
          </div>
        </a>
      </Link>
      <Link href='#'>
        <a>
          <div className='social-button sharerTwitter d-flex'>
            <span>
              <i className='bx bxl-twitter'></i>
            </span>
            <span>Tweet</span>
          </div>
        </a>
      </Link>
      <Link href='#'>
        <a>
          <div className='social-button sharerLinkin d-flex'>
            <span>
              <i className='bx bxl-linkedin'></i>
            </span>
            <span>Share</span>
          </div>
        </a>
      </Link>
      <Link href='#'>
        <a>
          <div className='social-button sharerPinterest d-flex'>
            <span>
              <i className='bx bxl-pinterest'></i>
            </span>
            <span>Pin</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ShareSocial;
