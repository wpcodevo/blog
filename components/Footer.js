import Link from "next/link";
import { FaTwitter, FaYoutube, FaFacebookF, FaGithub } from "react-icons/fa";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer
      className='page-footer'
      style={{
        padding: "50px 0 0",
        backgroundColor: "#222",
        color: "#eaeaea",
      }}
    >
      <div className='center container'>
        <div className='d-flex'>
          <Link href='/'>
            <a>
              <h2 style={{ fontSize: "40px" }}>Coding Tutorials</h2>
            </a>
          </Link>
        </div>
        <div>
          <h3 style={{ color: "white" }}>About</h3>
          <p>
            Codevo is a blog where we post blogs related to HTML CSS JavaScript
            & Nodejs along with amazing coding stuff.
          </p>
          <p>
            Contact Us:{" "}
            <Link href='mailto:contact@wpcodevo.com'>
              <a aria-label='contact' style={{ color: "#ff6200" }}>
                contact@wpcodevo.com
              </a>
            </Link>
          </p>
        </div>
        <div>
          <h3 style={{ color: "white" }}>Follow</h3>
          <div className='icons d-flex'>
            <div className='social-icons'>
              <Link href='https://web.facebook.com/codevv/'>
                <a aria-label='facebook' className='icon' target='_blank'>
                  <FaFacebookF />
                </a>
              </Link>
              <Link href='https://twitter.com/EdemZiddah2'>
                <a aria-label='twitter' className='icon' target='_blank'>
                  <FaTwitter />
                </a>
              </Link>
              <Link href='https://github.com/ziddahedem'>
                <a aria-label='github' className='icon' target='_blank'>
                  <FaGithub />
                </a>
              </Link>
              <Link href='https://www.youtube.com/channel/UCRITDeojq9IsQfTWPeJ-pDQ?sub_confirmation=1'>
                <a aria-label='youtube' className='icon' target='_blank'>
                  <FaYoutube />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className=' bottom-footer ' style={{ backgroundColor: "#0d0d0d" }}>
        <div className='container d-flex'>
          <p>
            Copyright &copy; {year}{" "}
            <Link href='/'>
              <a style={{ color: "#ff6200" }}>Codevo</a>
            </Link>{" "}
            All Rights Reserved{" "}
          </p>
          <div className='d-flex list'>
            <Link href='/'>
              <a>Home</a>
            </Link>
            <Link href='/terms'>
              <a>Terms & Conditions</a>
            </Link>
            <Link href='/privacy'>
              <a>Privacy policy</a>
            </Link>
            <Link href='/contact'>
              <a>Contact Us</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
