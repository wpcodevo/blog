import Image from "next/image";
import Link from "next/link";
import { urlFor } from "lib/api";

const NewsListItem = ({ shorttitle, smallImage, link }) => {
  return (
    <div className='news'>
      <Link {...link}>
        <a aria-label={smallImage.alt} className='news-link'>
          <Image
            width={130}
            height={130}
            src={urlFor(smallImage).width(130).height(130).fit("clip").url()}
            alt={smallImage.alt}
            className='border'
          />
        </a>
      </Link>
      <Link {...link}>
        <a>
          <p>
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
