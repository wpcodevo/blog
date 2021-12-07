import Link from "next/link";
import { urlFor } from "lib/api";
import Image from "next/image";

const DealsListItem = ({ shorttitle, smallImage, link, title }) => {
  return (
    <div className='deal'>
      <Link {...link}>
        <a aria-label={smallImage.alt} className='deal-link'>
          <Image
            width={130}
            height={130}
            src={urlFor(smallImage).width(130).height(130).fit("clip").url()}
            alt={smallImage.alt}
            className='border'
            objectFit='cover'
          />
        </a>
      </Link>
      <div className='content'>
        <h1 style={{ fontSize: "20px" }}>
          <Link {...link}>
            <a>{title}</a>
          </Link>
        </h1>

        <p>
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
