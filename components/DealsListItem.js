import { Image } from "react-bootstrap";
import Link from "next/link";
import { urlFor } from "lib/api";

const DealsListItem = ({ shorttitle, smallImage, link, title }) => {
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
        <h1 style={{ fontSize: "16px" }}>
          <Link {...link}>
            <a>{title}</a>
          </Link>
        </h1>

        <p style={{ fontSize: "15px !important" }}>
          {shorttitle}
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
