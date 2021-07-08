import { Image } from "react-bootstrap";
import Link from "next/link";
import { urlFor } from "lib/api";

const NewsListItem = ({ shorttitle, smallImage, link }) => {
  return (
    <div className='news'>
      <Link {...link}>
        <a aria-label={smallImage.alt} className='news-link'>
          <Image
            variant='top'
            style={{
              imageRendering: "-webkit-optimize-contrast",
              width: "98px",
              height: "98px",
              objectFit: "cover",
            }}
            src={urlFor(smallImage).width(98).height(98).fit("clip").url()}
            alt={smallImage.alt}
          />
        </a>
      </Link>
      <Link {...link}>
        <a>
          <p style={{ fontSize: "15px !important" }}>
            {shorttitle.length > 60
              ? shorttitle.substr(0, 60) + " ..."
              : shorttitle}
          </p>
        </a>
      </Link>
    </div>
  );
};

export default NewsListItem;
