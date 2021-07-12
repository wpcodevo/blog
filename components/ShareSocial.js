import { useEffect, useState } from "react";
import {
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import { urlFor } from "lib/api";

const ShareSocial = ({ blog }) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const tags = blog?.tags.map((tag) => tag.value).join("");

  return (
    <div className='sharerHorizontal d-flex'>
      <WhatsappShareButton title={blog.title} url={url}>
        <a href={url} aria-label='whatsapp'>
          <div className='social-button d-flex sharerWhapsapp'>
            <FaWhatsapp />
            <span>Share</span>
          </div>
        </a>
      </WhatsappShareButton>
      <FacebookShareButton url={url} quote={blog.subtitle} hashtag={tags}>
        <a href={url} aria-label='facebook'>
          <div className='social-button d-flex sharerFacebook'>
            <FaFacebookF />
            <span>Share</span>
          </div>
        </a>
      </FacebookShareButton>

      <TwitterShareButton
        url={url}
        title={blog.title}
        hashtags={blog?.tags.map((tag) => tag.value.slice(1))}
      >
        <a href={url} aria-label='twitter'>
          <div className='social-button d-flex sharerTwitter'>
            <FaTwitter />

            <span>Tweet</span>
          </div>
        </a>
      </TwitterShareButton>

      <LinkedinShareButton
        title={blog.title}
        summary={blog.subtitle}
        source={url}
        url={url}
      >
        <a href={url} aria-label='linkedin'>
          <div className='social-button d-flex sharerLinkin'>
            <FaLinkedinIn />

            <span>Share</span>
          </div>
        </a>
      </LinkedinShareButton>

      <PinterestShareButton
        media={urlFor(blog.coverImage).url()}
        description={blog.subtitle}
        url={url}
      >
        <a href={url} aria-label='pinterest'>
          <div className='social-button d-flex sharerPinterest'>
            <FaPinterestP />
            <span>Pin</span>
          </div>
        </a>
      </PinterestShareButton>
    </div>
  );
};

export default ShareSocial;
