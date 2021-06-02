import Link from "next/link";
import { FaTwitter, FaYoutube, FaFacebookF, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='page-footer'>
      <div className='center container'>
        <div>
          <h1>Coding Tutorials</h1>
        </div>
        <div>
          <h3>About</h3>
          <p>
            Codevo is a blog where we post blogs related to HTML CSS JavaScript
            & Nodejs along with amazing coding stuff.
          </p>
          <p>
            Contact Us:{" "}
            <Link href='#'>
              <a>youtube@gmail.com</a>
            </Link>
          </p>
        </div>
        <div>
          <h3>Follow</h3>
          <div className='icons d-flex'>
            <div className='social-icons'>
              <Link href='https://web.facebook.com/codevv/'>
                <a className='icon' target='_blank'>
                  <FaFacebookF />
                </a>
              </Link>
              <Link href='https://twitter.com/EdemZiddah2'>
                <a className='icon' target='_blank'>
                  <FaTwitter />
                </a>
              </Link>
              <Link href='https://github.com/ziddahedem'>
                <a className='icon' target='_blank'>
                  <FaGithub />
                </a>
              </Link>
              <Link href='https://www.youtube.com/channel/UCRITDeojq9IsQfTWPeJ-pDQ?sub_confirmation=1'>
                <a className='icon' target='_blank'>
                  <FaYoutube />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
