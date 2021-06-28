import { Image } from "react-bootstrap";
import Link from "next/link";
import { urlFor } from "lib/api";

const DealsListItem = ({ subtitle, coverImage, link, title }) => {
  return (
    <div className='deals d-flex'>
      <Link {...link}>
        <a aria-label={coverImage.alt} className='news-link'>
          <Image
            variant='top'
            style={{
              imageRendering: "-webkit-optimize-contrast",
              width: "98px",
              height: "98px",
              objectFit: "cover",
            }}
            src={urlFor(coverImage).width(300).height(300).fit("clip").url()}
            alt={coverImage.alt}
          />
        </a>
      </Link>
      <div>
        <Link {...link}>
          <a>
            <h5 style={{ fontSize: "16px" }}>{title}</h5>
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
