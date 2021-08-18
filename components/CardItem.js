import { Card } from "react-bootstrap";
import Link from "next/link";
import { urlFor } from "lib/api";
import { format, parseISO } from "date-fns";
import Image from "next/image";

const CardItem = ({ title, date, smallImage, author, link }) => {
  return (
    <Card className={`fj-card box`}>
      <div className='card-body-wrapper'>
        <div className='view overlay'>
          {link && (
            <Link {...link}>
              <a aria-label={smallImage.alt}>
                <Image
                  src={urlFor(smallImage)
                    .crop("center")
                    .fit("clip")
                    .width(1920)
                    .height(1080)
                    .url()}
                  width={300}
                  height={200}
                  layout='responsive'
                  objectFit='cover'
                  alt={smallImage.alt}
                />
              </a>
            </Link>
          )}
        </div>
        <Card.Body className='card-body-item'>
          {link && (
            <Link {...link}>
              <a className='no-italic'>
                <h1 className='card-main-title-2'>
                  {title.length > 40 ? title.substr(0, 40) + " ..." : title}
                </h1>
              </a>
            </Link>
          )}

          <div className='d-flex'>
            <Image
              className='radius'
              src={urlFor(author?.avatar).width(40).height(40).fit("max").url()}
              alt={author.alt}
              width={40}
              height={40}
              objectFit='cover'
            />
            <div className='d-col mx-2'>
              <Card.Title
                style={{
                  fontSize: "15px",
                  textTransform: "capitalize",
                  marginBottom: 5,
                  fontWeight: 400,
                  padding: 5,
                }}
              >
                <Link href='/about'>
                  <a>{author.name}</a>
                </Link>
              </Card.Title>
              <Card.Subtitle
                className='orange-text'
                style={{ fontSize: "13px", fontWeight: 400 }}
              >
                {format(parseISO(date), "PPP")}
              </Card.Subtitle>
            </div>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default CardItem;
