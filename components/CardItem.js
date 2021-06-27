import { Card, Image } from "react-bootstrap";
import Link from "next/link";
import { urlFor } from "lib/api";
import dynamic from "next/dynamic";
const Moment = dynamic(() => import("react-moment"));

const CardItem = ({ title, date, coverImage, author, link }) => {
  return (
    <Card className={`fj-card`}>
      <div className='card-body-wrapper'>
        <div className='view overlay'>
          {link && (
            <Link {...link}>
              <a aria-label={coverImage.alt}>
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
        <Card.Body className='card-body-item'>
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
              style={{ imageRendering: " -webkit-optimize-contrast" }}
              src={urlFor(author?.avatar).width(40).height(40).fit("max").url()}
              alt={author.alt}
            />
            <div className='d-col mx-2'>
              <Card.Title
                style={{
                  fontSize: "15px",
                  textTransform: "capitalize",
                  marginBottom: "5px",
                }}
              >
                <Link href='/about'>
                  <a>{author.name}</a>
                </Link>
              </Card.Title>
              <Card.Subtitle
                className='orange-text'
                style={{ fontSize: "13px" }}
              >
                <Moment format='D MMM YYYY' withTitle>
                  {date}
                </Moment>
              </Card.Subtitle>
            </div>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default CardItem;
