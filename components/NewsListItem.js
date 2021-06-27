import { Card, Image } from "react-bootstrap";
import Link from "next/link";
import { urlFor } from "lib/api";

const NewsListItem = ({ subtitle, coverImage, link }) => {
  return (
    <div className='news'>
      <Link {...link}>
        <a aria-label={coverImage.alt} className='news-link'>
          <Image
            variant='top'
            style={{
              imageRendering: "-webkit-optimize-contrast",
              width: "98px",
              height: "98px",
            }}
            src={urlFor(coverImage).width(98).height(98).fit("clip").url()}
            alt={coverImage.alt}
          />
        </a>
      </Link>
      <Link {...link}>
        <a>
          <p style={{ fontSize: "15px !important" }}>
            {subtitle.length > 60 ? subtitle.substr(0, 60) + " ..." : subtitle}
          </p>
        </a>
      </Link>
    </div>
  );
};

export default NewsListItem;
