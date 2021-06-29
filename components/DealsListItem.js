import { Image } from "react-bootstrap";
import Link from "next/link";
import { urlFor } from "lib/api";

const DealsListItem = ({ subtitle, smallImage, link, title }) => {
  return (
    <div className='deals d-flex'>
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
            src={urlFor(smallImage).width(300).height(300).fit("clip").url()}
            alt={smallImage.alt}
          />
        </a>
      </Link>
      <div>
        <Link {...link}>
          <a>
            <h2 style={{ fontSize: "16px" }}>{title}</h2>
          </a>
        </Link>
        <p style={{ fontSize: "15px !important" }}>
          {subtitle}
          <Link {...link}>
            <a style={{ fontStyle: "italic", fontWeight: "500" }}>
              View This Deals
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default DealsListItem;
