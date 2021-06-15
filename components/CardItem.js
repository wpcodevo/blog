import { Card, Image } from "react-bootstrap";
import Link from "next/link";
import { urlFor } from "lib/api";
import moment from "moment";

const CardItem = ({ title, date, coverImage, author, link }) => {
  return (
    <Card className={`fj-card`}>
      <div className='card-body-wrapper'>
        <div className='view overlay'>
          {link && (
            <Link {...link}>
              <a>
                <Card.Img
                  src={urlFor(coverImage)
                    .crop("center")
                    .fit("clip")
                    .width(500)
                    .height(500)
                    .url()}
                  alt={coverImage.alt}
                />
              </a>
            </Link>
          )}
        </div>
        <Card.Body>
          {link && (
            <Link {...link}>
              <a className='no-italic'>
                <Card.Title className='card-main-title-2'>
                  {title.length > 40 ? title.substr(0, 40) + " ..." : title}
                </Card.Title>
              </a>
            </Link>
          )}

          <div className='d-flex'>
            <Image
              roundedCircle
              className='mr-3 card-avatar'
              src={urlFor(author?.avatar).width(40).height(40).fit("max").url()}
              alt={author.alt}
            />
            <div className='d-col'>
              <Card.Title className='card-title-avatar'>
                {author.name}
              </Card.Title>
              <Card.Subtitle className='card-subtitle-avatar orange-text'>
                {moment(date).format("LL")}
              </Card.Subtitle>
            </div>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default CardItem;
